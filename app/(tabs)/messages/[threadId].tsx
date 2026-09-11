import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/format";
import { MessageBubble } from "@/components/MessageBubble";
import { ChatInput } from "@/components/ChatInput";
import Toast from "react-native-toast-message";

interface Msg {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  read_at: string | null;
}

export default function ThreadScreen() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [peerName, setPeerName] = useState("");
  const [myName, setMyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [attachmentsByMsg, setAttachmentsByMsg] = useState<Record<string, { url: string }[]>>({});
  const [acceptedOfferId, setAcceptedOfferId] = useState<string | null>(null);
  const [threadListingId, setThreadListingId] = useState<string | null>(null);
  const [listingForOffer, setListingForOffer] = useState<{ title: string; price_minor: number } | null>(null);
  const [offerAmountText, setOfferAmountText] = useState("");
  const [offerSubmitting, setOfferSubmitting] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!threadId || !user?.id) return;
    setLoading(true);
    try {
      const { data: ms, error: msError } = await supabase
        .from("messages")
        .select("id, content, created_at, sender_id, read_at")
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });

      if (msError) throw msError;
      const msgList = (ms as Msg[]) || [];
      setMessages(msgList);

      const msgIds = msgList.map((m) => m.id);
      const attachmentMap: Record<string, { url: string }[]> = {};
      if (msgIds.length > 0) {
        const { data: atts } = await supabase
          .from("message_attachments")
          .select("message_id, url")
          .in("message_id", msgIds);
        if (atts && atts.length > 0) {
          await Promise.all(
            (atts as { message_id: string; url: string }[]).map(async (a) => {
              try {
                const { data: signed } = await supabase.storage
                  .from("messages")
                  .createSignedUrl(a.url, 3600);
                const url = signed?.signedUrl ?? "";
                if (!attachmentMap[a.message_id]) attachmentMap[a.message_id] = [];
                attachmentMap[a.message_id].push({ url });
              } catch {
                if (!attachmentMap[a.message_id]) attachmentMap[a.message_id] = [];
              }
            })
          );
        }
        setAttachmentsByMsg(attachmentMap);
      }

      const unread = (ms || []).filter(
        (m: Msg) => m.sender_id !== user.id && !m.read_at
      );
      if (unread.length > 0) {
        await supabase
          .from("messages")
          .update({ read_at: new Date().toISOString() })
          .in("id", unread.map((m: Msg) => m.id));
      }

      const { data: t } = await supabase
        .from("message_threads")
        .select("buyer_id, seller_id, listing_id")
        .eq("id", threadId)
        .maybeSingle();

      const thread = t as { buyer_id: string; seller_id: string; listing_id: string | null } | null;
      setThreadListingId(thread?.listing_id ?? null);
      if (thread?.listing_id && thread.buyer_id === user.id) {
        const { data: offerRow } = await supabase
          .from("offer_threads")
          .select("id")
          .eq("listing_id", thread.listing_id)
          .eq("buyer_id", thread.buyer_id)
          .eq("seller_id", thread.seller_id)
          .eq("status", "accepted")
          .maybeSingle();
        setAcceptedOfferId((offerRow as { id: string } | null)?.id ?? null);
        const { data: listingRow } = await supabase
          .from("book_listings")
          .select("title, price_minor")
          .eq("id", thread.listing_id)
          .maybeSingle();
        setListingForOffer((listingRow as { title: string; price_minor: number } | null) ?? null);
      } else {
        setAcceptedOfferId(null);
        setListingForOffer(null);
      }

      const peerId = thread
        ? thread.buyer_id === user.id
          ? thread.seller_id
          : thread.buyer_id
        : null;

      if (peerId) {
        const { data: allProfs } = await supabase.rpc("get_public_profiles");
        const prof = (allProfs as { id: string; display_name: string | null; username: string | null }[] | null)?.find(
          (p) => p.id === peerId
        );
        setPeerName(prof?.display_name || prof?.username || "User");
      }

      const { data: meProf } = await supabase
        .from("profiles")
        .select("display_name, username")
        .eq("id", user.id)
        .maybeSingle();
      const me = meProf as { display_name: string | null; username: string | null } | null;
      setMyName(me?.display_name || me?.username || "Me");
    } catch (e) {
      console.error("Load messages error:", e);
      Toast.show({
        type: "error",
        text1: "Could not load messages",
      });
    } finally {
      setLoading(false);
    }
  }, [threadId, user?.id]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (!threadId) return;
    const channel = supabase
      .channel(`thread-${threadId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          const newMsg = payload.new as Msg;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          const updated = payload.new as Msg;
          setMessages((prev) =>
            prev.map((m) => (m.id === updated.id ? updated : m))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!threadId || !user?.id || !text.trim()) return;
      setSending(true);
      try {
        const { error } = await supabase.from("messages").insert({
          thread_id: threadId,
          sender_id: user.id,
          content: text.trim(),
          sender_display_name: myName || undefined,
        });
        if (error) throw error;

        await supabase
          .from("message_threads")
          .update({
            last_message_at: new Date().toISOString(),
            last_message_preview: text.slice(0, 100),
          })
          .eq("id", threadId);
      } catch (e) {
        console.error("Send message error:", e);
        Toast.show({
          type: "error",
          text1: "Message could not be sent",
        });
      } finally {
        setSending(false);
      }
    },
    [threadId, user?.id, myName]
  );

  const sendPhoto = useCallback(async () => {
    if (!threadId || !user?.id) return;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permission needed",
        text2: "Allow photo library to send images.",
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.[0]?.uri) return;
    setSending(true);
    try {
      const uri = result.assets[0].uri;
      const ext = uri.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${threadId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const response = await fetch(uri);
      const blob = await response.blob();
      const { error: uploadErr } = await supabase.storage
        .from("messages")
        .upload(path, blob, { contentType: blob.type || "image/jpeg", upsert: false });
      if (uploadErr) throw uploadErr;
      const { data: inserted, error: msgErr } = await supabase
        .from("messages")
        .insert({
          thread_id: threadId,
          sender_id: user.id,
          content: "Photo",
          sender_display_name: myName || undefined,
        })
        .select("id, created_at")
        .single();
      if (msgErr || !inserted) throw msgErr || new Error("No message id");
      await supabase.from("message_attachments").insert({
        message_id: (inserted as { id: string }).id,
        url: path,
        type: "image",
      });
      await supabase
        .from("message_threads")
        .update({
          last_message_at: new Date().toISOString(),
          last_message_preview: "Photo",
        })
        .eq("id", threadId);
      setMessages((prev) => [
        ...prev,
        {
          id: (inserted as { id: string }).id,
          content: "Photo",
          created_at: (inserted as { created_at: string }).created_at,
          sender_id: user.id,
          read_at: null,
        },
      ]);
    } catch (e) {
      console.error("Send photo error:", e);
      Toast.show({
        type: "error",
        text1: "Could not send photo",
        text2: e instanceof Error ? e.message : "Try again.",
      });
    } finally {
      setSending(false);
    }
  }, [threadId, user?.id, myName]);

  const submitOffer = useCallback(async () => {
    if (!threadListingId || !listingForOffer || !user?.id) return;
    const pounds = parseFloat(offerAmountText.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(pounds) || pounds <= 0) {
      Toast.show({ type: "error", text1: "Enter a valid amount" });
      return;
    }
    const amountCents = Math.round(pounds * 100);
    const minCents = Math.ceil(listingForOffer.price_minor * 0.5);
    if (amountCents < minCents) {
      Toast.show({
        type: "error",
        text1: "Offer too low",
        text2: `Minimum is ${formatPrice(minCents)} (50% of asking)`,
      });
      return;
    }
    setOfferSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("offers-submit", {
        body: { listingId: threadListingId, amountCents },
      });
      if (error) throw error;
      const payload = data as {
        success?: boolean;
        thread_id?: string;
        status?: string;
        message?: string;
        error?: string;
      };
      if (payload?.error) throw new Error(payload.error);
      Toast.show({
        type: "success",
        text1: payload?.status === "accepted" ? "Offer accepted!" : "Offer sent",
        text2: payload?.message ?? "Seller will respond in Messages.",
      });
      setOfferAmountText("");
      setShowOfferForm(false);
      loadMessages();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Offer failed";
      Toast.show({ type: "error", text1: "Offer failed", text2: msg });
    } finally {
      setOfferSubmitting(false);
    }
  }, [threadListingId, listingForOffer, offerAmountText, user?.id, loadMessages]);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to view this conversation.</Text>
      </View>
    );
  }

  if (loading && messages.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.subtitle}>Loading messages…</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MessageBubble
            content={item.content}
            isMe={item.sender_id === user.id}
            timestamp={item.created_at}
            readAt={item.read_at}
            attachments={attachmentsByMsg[item.id]}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No messages yet. Say hello!</Text>
          </View>
        }
      />
      {acceptedOfferId && (
        <View style={styles.offerBar}>
          <Text style={styles.offerBarText}>You have an accepted offer</Text>
          <Pressable
            style={styles.offerBtn}
            onPress={() => router.push({ pathname: "/checkout/offer", params: { offerId: acceptedOfferId } } as any)}
          >
            <Text style={styles.offerBtnText}>Buy at offered price</Text>
          </Pressable>
        </View>
      )}
      {!acceptedOfferId && threadListingId && listingForOffer && (
        <View style={styles.makeOfferSection}>
          {!showOfferForm ? (
            <Pressable
              style={styles.makeOfferToggle}
              onPress={() => setShowOfferForm(true)}
            >
              <Text style={styles.makeOfferToggleText}>Make an offer on this book</Text>
            </Pressable>
          ) : (
            <View style={styles.offerForm}>
              <Text style={styles.offerFormTitle}>{listingForOffer.title}</Text>
              <Text style={styles.offerFormAsking}>Asking: {formatPrice(listingForOffer.price_minor)} · Min: {formatPrice(Math.ceil(listingForOffer.price_minor * 0.5))}</Text>
              <TextInput
                style={styles.offerInput}
                value={offerAmountText}
                onChangeText={setOfferAmountText}
                placeholder="Your offer (£)"
                placeholderTextColor="#94a3b8"
                keyboardType="decimal-pad"
                editable={!offerSubmitting}
              />
              <View style={styles.offerFormActions}>
                <Pressable
                  style={styles.offerFormBtnSecondary}
                  onPress={() => { setShowOfferForm(false); setOfferAmountText(""); }}
                  disabled={offerSubmitting}
                >
                  <Text style={styles.offerFormBtnSecondaryText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.offerFormBtnPrimary, offerSubmitting && styles.disabled]}
                  onPress={submitOffer}
                  disabled={offerSubmitting}
                >
                  {offerSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.offerBtnText}>Send offer</Text>
                  )}
                </Pressable>
              </View>
            </View>
          )}
        </View>
      )}
      <ChatInput
        onSend={sendMessage}
        onAttach={sendPhoto}
        disabled={!threadId}
        uploading={sending}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 16,
  },
  empty: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#64748b",
  },
  offerBar: {
    padding: 12,
    backgroundColor: "#f0fdf4",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#bbf7d0",
  },
  offerBarText: { fontSize: 13, color: "#166534", marginBottom: 8 },
  offerBtn: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  offerBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  makeOfferSection: {
    padding: 12,
    backgroundColor: "#f8fafc",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
  },
  makeOfferToggle: { paddingVertical: 8, alignItems: "center" },
  makeOfferToggleText: { fontSize: 14, color: "#0ea5e9", fontWeight: "600" },
  offerForm: { paddingVertical: 8 },
  offerFormTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  offerFormAsking: { fontSize: 12, color: "#64748b", marginBottom: 10 },
  offerInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  offerFormActions: { flexDirection: "row", gap: 12, justifyContent: "flex-end" },
  offerFormBtnSecondary: { paddingVertical: 10, paddingHorizontal: 16 },
  offerFormBtnSecondaryText: { color: "#64748b", fontWeight: "500" },
  offerFormBtnPrimary: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  disabled: { opacity: 0.7 },
});
