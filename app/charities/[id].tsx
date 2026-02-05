import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import Toast from "react-native-toast-message";

interface Charity {
  id: string;
  name: string;
  tagline: string | null;
  logo_url: string | null;
  registered_charity_number: string;
  follower_count: number | null;
}

export default function CharityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [charity, setCharity] = useState<Charity | null>(null);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data: charityData, error: charityErr } = await supabase
        .from("charities")
        .select("id, name, tagline, logo_url, registered_charity_number, follower_count")
        .eq("id", id)
        .maybeSingle();
      if (charityErr) throw charityErr;
      setCharity(charityData as Charity | null);

      if (user?.id) {
        const { data: followData } = await supabase
          .from("charity_follows")
          .select("id")
          .eq("charity_id", id)
          .eq("user_id", user.id)
          .maybeSingle();
        setFollowing(!!(followData as { id?: string } | null)?.id);
      } else {
        setFollowing(false);
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load charity");
    } finally {
      setLoading(false);
    }
  }, [id, user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleFollow = async () => {
    if (!user?.id || !id) {
      Toast.show({ type: "info", text1: "Sign in to follow charities" });
      return;
    }
    setToggling(true);
    try {
      if (following) {
        await supabase
          .from("charity_follows")
          .delete()
          .eq("charity_id", id)
          .eq("user_id", user.id);
        setFollowing(false);
        setCharity((c) => (c && c.follower_count != null ? { ...c, follower_count: Math.max(0, c.follower_count - 1) } : c));
        Toast.show({ type: "success", text1: "Unfollowed" });
      } else {
        await supabase.from("charity_follows").insert({
          charity_id: id,
          user_id: user.id,
          notify_new_listings: true,
        });
        setFollowing(true);
        setCharity((c) => (c && c.follower_count != null ? { ...c, follower_count: c.follower_count + 1 } : c));
        Toast.show({ type: "success", text1: "Following" });
      }
    } catch (e) {
      Toast.show({ type: "error", text1: "Could not update follow" });
    } finally {
      setToggling(false);
    }
  };

  if (loading) return <LoadingScreen message="Loading charity…" />;
  if (error || !charity) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? "Charity not found"}</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {charity.logo_url ? (
        <Image source={{ uri: charity.logo_url }} style={styles.logo} />
      ) : (
        <View style={[styles.logo, styles.logoPlaceholder]}>
          <Text style={styles.logoText}>♥</Text>
        </View>
      )}
      <Text style={styles.name}>{charity.name}</Text>
      {charity.tagline ? <Text style={styles.tagline}>{charity.tagline}</Text> : null}
      <Text style={styles.reg}>Registered charity: {charity.registered_charity_number}</Text>
      {charity.follower_count != null && (
        <Text style={styles.followers}>{charity.follower_count} followers</Text>
      )}

      {user && (
        <Pressable
          style={[styles.followBtn, following && styles.followBtnActive, toggling && styles.disabled]}
          onPress={toggleFollow}
          disabled={toggling}
          accessibilityRole="button"
          accessibilityLabel={following ? "Unfollow charity" : "Follow charity"}
        >
          {toggling ? (
            <ActivityIndicator size="small" color={following ? "#0ea5e9" : "#fff"} />
          ) : (
            <Text style={[styles.followBtnText, following && styles.followBtnTextActive]}>
              {following ? "Following" : "Follow"}
            </Text>
          )}
        </Pressable>
      )}

      <Text style={styles.hint}>
        When you buy from a listing that supports this charity, a portion goes to them. Follow to get notified about new charity listings.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32, alignItems: "center" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  errorText: { color: "#64748b", marginBottom: 16 },
  backBtn: { padding: 12 },
  backBtnText: { color: "#0ea5e9", fontWeight: "600" },
  logo: { width: 80, height: 80, borderRadius: 12, marginBottom: 16 },
  logoPlaceholder: { backgroundColor: "#fef2f2", justifyContent: "center", alignItems: "center" },
  logoText: { fontSize: 32 },
  name: { fontSize: 22, fontWeight: "700", color: "#0f172a", marginBottom: 8, textAlign: "center" },
  tagline: { fontSize: 15, color: "#64748b", marginBottom: 12, textAlign: "center" },
  reg: { fontSize: 13, color: "#94a3b8", marginBottom: 8 },
  followers: { fontSize: 13, color: "#64748b", marginBottom: 24 },
  followBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 140,
    alignItems: "center",
    marginBottom: 24,
  },
  followBtnActive: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#0ea5e9" },
  followBtnText: { color: "#fff", fontWeight: "600" },
  followBtnTextActive: { color: "#0ea5e9" },
  disabled: { opacity: 0.7 },
  hint: { fontSize: 13, color: "#64748b", textAlign: "center" },
});
