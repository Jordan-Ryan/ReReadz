import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import Toast from "react-native-toast-message";

export default function MakeOfferScreen() {
  const { listingId, slug } = useLocalSearchParams<{ listingId: string; slug?: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [listing, setListing] = useState<{ title: string; price_minor: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [amountText, setAmountText] = useState("");

  useEffect(() => {
    if (!listingId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await supabase
          .from("book_listings")
          .select("title, price_minor")
          .eq("id", listingId)
          .maybeSingle();
        setListing((data as { title: string; price_minor: number } | null) ?? null);
      } catch {
        setListing(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [listingId]);

  const handleSubmit = async () => {
    if (!user?.id || !listingId || !listing) {
      Toast.show({ type: "info", text1: "Sign in to make an offer" });
      return;
    }
    const pounds = parseFloat(amountText.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(pounds) || pounds <= 0) {
      Toast.show({ type: "error", text1: "Enter a valid amount" });
      return;
    }
    const amountCents = Math.round(pounds * 100);
    const minCents = Math.ceil(listing.price_minor * 0.5);
    if (amountCents < minCents) {
      Toast.show({
        type: "error",
        text1: "Offer too low",
        text2: `Minimum is ${formatPrice(minCents)} (50% of asking)`,
      });
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("offers-submit", {
        body: { listingId, amountCents },
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
      const messageThreadId = payload?.thread_id;
      Toast.show({
        type: "success",
        text1: payload?.status === "accepted" ? "Offer accepted!" : "Offer sent",
        text2: payload?.message ?? "Seller will respond in Messages.",
      });
      if (messageThreadId) {
        router.replace(`/(tabs)/messages/${messageThreadId}` as any);
      } else {
        router.back();
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Offer failed";
      Toast.show({ type: "error", text1: "Offer failed", text2: msg });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to make an offer.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!listing) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Listing not found.</Text>
        <Pressable style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const minPrice = Math.ceil(listing.price_minor * 0.5);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.asking}>Asking price: {formatPrice(listing.price_minor)}</Text>
        <Text style={styles.label}>Your offer (£)</Text>
        <TextInput
          style={styles.input}
          value={amountText}
          onChangeText={setAmountText}
          placeholder="e.g. 5.99"
          placeholderTextColor="#94a3b8"
          keyboardType="decimal-pad"
          editable={!submitting}
        />
        <Text style={styles.hint}>Minimum offer: {formatPrice(minPrice)}</Text>
        <Pressable
          style={[styles.btn, styles.btnPrimary, submitting && styles.disabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.btnText}>Send offer</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  subtitle: { color: "#64748b", marginBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#e2e8f0" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  asking: { fontSize: 14, color: "#64748b", marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  hint: { fontSize: 12, color: "#94a3b8", marginBottom: 20 },
  btn: { padding: 14, borderRadius: 8, alignItems: "center" },
  btnPrimary: { backgroundColor: "#0ea5e9" },
  btnText: { color: "#fff", fontWeight: "600" },
  disabled: { opacity: 0.7 },
});
