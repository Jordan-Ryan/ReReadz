import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/LoadingScreen";

interface BookClub {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  image_url: string | null;
  meeting_type: string;
  frequency: string;
  meeting_day: string | null;
  meeting_time: string | null;
  location_city: string | null;
  location_name: string | null;
  location_postcode: string | null;
  online_platform: string | null;
  how_to_join: string | null;
  member_count: number | null;
  max_members: number | null;
  age_range: string | null;
  genres: string[] | null;
}

interface Read {
  id: string;
  title: string;
  author: string | null;
  is_current: boolean | null;
  discussion_date: string | null;
  cover_url: string | null;
}

export default function BookClubDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [club, setClub] = useState<BookClub | null>(null);
  const [reads, setReads] = useState<Read[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data: clubData, error: clubErr } = await supabase
        .from("book_clubs")
        .select("id, name, tagline, description, image_url, meeting_type, frequency, meeting_day, meeting_time, location_city, location_name, location_postcode, online_platform, how_to_join, member_count, max_members, age_range, genres")
        .eq("id", id)
        .maybeSingle();
      if (clubErr) throw clubErr;
      setClub(clubData as BookClub | null);

      const { data: readsData } = await supabase
        .from("book_club_reads")
        .select("id, title, author, is_current, discussion_date, cover_url")
        .eq("book_club_id", id)
        .order("discussion_date", { ascending: false, nullsFirst: false })
        .limit(20);
      setReads((readsData as Read[]) ?? []);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load book club");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingScreen message="Loading book club…" />;
  if (error || !club) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? "Book club not found"}</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const meetingTypeLabel = club.meeting_type === "online" ? "Online" : club.meeting_type === "in_person" ? "In person" : "Hybrid";
  const freqLabel = club.frequency === "weekly" ? "Weekly" : club.frequency === "fortnightly" ? "Fortnightly" : club.frequency;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {club.image_url ? (
        <Image source={{ uri: club.image_url }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Ionicons name="library-outline" size={48} color="#94a3b8" />
        </View>
      )}
      <Text style={styles.name}>{club.name}</Text>
      {club.tagline ? <Text style={styles.tagline}>{club.tagline}</Text> : null}
      <View style={styles.badges}>
        <Text style={styles.badge}>{meetingTypeLabel}</Text>
        <Text style={styles.badge}>{freqLabel}</Text>
      </View>
      {club.member_count != null && (
        <Text style={styles.members}>
          {club.member_count}{club.max_members ? ` / ${club.max_members}` : ""} members
        </Text>
      )}
      {club.description ? (
        <Text style={styles.description}>{club.description}</Text>
      ) : null}
      {(club.location_name || club.location_city || club.online_platform) && (
        <View>
          <Text style={styles.sectionTitle}>Where & when</Text>
          <Text style={styles.body}>
            {club.location_name && `${club.location_name}\n`}
            {club.location_city && `${club.location_city}${club.location_postcode ? ` ${club.location_postcode}` : ""}\n`}
            {club.online_platform && `Online: ${club.online_platform}\n`}
            {club.meeting_day && `Day: ${club.meeting_day}\n`}
            {club.meeting_time && `Time: ${club.meeting_time}`}
          </Text>
        </View>
      )}
      {club.how_to_join && (
        <>
          <Text style={styles.sectionTitle}>How to join</Text>
          <Text style={styles.body}>{club.how_to_join}</Text>
        </>
      )}
      {reads.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Current & past reads</Text>
          {reads.map((r) => (
            <View key={r.id} style={styles.readRow}>
              {r.cover_url ? (
                <Image source={{ uri: r.cover_url }} style={styles.readThumb} />
              ) : (
                <View style={[styles.readThumb, styles.readThumbPlaceholder]}>
                  <Ionicons name="book-outline" size={18} color="#94a3b8" />
                </View>
              )}
              <View style={styles.readBody}>
                <Text style={styles.readTitle}>{r.title}</Text>
                {r.author ? <Text style={styles.readAuthor}>{r.author}</Text> : null}
                {r.is_current && <Text style={styles.currentBadge}>Current read</Text>}
                {r.discussion_date && (
                  <Text style={styles.readDate}>
                    Discussion: {new Date(r.discussion_date).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  errorText: { color: "#64748b", marginBottom: 16 },
  backBtn: { padding: 12 },
  backBtnText: { color: "#0ea5e9", fontWeight: "600" },
  image: { width: "100%", height: 180, borderRadius: 12, marginBottom: 16, backgroundColor: "#f1f5f9" },
  imagePlaceholder: { justifyContent: "center", alignItems: "center" },
  imageText: { fontSize: 48 },
  name: { fontSize: 22, fontWeight: "700", color: "#0f172a", marginBottom: 8 },
  tagline: { fontSize: 15, color: "#64748b", marginBottom: 12 },
  badges: { flexDirection: "row", gap: 8, marginBottom: 8 },
  badge: { fontSize: 12, color: "#0ea5e9", fontWeight: "600", backgroundColor: "#f0f9ff", paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  members: { fontSize: 13, color: "#64748b", marginBottom: 16 },
  description: { fontSize: 15, lineHeight: 22, color: "#334155", marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#0f172a", marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 22, color: "#64748b", marginBottom: 20 },
  readRow: { flexDirection: "row", marginBottom: 16, alignItems: "flex-start" },
  readThumb: { width: 48, height: 64, borderRadius: 4, backgroundColor: "#f1f5f9" },
  readThumbPlaceholder: { justifyContent: "center", alignItems: "center" },
  readThumbText: { fontSize: 18 },
  readBody: { flex: 1, marginLeft: 12 },
  readTitle: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  readAuthor: { fontSize: 13, color: "#64748b", marginTop: 2 },
  currentBadge: { fontSize: 11, color: "#166534", marginTop: 4 },
  readDate: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
});
