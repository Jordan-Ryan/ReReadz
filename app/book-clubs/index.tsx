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

interface BookClubRow {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  image_url: string | null;
  meeting_type: string;
  frequency: string;
  location_city: string | null;
  location_name: string | null;
  online_platform: string | null;
  member_count: number | null;
  max_members: number | null;
}

export default function BookClubsIndexScreen() {
  const router = useRouter();
  const [clubs, setClubs] = useState<BookClubRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("book_clubs")
        .select("id, name, tagline, description, image_url, meeting_type, frequency, location_city, location_name, online_platform, member_count, max_members")
        .eq("is_active", true)
        .order("member_count", { ascending: false, nullsFirst: false })
        .limit(50);
      if (err) throw err;
      setClubs((data as BookClubRow[]) ?? []);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load book clubs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingScreen message="Loading book clubs…" />;
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (clubs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No book clubs yet</Text>
        <Text style={styles.subtitle}>Discover reading groups near you or online.</Text>
      </View>
    );
  }

  const formatMeeting = (c: BookClubRow) => {
    const type = c.meeting_type === "online" ? "Online" : c.meeting_type === "in_person" ? "In person" : "Hybrid";
    const loc = c.location_city ?? c.location_name ?? c.online_platform ?? "";
    const freq = c.frequency === "weekly" ? "Weekly" : c.frequency === "fortnightly" ? "Fortnightly" : c.frequency;
    return [type, loc, freq].filter(Boolean).join(" · ");
  };

  return (
    <FlatList
      data={clubs}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => router.push(`/book-clubs/${item.id}` as any)}
          accessibilityRole="button"
          accessibilityLabel={`View book club: ${item.name}`}
        >
          {item.image_url ? (
            <Image source={{ uri: item.image_url }} style={styles.thumb} />
          ) : (
            <View style={[styles.thumb, styles.thumbPlaceholder]}>
              <Ionicons name="library-outline" size={28} color="#94a3b8" />
            </View>
          )}
          <View style={styles.cardBody}>
            <Text style={styles.name}>{item.name}</Text>
            {item.tagline ? (
              <Text style={styles.tagline} numberOfLines={1}>{item.tagline}</Text>
            ) : null}
            <Text style={styles.meta}>{formatMeeting(item)}</Text>
            {item.member_count != null && (
              <Text style={styles.members}>{item.member_count}{item.max_members ? ` / ${item.max_members}` : ""} members</Text>
            )}
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
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  thumb: { width: 80, height: 80, backgroundColor: "#f1f5f9" },
  thumbPlaceholder: { justifyContent: "center", alignItems: "center" },
  thumbText: { fontSize: 28 },
  cardBody: { flex: 1, padding: 12, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "600", color: "#0f172a", marginBottom: 4 },
  tagline: { fontSize: 13, color: "#64748b", marginBottom: 4 },
  meta: { fontSize: 12, color: "#94a3b8", marginBottom: 2 },
  members: { fontSize: 11, color: "#64748b" },
});
