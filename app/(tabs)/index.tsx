import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useRecentlyAdded } from "@/hooks/useRecentlyAdded";
import { useStaffPicks } from "@/hooks/useStaffPicks";
import { useCategories } from "@/hooks/useCategories";
import { BookCarousel } from "@/components/BookCarousel";

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { books: recentlyAdded, loading: loadingRecent } = useRecentlyAdded();
  const { books: staffPicks, loading: loadingStaff } = useStaffPicks();
  const { categories, loading: loadingCategories } = useCategories();
  const firstName = user?.email?.split("@")[0] ?? "there";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          {user ? `Welcome back, ${firstName}!` : "Find your next book"}
        </Text>
        <Text style={styles.heroSubtitle}>
          Buy and sell pre-loved books. Sustainable reading community.
        </Text>
        <View style={styles.heroActions}>
          <Pressable
            style={styles.ctaPrimary}
            onPress={() => router.push("/(tabs)/sell")}
          >
            <Text style={styles.ctaPrimaryText}>Sell books</Text>
          </Pressable>
          <Pressable
            style={styles.ctaSecondary}
            onPress={() => router.push("/(tabs)/listings")}
          >
            <Text style={styles.ctaSecondaryText}>Browse</Text>
          </Pressable>
        </View>
      </View>

      <BookCarousel
        title="Just listed"
        books={recentlyAdded}
        isLoading={loadingRecent}
        emptyMessage="No new books yet — check back soon!"
      />
      <BookCarousel
        title="Staff picks"
        books={staffPicks}
        isLoading={loadingStaff}
        emptyMessage="No staff picks yet."
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        {loadingCategories ? (
          <Text style={styles.placeholderText}>Loading…</Text>
        ) : (
          <View style={styles.categories}>
            {categories.slice(0, 8).map((cat) => (
              <Pressable
                key={cat.id}
                style={styles.categoryChip}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/listings",
                    params: { category: cat.slug ?? cat.id },
                  } as any)
                }
              >
                <Text style={styles.categoryChipText}>{cat.name}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  hero: { marginBottom: 24 },
  heroTitle: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: "#64748b", marginBottom: 16 },
  heroActions: { flexDirection: "row", gap: 12 },
  ctaPrimary: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  ctaPrimaryText: { color: "#fff", fontWeight: "600" },
  ctaSecondary: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  ctaSecondaryText: { color: "#0ea5e9", fontWeight: "600" },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  placeholderText: { color: "#64748b" },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  categoryChip: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  categoryChipText: { fontSize: 14 },
});
