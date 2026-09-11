import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Glass } from "@/components/Glass";
import { useTabClearance } from "@/hooks/useTabClearance";
import {
  GLASS_FILL_STRONG,
  INK,
  MUTED,
  NAVY,
  NAVY_SOFT,
  WHITE,
} from "@/theme/brand";

interface ProfileSummary {
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
}

type Tile = {
  href: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

/**
 * Signed You map. A row ships only if it works and Jordan signed it.
 * Gone > coming-soon. No marketing/legal dumps, admin, or stubs.
 */
const TILES: Tile[] = [
  { href: "orders", label: "Orders", icon: "receipt-outline" },
  { href: "listings", label: "Listings", icon: "albums-outline" },
  { href: "wallet", label: "Wallet", icon: "wallet-outline" },
  { href: "bookshelf", label: "Bookshelf", icon: "book-outline" },
];

const ROWS: Tile[] = [
  { href: "notifications", label: "Notifications", icon: "notifications-outline" },
  { href: "settings", label: "Settings", icon: "settings-outline" },
];

export default function AccountScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const clearance = useTabClearance();
  const [profile, setProfile] = useState<ProfileSummary | null>(null);

  const loadProfile = useCallback(async () => {
    if (!user?.id) {
      setProfile(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, username, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      setProfile((data as ProfileSummary | null) ?? null);
    } catch (error) {
      console.error("You: failed to load profile summary", error);
      setProfile(null);
    }
  }, [user?.id]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("You: sign out failed", error);
    }
  };

  const go = (href: string) => router.push(href as any);

  const displayName =
    profile?.display_name?.trim() ||
    profile?.username?.trim() ||
    user?.email?.split("@")[0] ||
    "You";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: clearance }]}
    >
      <Text style={styles.pageTitle}>You</Text>

      {!user ? (
        <Glass style={styles.profileCard} overlayColor={GLASS_FILL_STRONG}>
          <Text style={styles.signedOutTitle}>Sign in to manage your ReReadz</Text>
          <Text style={styles.signedOutSub}>
            Orders, listings, wallet, and settings live here — once you are in.
          </Text>
          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.push("/(auth)/login" as any)}
            accessibilityRole="button"
            accessibilityLabel="Sign in"
          >
            <Text style={styles.primaryBtnText}>Sign in</Text>
          </Pressable>
        </Glass>
      ) : (
        <>
          <Pressable
            onPress={() => go("profile")}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
          >
            <Glass style={styles.profileCard} overlayColor={GLASS_FILL_STRONG}>
              <View style={styles.profileRow}>
                {profile?.avatar_url ? (
                  <Image
                    source={{ uri: profile.avatar_url }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarLetter}>
                      {displayName.slice(0, 1).toUpperCase()}
                    </Text>
                  </View>
                )}
                <View style={styles.profileCopy}>
                  <Text style={styles.name}>{displayName}</Text>
                  {user.email ? (
                    <Text style={styles.email}>{user.email}</Text>
                  ) : null}
                  <Text style={styles.edit}>Edit profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={MUTED} />
              </View>
            </Glass>
          </Pressable>

          <View style={styles.tileGrid}>
            {TILES.map((tile) => (
              <Pressable
                key={tile.href}
                style={styles.tilePress}
                onPress={() => go(tile.href)}
                accessibilityRole="button"
                accessibilityLabel={tile.label}
              >
                <Glass style={styles.tile} overlayColor={GLASS_FILL_STRONG}>
                  <Ionicons name={tile.icon} size={20} color={NAVY} />
                  <Text style={styles.tileLabel}>{tile.label}</Text>
                </Glass>
              </Pressable>
            ))}
          </View>

          <Glass style={styles.listCard} overlayColor={GLASS_FILL_STRONG}>
            {ROWS.map((row, index) => (
              <Pressable
                key={row.href}
                style={[styles.row, index > 0 && styles.rowBorder]}
                onPress={() => go(row.href)}
                accessibilityRole="button"
                accessibilityLabel={row.label}
              >
                <Ionicons name={row.icon} size={20} color={NAVY} />
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={MUTED} />
              </Pressable>
            ))}
          </Glass>

          <Pressable
            style={styles.signOut}
            onPress={handleSignOut}
            accessibilityRole="button"
            accessibilityLabel="Sign out"
          >
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { padding: 16, maxWidth: 720, width: "100%", alignSelf: "center" },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  profileCard: {
    borderRadius: 16,
    padding: 14,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: NAVY_SOFT,
  },
  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: NAVY_SOFT,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: { color: NAVY, fontWeight: "800", fontSize: 20 },
  profileCopy: { flex: 1 },
  name: { fontSize: 17, fontWeight: "700", color: INK },
  email: { fontSize: 13, color: MUTED, marginTop: 2 },
  edit: { fontSize: 13, color: NAVY, fontWeight: "700", marginTop: 4 },
  signedOutTitle: { fontSize: 17, fontWeight: "700", color: INK },
  signedOutSub: { fontSize: 13, color: MUTED, marginTop: 6, marginBottom: 14 },
  primaryBtn: {
    backgroundColor: NAVY,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: "center",
    alignSelf: "flex-start",
    minWidth: 160,
  },
  primaryBtnText: { color: WHITE, fontWeight: "700" },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  tilePress: { flexGrow: 1, flexBasis: "46%", minWidth: "46%" },
  tile: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 8,
    minHeight: 84,
  },
  tileLabel: { fontSize: 14, fontWeight: "700", color: INK },
  listCard: {
    borderRadius: 16,
    marginTop: 12,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  rowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(23,0,173,0.08)",
  },
  rowLabel: { flex: 1, fontSize: 16, color: INK, fontWeight: "600" },
  signOut: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 12,
  },
  signOutText: { color: MUTED, fontWeight: "700", fontSize: 15 },
});
