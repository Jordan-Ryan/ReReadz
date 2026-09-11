import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import Toast from "react-native-toast-message";

function statusBadgeStyle(status: string): { backgroundColor: string } {
  const map: Record<string, string> = {
    ACTIVE: "#dcfce7",
    DRAFT: "#fef3c7",
    SOLD: "#fee2e2",
    PAUSED: "#e2e8f0",
    REMOVED: "#f1f5f9",
  };
  return { backgroundColor: map[status] ?? "#e2e8f0" };
}

interface MyListingItem {
  id: string;
  slug: string | null;
  title: string | null;
  author: string | null;
  price_minor: number | null;
  condition_label: string | null;
  image_url: string | null;
  status: "ACTIVE" | "DRAFT" | "PAUSED" | "SOLD" | "REMOVED";
  created_at_iso: string;
  published_at_iso?: string | null;
}

export default function MyListingsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<MyListingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("me-listings", {
        body: { page: 1, pageSize: 100 },
      });
      if (error) throw error;
      setListings(data?.items ?? []);
    } catch (e) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "Error loading listings",
        text2: e instanceof Error ? e.message : "Try again later",
      });
      setListings([]);
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
        <Text style={styles.subtitle}>Sign in to view your listings.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (listings.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No listings yet</Text>
        <Text style={styles.subtitle}>
          Create a listing from the Sell tab to get started.
        </Text>
        <Pressable
          style={styles.primaryBtn}
          onPress={() => router.push("/(tabs)/sell" as any)}
        >
          <Text style={styles.primaryBtnText}>Sell a book</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={listings}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => {
            if (item.status === "DRAFT") {
              router.push({ pathname: "/sell/[id]", params: { id: item.id } } as any);
            } else if (item.slug) {
              router.push(`/listing/${item.slug}` as any);
            }
          }}
        >
          <View style={styles.thumbWrap}>
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.thumb} />
            ) : (
              <View style={[styles.thumb, styles.thumbPlaceholder]}>
                <Text style={styles.thumbPlaceholderText}>No image</Text>
              </View>
            )}
            {item.status === "SOLD" ? (
              <View style={styles.soldBar}>
                <Text style={styles.soldText}>Sold</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title ?? "Untitled"}
            </Text>
            {item.author ? (
              <Text style={styles.cardAuthor} numberOfLines={1}>
                {item.author}
              </Text>
            ) : null}
            <View style={styles.cardMeta}>
              <Text style={styles.price}>
                {item.price_minor != null
                  ? formatPrice(item.price_minor)
                  : "—"}
              </Text>
              <View style={[styles.badge, statusBadgeStyle(item.status)]}>
                <Text style={styles.badgeText}>
                  {item.status === "SOLD" ? "Sold" : item.status}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, paddingBottom: 32 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  thumbWrap: {
    width: 80,
    height: 110,
    overflow: "hidden",
  },
  thumb: {
    width: 80,
    height: 110,
    backgroundColor: "#f1f5f9",
  },
  thumbPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  thumbPlaceholderText: { fontSize: 11, color: "#94a3b8" },
  soldBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15,23,42,0.72)",
    paddingVertical: 4,
    alignItems: "center",
  },
  soldText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  cardBody: { flex: 1, padding: 12, justifyContent: "space-between" },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#0f172a" },
  cardAuthor: { fontSize: 13, color: "#64748b", marginTop: 2 },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#e2e8f0",
  },
  badgeText: { fontSize: 11, fontWeight: "600", color: "#475569" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 16 },
  primaryBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  primaryBtnText: { color: "#fff", fontWeight: "600" },
});
