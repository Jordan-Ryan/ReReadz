import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useListings } from "@/hooks/useListings";
import { useCategories } from "@/hooks/useCategories";
import { BookCard, type BookCardData } from "@/components/BookCard";
import {
  FilterSheet,
  priceChipLabel,
  sortChipLabel,
  type AppliedFilters,
  type FilterDimension,
} from "@/components/FilterSheet";
import { formatCondition, formatBookFormat } from "@/utils/format";
import { INK, MUTED, LINE, WHITE, NAVY, NAVY_SOFT } from "@/theme/brand";

export default function ListingsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; q?: string }>();
  const query = typeof params.q === "string" ? params.q : "";
  const paramCategory =
    typeof params.category === "string" ? params.category : undefined;

  const [filters, setFilters] = useState<AppliedFilters>({
    sort: "newest",
    category: paramCategory,
  });
  const [sheet, setSheet] = useState<FilterDimension | null>(null);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: paramCategory }));
  }, [paramCategory]);

  const { categories } = useCategories();
  const { items, total, loading, hasMore, loadMore, refresh, refreshing, error } =
    useListings({
      query: query || undefined,
      category: filters.category,
      condition: filters.condition,
      format: filters.format,
      minPriceMinor: filters.minPriceMinor,
      maxPriceMinor: filters.maxPriceMinor,
      sort: filters.sort,
    });

  const categoryName = useMemo(() => {
    if (!filters.category) return null;
    return (
      categories.find((c) => (c.slug ?? c.id) === filters.category)?.name ??
      filters.category
    );
  }, [categories, filters.category]);

  const applyFilters = (next: AppliedFilters) => {
    setFilters(next);
    setSheet(null);
    if (next.category !== paramCategory) {
      router.setParams({
        q: query,
        category: next.category ?? "",
      });
    }
  };

  const countLabel =
    total == null
      ? loading
        ? "Loading…"
        : "0 books"
      : `${total} ${total === 1 ? "book" : "books"}`;

  const chips: { key: FilterDimension; label: string; active: boolean }[] = [
    {
      key: "price",
      label: priceChipLabel(filters),
      active: filters.minPriceMinor != null || filters.maxPriceMinor != null,
    },
    {
      key: "condition",
      label: filters.condition
        ? formatCondition(filters.condition)
        : "Condition",
      active: !!filters.condition,
    },
    {
      key: "format",
      label: filters.format ? formatBookFormat(filters.format) : "Format",
      active: !!filters.format,
    },
    {
      key: "category",
      label: categoryName ?? "Category",
      active: !!filters.category,
    },
  ];

  const renderItem = ({ item }: { item: BookCardData }) => (
    <View style={styles.cardWrap}>
      <BookCard book={item} flex />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.meta}>
        <View style={styles.metaLeft}>
          <Text style={styles.title}>{categoryName ?? "Browse"}</Text>
          <Text style={styles.count}>{countLabel}</Text>
        </View>
        <Pressable
          onPress={() => setSheet("sort")}
          accessibilityRole="button"
          accessibilityLabel="Sort results"
        >
          <Text style={styles.sort}>{sortChipLabel(filters.sort)}</Text>
        </Pressable>
      </View>

      <View style={styles.chipRow}>
        {chips.map((chip) => (
          <Pressable
            key={chip.key}
            style={[styles.chip, chip.active && styles.chipOn]}
            onPress={() => setSheet(chip.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: chip.active }}
          >
            <Text style={[styles.chipText, chip.active && styles.chipTextOn]}>
              {chip.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading && items.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={NAVY} />
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          onEndReached={() => {
            if (hasMore) loadMore();
          }}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                {error ??
                  (query
                    ? `No books match “${query}”.`
                    : "No books in this view.")}
              </Text>
              <Text style={styles.emptyHint}>Try another category.</Text>
              <View style={styles.emptyCats}>
                {categories.slice(0, 6).map((cat) => (
                  <Pressable
                    key={cat.id}
                    style={styles.emptyChip}
                    onPress={() =>
                      applyFilters({
                        ...filters,
                        category: cat.slug ?? cat.id,
                      })
                    }
                  >
                    <Text style={styles.emptyChipText}>{cat.name}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        />
      )}

      {sheet && (
        <FilterSheet
          visible
          dimension={sheet}
          value={filters}
          categories={categories}
          onClose={() => setSheet(null)}
          onApply={applyFilters}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  meta: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
  },
  metaLeft: { flex: 1, paddingRight: 12 },
  title: { fontSize: 20, fontWeight: "700", color: INK },
  count: { fontSize: 13, color: MUTED, marginTop: 2 },
  sort: { fontSize: 13, fontWeight: "600", color: NAVY },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: LINE,
  },
  chip: {
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: WHITE,
  },
  chipOn: { borderColor: NAVY, backgroundColor: NAVY_SOFT },
  chipText: { fontSize: 13, color: INK, fontWeight: "500" },
  chipTextOn: { color: NAVY, fontWeight: "700" },
  loader: { flex: 1, justifyContent: "center" },
  listContent: { padding: 8, paddingBottom: 32, flexGrow: 1 },
  row: { gap: 0 },
  cardWrap: { width: "50%", paddingHorizontal: 4, marginBottom: 16 },
  empty: { padding: 32, alignItems: "center" },
  emptyText: { color: INK, fontSize: 15, textAlign: "center", fontWeight: "600" },
  emptyHint: { color: MUTED, marginTop: 6, marginBottom: 16 },
  emptyCats: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" },
  emptyChip: {
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  emptyChipText: { fontSize: 13, color: NAVY, fontWeight: "600" },
});