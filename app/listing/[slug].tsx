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
import { formatPrice } from "@/utils/format";
import Toast from "react-native-toast-message";

interface ListingDetail {
  listing: {
    id: string;
    title: string;
    author: string;
    description?: string | null;
    price_minor: number;
    condition?: string;
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

  const handleMessageSeller = async () => {
    if (!user?.id || !data?.listing) {
      Toast.show({ type: "info", text1: "Sign in to message the seller" });
      return;
    }
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
      {listing.condition && (
        <Text style={styles.condition}>Condition: {listing.condition}</Text>
      )}
      {seller?.display_name && (
        <Text style={styles.seller}>Seller: {seller.display_name}</Text>
      )}
      {listing.description ? (
        <Text style={styles.description}>{listing.description}</Text>
      ) : null}
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
            <Ionicons name="pricetag-outline" size={20} color="#0ea5e9" />
            <Text style={styles.offerBtnText}>Make offer</Text>
          </Pressable>
        )}
        <Pressable
          style={styles.messageBtn}
          onPress={handleMessageSeller}
          accessibilityRole="button"
          accessibilityLabel="Message seller"
        >
          <Ionicons name="chatbubble-outline" size={20} color="#0ea5e9" />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "#64748b", marginBottom: 16 },
  backBtn: { padding: 12 },
  backBtnText: { color: "#0ea5e9" },
  imageWrap: {
    width: "100%",
    height: 280,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  author: { fontSize: 16, color: "#64748b", marginBottom: 8 },
  price: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  condition: { fontSize: 14, color: "#64748b", marginBottom: 4 },
  seller: { fontSize: 14, marginBottom: 16 },
  description: { fontSize: 14, lineHeight: 22, marginBottom: 24 },
  actions: { gap: 12 },
  offerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },
  offerBtnText: { color: "#0ea5e9", fontWeight: "600", fontSize: 16 },
  messageBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },
  messageBtnText: { color: "#0ea5e9", fontWeight: "600", fontSize: 16 },
  buyBtn: {
    backgroundColor: "#0ea5e9",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buyBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
