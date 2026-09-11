import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatBookFormat, formatCondition, formatPrice } from "@/utils/format";
import {
  DETAIL_DELIVERY,
  FONT_SANS,
  INK,
  LINE,
  MUTED,
  NAVY,
  NAVY_SOFT,
  SHIELD_NAME,
  WHITE,
} from "@/theme/brand";
import Toast from "react-native-toast-message";

interface ListingDetail {
  listing: {
    id: string;
    title: string;
    author: string;
    description?: string | null;
    price_minor: number;
    condition?: string;
    format?: string;
    seller_id: string;
  };
  images: { url: string; primary?: boolean }[];
  seller: { display_name: string; rating_avg?: number | null };
}

export default function ListingDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        const { data: res, error: err } = await supabase.functions.invoke(
          "listing-detail",
          { body: { idOrSlug: slug } }
        );
        if (cancelled) return;
        if (err) {
          setError(err.message);
          return;
        }
        if (res?.error === "not_found") {
          setError("Listing not found");
          return;
        }
        setData(res as ListingDetail);
      } catch (e) {
        if (!cancelled) setError("Failed to load listing");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const requireSignIn = (reason: string) => {
    if (user?.id) return false;
    Toast.show({ type: "info", text1: reason });
    router.push("/(auth)/login" as any);
    return true;
  };

  const handleMessageSeller = async () => {
    if (requireSignIn("Sign in to message the seller")) return;
    if (!user?.id || !data?.listing) return;
    const listingId = data.listing.id;
    const sellerId = data.listing.seller_id;
    const buyerId = user.id;
    try {
      const { data: existing } = await supabase
        .from("message_threads")
        .select("id")
        .eq("listing_id", listingId)
        .eq("buyer_id", buyerId)
        .eq("seller_id", sellerId)
        .maybeSingle();
      let threadId: string;
      if (existing?.id) {
        threadId = existing.id;
      } else {
        const { data: inserted, error } = await supabase
          .from("message_threads")
          .insert({ listing_id: listingId, buyer_id: buyerId, seller_id: sellerId })
          .select("id")
          .single();
        if (error) throw error;
        threadId = (inserted as { id: string }).id;
      }
      router.push(`/(tabs)/messages/${threadId}`);
    } catch (e) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "Could not open conversation",
        text2: e instanceof Error ? e.message : "Try again later.",
      });
    }
  };

  const handleBuy = async () => {
    if (requireSignIn("Sign in to buy this book")) return;
    if (!data?.listing?.id) return;
    try {
      const { data: res, error } = await supabase.functions.invoke("checkout-session", {
        body: { listingIds: [data.listing.id] },
      });
      if (error) throw error;
      const orderId = (res as any)?.order_id ?? (res as any)?.orderId;
      if (!orderId) throw new Error("No order ID returned");
      router.push({ pathname: "/checkout", params: { orderId } } as any);
    } catch (e: unknown) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "Checkout failed",
        text2: e instanceof Error ? e.message : "Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? "Not found"}</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const { listing, images, seller } = data;
  const primaryImage = images?.find((i) => i.primary) ?? images?.[0];
  const sellerName = seller?.display_name?.trim() || "ReReadz seller";
  const description =
    listing.description?.trim() ||
    "The seller hasn't added a description yet.";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {primaryImage?.url && (
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: primaryImage.url }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.author}>{listing.author}</Text>
      <Text style={styles.price}>{formatPrice(listing.price_minor)}</Text>

      <View style={styles.deliveryRow} accessibilityRole="text">
        <Ionicons name="bicycle-outline" size={18} color={NAVY} />
        <Text style={styles.delivery}>{DETAIL_DELIVERY}</Text>
      </View>

      <View style={styles.shieldCard}>
        <Ionicons name="shield-checkmark" size={18} color={NAVY} />
        <View style={styles.shieldCopy}>
          <Text style={styles.shield}>{SHIELD_NAME} on every order</Text>
          <Text style={styles.shieldHint}>
            Refund if it doesn't arrive as described.
          </Text>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockLabel}>Description</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockLabel}>Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailKey}>Condition</Text>
          <Text style={styles.detailValue}>
            {formatCondition(listing.condition)}
          </Text>
        </View>
        {listing.format ? (
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Format</Text>
            <Text style={styles.detailValue}>
              {formatBookFormat(listing.format)}
            </Text>
          </View>
        ) : null}
        <Pressable
          style={styles.detailRow}
          onPress={() =>
            router.push(`/seller/${listing.seller_id}` as any)
          }
          accessibilityRole="link"
          accessibilityLabel={`Seller ${sellerName}`}
        >
          <Text style={styles.detailKey}>Seller</Text>
          <Text style={styles.detailLink}>{sellerName}</Text>
        </Pressable>
      </View>

      <View style={styles.actions}>
        {user?.id && data.listing.seller_id !== user.id && (
          <Pressable
            style={styles.offerBtn}
            onPress={() =>
              router.push({
                pathname: "/listing/make-offer",
                params: { listingId: data.listing.id, slug },
              } as any)
            }
            accessibilityRole="button"
            accessibilityLabel="Make an offer on this book"
          >
            <Ionicons name="pricetag-outline" size={20} color={NAVY} />
            <Text style={styles.offerBtnText}>Make offer</Text>
          </Pressable>
        )}
        <View style={styles.ctaRow}>
          <Pressable
            style={styles.messageBtn}
            onPress={handleMessageSeller}
            accessibilityRole="button"
            accessibilityLabel="Message seller"
          >
            <Ionicons name="chatbubble-outline" size={18} color={NAVY} />
            <Text style={styles.messageBtnText}>Message seller</Text>
          </Pressable>
          <Pressable
            style={styles.buyBtn}
            onPress={handleBuy}
            accessibilityRole="button"
            accessibilityLabel="Buy now"
          >
            <Text style={styles.buyBtnText}>Buy now</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: MUTED, marginBottom: 16 },
  backBtn: { padding: 12 },
  backBtnText: { color: NAVY },
  imageWrap: {
    width: "100%",
    height: 220,
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  title: {
    fontFamily: FONT_SANS,
    fontSize: 22,
    fontWeight: "700",
    color: INK,
    marginBottom: 4,
  },
  author: {
    fontFamily: FONT_SANS,
    fontSize: 16,
    color: MUTED,
    marginBottom: 8,
  },
  price: {
    fontFamily: FONT_SANS,
    fontSize: 22,
    fontWeight: "700",
    color: INK,
    marginBottom: 12,
  },
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  delivery: {
    fontFamily: FONT_SANS,
    fontSize: 15,
    color: NAVY,
    fontWeight: "600",
  },
  shieldCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: NAVY_SOFT,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  shieldCopy: { flex: 1 },
  shield: {
    fontFamily: FONT_SANS,
    fontSize: 14,
    color: NAVY,
    fontWeight: "700",
  },
  shieldHint: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    color: MUTED,
    marginTop: 2,
  },
  block: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: LINE,
    paddingTop: 16,
    marginBottom: 8,
  },
  blockLabel: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    fontWeight: "700",
    color: MUTED,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  description: {
    fontFamily: FONT_SANS,
    fontSize: 15,
    lineHeight: 22,
    color: INK,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: LINE,
  },
  detailKey: { fontFamily: FONT_SANS, fontSize: 15, color: MUTED },
  detailValue: { fontFamily: FONT_SANS, fontSize: 15, color: INK, fontWeight: "600" },
  detailLink: { fontFamily: FONT_SANS, fontSize: 15, color: NAVY, fontWeight: "700" },
  actions: { gap: 12, marginTop: 16 },
  ctaRow: { flexDirection: "row", gap: 10 },
  offerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: NAVY,
  },
  offerBtnText: { color: NAVY, fontWeight: "600", fontSize: 16 },
  messageBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: NAVY,
    backgroundColor: WHITE,
  },
  messageBtnText: { color: NAVY, fontWeight: "600", fontSize: 15 },
  buyBtn: {
    flex: 1,
    backgroundColor: NAVY,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtnText: { color: WHITE, fontWeight: "700", fontSize: 16 },
});
