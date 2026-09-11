import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Glass } from "@/components/Glass";
import type { HomeCollection } from "@/hooks/useHomepageCollections";
import {
  CATEGORY_SUB,
  CATEGORY_TITLE,
  GLASS_FILL_STRONG,
  INK,
  MUTED,
  NAVY,
} from "@/theme/brand";

interface CategoryGridProps {
  collections: HomeCollection[];
  loading: boolean;
  onSelect: (slug: string) => void;
  onSeeAll: () => void;
}

export function CategoryGrid({
  collections,
  loading,
  onSelect,
  onSeeAll,
}: CategoryGridProps) {
  const shown = collections.slice(0, 10);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{CATEGORY_TITLE}</Text>
      <Text style={styles.sub}>{CATEGORY_SUB}</Text>
      {loading ? (
        <ActivityIndicator color={NAVY} style={styles.loader} />
      ) : (
        <View style={styles.grid}>
          {shown.map((cat) => (
            <Pressable
              key={cat.id}
              style={styles.cell}
              onPress={() => onSelect(cat.slug || cat.id)}
              accessibilityRole="button"
              accessibilityLabel={
                cat.book_count != null
                  ? `${cat.name}, ${cat.book_count} books`
                  : cat.name
              }
            >
              <Glass style={styles.card} overlayColor={GLASS_FILL_STRONG}>
                <Text style={styles.cardName} numberOfLines={2}>
                  {cat.name}
                </Text>
                {cat.book_count != null ? (
                  <Text style={styles.cardCount}>
                    {cat.book_count} {cat.book_count === 1 ? "book" : "books"}
                  </Text>
                ) : null}
              </Glass>
            </Pressable>
          ))}
        </View>
      )}
      <Pressable
        onPress={onSeeAll}
        accessibilityRole="button"
        accessibilityLabel="All categories"
        style={styles.all}
      >
        <Text style={styles.allText}>Show all categories</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingTop: 20, paddingHorizontal: 16 },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.3,
  },
  sub: { marginTop: 4, fontSize: 13, color: MUTED, marginBottom: 12 },
  loader: { marginVertical: 16 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  cell: { flexGrow: 1, flexBasis: "46%", minWidth: "46%", maxWidth: "48%" },
  card: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 14,
    minHeight: 78,
    justifyContent: "space-between",
  },
  cardName: { fontSize: 14, fontWeight: "700", color: INK },
  cardCount: { marginTop: 6, fontSize: 12, color: MUTED, fontWeight: "600" },
  all: { paddingVertical: 12, alignItems: "flex-start" },
  allText: { color: NAVY, fontWeight: "700", fontSize: 13 },
});
