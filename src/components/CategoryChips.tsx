import { ScrollView, Pressable, Text, StyleSheet } from "react-native";
import type { Category } from "@/hooks/useCategories";
import { NAVY, NAVY_SOFT, INK, LINE, WHITE } from "@/theme/brand";

const HOME_PRIORITY = [
  "fiction",
  "crime",
  "thriller",
  "crime-thriller",
  "romance",
  "children",
  "childrens",
  "children-s-books",
  "childrens-books",
];

interface CategoryChipsProps {
  categories: Category[];
  selectedSlug?: string | null;
  onSelect: (slug: string | null) => void;
  includeAll?: boolean;
}

export function pickHomeChips(categories: Category[], limit = 8): Category[] {
  const ranked = [...categories].sort((a, b) => {
    const ai = HOME_PRIORITY.findIndex((key) =>
      (a.slug ?? a.name).toLowerCase().includes(key)
    );
    const bi = HOME_PRIORITY.findIndex((key) =>
      (b.slug ?? b.name).toLowerCase().includes(key)
    );
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  return ranked.slice(0, limit);
}

export function CategoryChips({
  categories,
  selectedSlug,
  onSelect,
  includeAll = true,
}: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {includeAll && (
        <Pressable
          style={[styles.chip, !selectedSlug && styles.chipOn]}
          onPress={() => onSelect(null)}
          accessibilityRole="button"
          accessibilityState={{ selected: !selectedSlug }}
          accessibilityLabel="All categories"
        >
          <Text style={[styles.text, !selectedSlug && styles.textOn]}>All</Text>
        </Pressable>
      )}
      {categories.map((cat) => {
        const slug = cat.slug ?? cat.id;
        const on = selectedSlug === slug;
        return (
          <Pressable
            key={cat.id}
            style={[styles.chip, on && styles.chipOn]}
            onPress={() => onSelect(on ? null : slug)}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={cat.name}
          >
            <Text style={[styles.text, on && styles.textOn]}>{cat.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
    alignItems: "center",
  },
  chip: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: LINE,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  chipOn: {
    backgroundColor: NAVY_SOFT,
    borderColor: NAVY,
  },
  text: { fontSize: 13, color: INK, fontWeight: "500" },
  textOn: { color: NAVY, fontWeight: "700" },
});