import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/integrations/supabase/client";
import { BookCard } from "@/components/BookCard";
import type { BookCardData } from "@/components/BookCard";

export default function SellerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [seller, setSeller] = useState<{ display_name: string } | null>(null);
  const [listings, setListings] = useState<BookCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const [profRes, listRes] = await Promise.all([
          supabase.from("profiles").select("display_name").eq("id", id).maybeSingle(),
          supabase
            .from("book_listings")
            .select("id, slug, title, author, price_minor, condition, created_at, book_images!left(url, position)")
            .eq("seller_id", id)
            .eq("active", true)
            .is("deleted_at", null)
            .order("created_at", { ascending: false })
            .limit(24),
        ]);
        if (cancelled) return;
        setSeller(profRes.data as any);
        const list = (listRes.data || []).map((row: any) => {
          const firstImg = row.book_images?.find((i: any) => i.position === 0) || row.book_images?.[0];
          return {
            id: row.id,
            slug: row.slug ?? row.id,
            title: row.title,
            author: row.author,
            price_minor: row.price_minor,
            image_url: firstImg?.url ?? null,
            condition: row.condition,
            created_at: row.created_at,
          };
        });
        setListings(list);
      } catch (_) {}
      finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {seller && (
        <View style={styles.header}>
          <Text style={styles.sellerName}>{seller.display_name || "Seller"}</Text>
          {listings.length > 1 && (
            <Pressable
              style={styles.bundleBtn}
              onPress={() => router.push(`/seller/${id}/bundle` as any)}
            >
              <Ionicons name="layers-outline" size={18} color="#0ea5e9" />
              <Text style={styles.bundleBtnText}>Buy multiple</Text>
            </Pressable>
          )}
        </View>
      )}
      <Text style={styles.sectionTitle}>Listings</Text>
      <View style={styles.grid}>
        {listings.map((book) => (
          <View key={book.id} style={styles.cardWrap}>
            <BookCard book={book} flex />
          </View>
        ))}
      </View>
      {listings.length === 0 && (
        <Text style={styles.empty}>No listings yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 16 },
  sellerName: { fontSize: 20, fontWeight: "700" },
  bundleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },
  bundleBtnText: { fontSize: 14, fontWeight: "600", color: "#0ea5e9" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  cardWrap: { width: "48%" },
  empty: { color: "#64748b" },
});
