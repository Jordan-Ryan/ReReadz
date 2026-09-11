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
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/LoadingScreen";

interface CharityRow {
  id: string;
  name: string;
  tagline: string | null;
  logo_url: string | null;
  registered_charity_number: string;
  follower_count: number | null;
}

export default function CharitiesIndexScreen() {
  const router = useRouter();
  const [charities, setCharities] = useState<CharityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("charities")
        .select("id, name, tagline, logo_url, registered_charity_number, follower_count")
        .order("follower_count", { ascending: false, nullsFirst: false })
        .limit(100);
      if (err) throw err;
      setCharities((data as CharityRow[]) ?? []);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load charities");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingScreen message="Loading charities…" />;
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (charities.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No charities yet</Text>
        <Text style={styles.subtitle}>Charities you can support when buying books will appear here.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={charities}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => router.push(`/charities/${item.id}` as any)}
          accessibilityRole="button"
          accessibilityLabel={`View charity ${item.name}`}
        >
          {item.logo_url ? (
            <Image source={{ uri: item.logo_url }} style={styles.logo} />
          ) : (
            <View style={[styles.logo, styles.logoPlaceholder]}>
              <Ionicons name="heart" size={24} color="#1700AD" />
            </View>
          )}
          <View style={styles.cardBody}>
            <Text style={styles.name}>{item.name}</Text>
            {item.tagline ? (
              <Text style={styles.tagline} numberOfLines={2}>{item.tagline}</Text>
            ) : null}
            <Text style={styles.meta}>
              Reg. {item.registered_charity_number}
              {item.follower_count != null ? ` · ${item.follower_count} followers` : ""}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  errorText: { color: "#64748b", textAlign: "center" },
  emptyTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#64748b", textAlign: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  logo: { width: 56, height: 56, borderRadius: 8, backgroundColor: "#fef2f2" },
  logoPlaceholder: { justifyContent: "center", alignItems: "center" },
  logoText: { fontSize: 24 },
  cardBody: { flex: 1, marginLeft: 16 },
  name: { fontSize: 16, fontWeight: "600", color: "#0f172a", marginBottom: 4 },
  tagline: { fontSize: 13, color: "#64748b", marginBottom: 4 },
  meta: { fontSize: 11, color: "#94a3b8" },
});
