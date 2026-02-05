import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import { LoadingScreen } from "@/components/LoadingScreen";

interface SpotlightRow {
  id: string;
  listing_id: string;
  amount_minor: number;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  book_listings?: { title: string | null; slug: string | null; primary_image_url: string | null } | null;
}

export default function SpotlightScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [promotions, setPromotions] = useState<SpotlightRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("spotlight_promotions")
        .select("id, listing_id, amount_minor, starts_at, expires_at, is_active, book_listings(title, slug, primary_image_url)")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (err) throw err;
      setPromotions((data as SpotlightRow[]) ?? []);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load spotlight");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to manage your spotlight promotions.</Text>
      </View>
    );
  }

  if (loading) return <LoadingScreen message="Loading spotlight…" />;
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const now = new Date().toISOString();
  const active = promotions.filter((p) => p.is_active && p.starts_at <= now && p.expires_at > now);
  const past = promotions.filter((p) => !p.is_active || p.expires_at <= now);

  return (
    <FlatList
      data={[...active, ...past]}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Text style={styles.hint}>
          Spotlight gives your listings extra visibility. To create or manage spotlight promotions, use the web app—select a listing and choose "Spotlight".
        </Text>
      }
      renderItem={({ item }) => {
        const listing = item.book_listings ?? (item as any).book_listings;
        const isActive = item.is_active && item.starts_at <= now && item.expires_at > now;
        return (
          <Pressable
            style={styles.card}
            onPress={() => listing?.slug && router.push(`/listing/${listing.slug}` as any)}
            accessibilityRole="button"
            accessibilityLabel={`${listing?.title ?? "Listing"} spotlight ${isActive ? "active" : "ended"}`}
          >
            {listing?.primary_image_url ? (
              <Image source={{ uri: listing.primary_image_url }} style={styles.thumb} />
            ) : (
              <View style={[styles.thumb, styles.thumbPlaceholder]}>
                <Text style={styles.thumbText}>📖</Text>
              </View>
            )}
            <View style={styles.cardBody}>
              <Text style={styles.title} numberOfLines={2}>{listing?.title ?? "Listing"}</Text>
              <Text style={styles.amount}>{formatPrice(item.amount_minor)}</Text>
              <Text style={[styles.badge, isActive ? styles.badgeActive : styles.badgeEnded]}>
                {isActive ? "Active" : "Ended"}
              </Text>
              <Text style={styles.meta}>
                Until {new Date(item.expires_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  subtitle: { color: "#64748b", textAlign: "center" },
  errorText: { color: "#64748b", textAlign: "center" },
  hint: { fontSize: 14, color: "#64748b", marginBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  thumb: { width: 64, height: 84, backgroundColor: "#f1f5f9" },
  thumbPlaceholder: { justifyContent: "center", alignItems: "center" },
  thumbText: { fontSize: 20 },
  cardBody: { flex: 1, padding: 12, justifyContent: "center" },
  title: { fontSize: 15, fontWeight: "600", color: "#0f172a", marginBottom: 4 },
  amount: { fontSize: 14, color: "#0ea5e9", fontWeight: "600", marginBottom: 4 },
  badge: { fontSize: 11, fontWeight: "600", alignSelf: "flex-start", paddingVertical: 2, paddingHorizontal: 8, borderRadius: 4, marginBottom: 4 },
  badgeActive: { backgroundColor: "#f0fdf4", color: "#166534" },
  badgeEnded: { backgroundColor: "#f1f5f9", color: "#64748b" },
  meta: { fontSize: 11, color: "#94a3b8" },
});
