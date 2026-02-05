import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import { LoadingScreen } from "@/components/LoadingScreen";

interface BundleRow {
  id: string;
  status: string;
  negotiated_price_minor: number | null;
  created_at: string;
  buyer_id: string;
  seller_id: string;
}

export default function BundlesScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [bundles, setBundles] = useState<BundleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("bundle_sessions")
        .select("id, status, negotiated_price_minor, created_at, buyer_id, seller_id")
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order("created_at", { ascending: false })
        .limit(50);
      if (err) throw err;
      setBundles((data as BundleRow[]) ?? []);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load bundles");
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
        <Text style={styles.subtitle}>Sign in to view your bundles.</Text>
      </View>
    );
  }

  if (loading) return <LoadingScreen message="Loading bundles…" />;
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (bundles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No bundles yet</Text>
        <Text style={styles.subtitle}>
          When you buy or sell multiple books together, your bundle deals will appear here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bundles}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const isBuyer = item.buyer_id === user.id;
        return (
          <Pressable
            style={styles.row}
            onPress={() => {
              // Could link to bundle detail or order if status is completed
              if (item.status === "completed") {
                // Order might be linked via order_id in another table; for now just show
              }
            }}
            accessibilityRole="button"
            accessibilityLabel={`Bundle ${item.status}, ${item.negotiated_price_minor != null ? formatPrice(item.negotiated_price_minor) : "negotiating"}`}
          >
            <View style={styles.rowBody}>
              <Text style={styles.rowTitle}>
                {isBuyer ? "You bought" : "You sold"} · {item.status}
              </Text>
              <Text style={styles.rowMeta}>
                {item.negotiated_price_minor != null
                  ? formatPrice(item.negotiated_price_minor)
                  : "Price TBC"}
                {" · "}
                {new Date(item.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
            <Text style={styles.statusBadge}>{item.status}</Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  subtitle: { color: "#64748b", marginTop: 8, textAlign: "center" },
  errorText: { color: "#64748b", textAlign: "center" },
  emptyTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  rowBody: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  rowMeta: { fontSize: 13, color: "#64748b", marginTop: 4 },
  statusBadge: { fontSize: 12, color: "#0ea5e9", fontWeight: "600", textTransform: "capitalize" },
});
