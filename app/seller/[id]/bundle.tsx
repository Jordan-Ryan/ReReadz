import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/format";
import { resolveListingCover } from "@/utils/cover";
import Toast from "react-native-toast-message";

interface ListingItem {
  id: string;
  title: string;
  author?: string | null;
  price_minor: number;
  image_url: string | null;
  slug: string | null;
}

export default function SellerBundleScreen() {
  const { id: sellerId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [sellerName, setSellerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    if (!sellerId) return;
    setLoading(true);
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", sellerId)
        .maybeSingle();
      setSellerName((profile as any)?.display_name ?? "Seller");

      const { data: rows } = await supabase
        .from("book_listings")
        .select("id, title, author, price_minor, slug, primary_image_url, isbn13, isbn10, book_images(url, position)")
        .eq("seller_id", sellerId)
        .eq("active", true)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      const items: ListingItem[] = (rows || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        author: row.author,
        price_minor: row.price_minor,
        image_url: resolveListingCover(row),
        slug: row.slug,
      }));
      setListings(items);
    } catch (e) {
      console.error(e);
      Toast.show({ type: "error", text1: "Failed to load listings" });
    } finally {
      setLoading(false);
    }
  }, [sellerId]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = (listingId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(listingId)) next.delete(listingId);
      else next.add(listingId);
      return next;
    });
  };

  const buySelected = async () => {
    if (selected.size === 0) {
      Toast.show({ type: "info", text1: "Select at least one book" });
      return;
    }
    if (!user) {
      Toast.show({ type: "info", text1: "Sign in to buy" });
      router.push("/(auth)/login");
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("checkout-session", {
        body: { listingIds: Array.from(selected) },
      });
      if (error) throw error;
      const orderId = (data as any)?.order_id ?? (data as any)?.orderId;
      if (!orderId) throw new Error("No order ID");
      router.push({ pathname: "/checkout", params: { orderId } } as any);
    } catch (e) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "Checkout failed",
        text2: e instanceof Error ? e.message : "Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const totalMinor = listings
    .filter((l) => selected.has(l.id))
    .reduce((sum, l) => sum + l.price_minor, 0);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bundle from {sellerName}</Text>
      <Text style={styles.subtitle}>
        Select multiple books to buy together from this seller.
      </Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {listings.map((item) => {
          const isSelected = selected.has(item.id);
          return (
            <Pressable
              key={item.id}
              style={[styles.row, isSelected && styles.rowSelected]}
              onPress={() => toggle(item.id)}
            >
              <View style={styles.checkbox}>
                {isSelected ? (
                  <Ionicons name="checkbox" size={24} color="#0ea5e9" />
                ) : (
                  <Ionicons name="square-outline" size={24} color="#94a3b8" />
                )}
              </View>
              {item.image_url ? (
                <Image source={{ uri: item.image_url }} style={styles.thumb} />
              ) : (
                <View style={[styles.thumb, styles.thumbPlaceholder]}>
                  <Text style={styles.thumbText}>?</Text>
                </View>
              )}
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                {item.author ? (
                  <Text style={styles.rowAuthor} numberOfLines={1}>
                    {item.author}
                  </Text>
                ) : null}
                <Text style={styles.rowPrice}>
                  {formatPrice(item.price_minor)}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      {selected.size > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerLabel}>
            {selected.size} book{selected.size !== 1 ? "s" : ""} selected
          </Text>
          <Text style={styles.footerTotal}>
            {formatPrice(totalMinor)}
          </Text>
          <Pressable
            style={[styles.buyBtn, submitting && styles.buyBtnDisabled]}
            onPress={buySelected}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buyBtnText}>Buy selected</Text>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 16 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  rowSelected: { backgroundColor: "#f0f9ff" },
  checkbox: { marginRight: 12 },
  thumb: { width: 56, height: 80, borderRadius: 4, backgroundColor: "#f1f5f9" },
  thumbPlaceholder: { justifyContent: "center", alignItems: "center" },
  thumbText: { fontSize: 18, color: "#94a3b8" },
  rowBody: { flex: 1, marginLeft: 12 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  rowAuthor: { fontSize: 13, color: "#64748b", marginTop: 2 },
  rowPrice: { fontSize: 14, fontWeight: "600", color: "#0f172a", marginTop: 4 },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  footerLabel: { fontSize: 14, color: "#64748b", marginBottom: 4 },
  footerTotal: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  buyBtn: {
    backgroundColor: "#0ea5e9",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buyBtnDisabled: { opacity: 0.7 },
  buyBtnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
