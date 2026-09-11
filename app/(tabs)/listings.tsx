import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTabClearance } from "@/hooks/useTabClearance";
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
import { INK, MUTED, LINE, WHITE, NAVY, NAVY_SOFT, FONT_SANS } from "@/theme/brand";
import {
  FEED_CELL_PAD,
  FEED_GRID_PAD,
  FEED_ROW_GAP,
  useFeedColumns,
} from "@/hooks/useFeedColumns";

/** Browse is search + filters + results only. Do not add Home merchandising here. */
export default function ListingsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    category?: string;
    q?: string;
    condition?: string;
    maxPrice?: string;
  }>();
  const query = typeof params.q === "string" ? params.q : "";
  const paramCategory =
    typeof params.category === "string" && params.category.length > 0
      ? params.category
      : undefined;
  const paramCondition =
    typeof params.condition === "string" && params.condition.length > 0
      ? params.condition
      : undefined;
  const paramMaxPrice =
    typeof params.maxPrice === "string" && params.maxPrice.length > 0
      ? Number(params.maxPrice)
      : undefined;
  const clearance = useTabClearance();

  const [filters, setFilters] = useState<AppliedFilters>({
    sort: "newest",
    category: paramCategory,
    condition: paramCondition,
    maxPriceMinor: Number.isFinite(paramMaxPrice) ? paramMaxPrice : undefined,
  });
  const [sheet, setSheet] = useState<FilterDimension | null>(null);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: paramCategory,
      condition: paramCondition,
      maxPriceMinor: Number.isFinite(paramMaxPrice) ? paramMaxPrice : undefined,
    }));
  }, [paramCategory, paramCondition, paramMaxPrice]);

  const columns = useFeedColumns();
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
      key: "sort",
      label: sortChipLabel(filters.sort),
      active: filters.sort !== "newest",
    },
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipRow}
      >
        {chips.map((chip) => (
          <Pressable
            key={chip.key}
            style={[styles.chip, chip.active && styles.chipOn]}
            onPress={() => setSheet(chip.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: chip.active }}
          >
            {chip.active ? (
              <Ionicons name="checkmark" size={15} color={NAVY} />
            ) : null}
            <Text style={[styles.chipText, chip.active && styles.chipTextOn]}>
              {chip.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.meta}>
        <View style={styles.metaLeft}>
          {categoryName ? <Text style={styles.title}>{categoryName}</Text> : null}
          <Text style={styles.count}>{countLabel}</Text>
        </View>
      </View>

      {loading && items.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={NAVY} />
        </View>
      ) : (
        <FlatList
          key={columns}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={columns}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: clearance },
          ]}
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
              <Text style={styles.emptyHint}>Try another search or filter.</Text>
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
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  metaLeft: { flex: 1, paddingRight: 12 },
  title: { fontFamily: FONT_SANS, fontSize: 16, fontWeight: "700", color: INK },
  count: { fontFamily: FONT_SANS, fontSize: 13, color: MUTED, marginTop: 2 },
  chipScroll: {
    flexGrow: 0,
  },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: 36,
    backgroundColor: WHITE,
  },
  chipOn: { borderColor: NAVY, backgroundColor: NAVY_SOFT },
  chipText: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    color: INK,
    fontWeight: "500",
  },
  chipTextOn: { color: NAVY, fontWeight: "700" },
  loader: { flex: 1, justifyContent: "center" },
  listContent: {
    paddingHorizontal: FEED_GRID_PAD,
    paddingTop: 4,
    paddingBottom: 32,
    flexGrow: 1,
  },
  row: { gap: 0 },
  cardWrap: { flex: 1, paddingHorizontal: FEED_CELL_PAD, marginBottom: FEED_ROW_GAP },
  empty: { padding: 32, alignItems: "center" },
  emptyText: { color: INK, fontSize: 15, textAlign: "center", fontWeight: "600" },
  emptyHint: { color: MUTED, marginTop: 6 },
});