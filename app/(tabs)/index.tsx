import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useListings } from "@/hooks/useListings";
import { useStaffPicks } from "@/hooks/useStaffPicks";
import { useCategories, type Category } from "@/hooks/useCategories";
import { BookFeed } from "@/components/BookFeed";
import { BookCarousel } from "@/components/BookCarousel";
import { HomeHero } from "@/components/HomeHero";
import { TrustPills } from "@/components/TrustPills";
import { SellShelfCta } from "@/components/SellShelfCta";
import { useTabClearance } from "@/hooks/useTabClearance";
import {
  CATEGORY_SUB,
  CATEGORY_TITLE,
  CTA_BROWSE,
  INK,
  LINE,
  MUTED,
  NAVY,
  NAVY_SOFT,
  SHELF_EMPTY,
  SHELF_EYEBROW,
  SHELF_TITLE,
  WHITE,
} from "@/theme/brand";

const QUICK_CHIPS: {
  label: string;
  categoryNeedles?: string[];
  condition?: string;
  maxPrice?: string;
}[] = [
  { label: "New releases" },
  { label: "Under £5", maxPrice: "500" },
  { label: "Like new", condition: "like_new" },
  { label: "Crime & thriller", categoryNeedles: ["crime", "thriller"] },
  { label: "Romance", categoryNeedles: ["romance"] },
];

function findCategorySlug(
  categories: Category[],
  needles: string[]
): string | undefined {
  const match = categories.find((cat) => {
    const hay = `${cat.slug ?? ""} ${cat.name}`.toLowerCase();
    return needles.some((needle) => hay.includes(needle));
  });
  return match?.slug ?? match?.id;
}

export default function HomeScreen() {
  const router = useRouter();
  const clearance = useTabClearance();
  const { items, loading, refresh, refreshing, error } = useListings({
    sort: "newest",
  });
  const { books: staffPicks, loading: loadingStaff } = useStaffPicks();
  const { categories, loading: loadingCategories } = useCategories();

  const openBrowse = (params: Record<string, string> = {}) => {
    router.push({
      pathname: "/(tabs)/listings",
      params,
    } as any);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: clearance }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <HomeHero />

      <View style={styles.chipRow}>
        {QUICK_CHIPS.map((chip) => (
          <Pressable
            key={chip.label}
            style={styles.chip}
            onPress={() => {
              const params: Record<string, string> = {};
              if (chip.condition) params.condition = chip.condition;
              if (chip.maxPrice) params.maxPrice = chip.maxPrice;
              if (chip.categoryNeedles) {
                const slug = findCategorySlug(categories, chip.categoryNeedles);
                if (slug) params.category = slug;
              }
              openBrowse(params);
            }}
            accessibilityRole="button"
            accessibilityLabel={chip.label}
          >
            <Text style={styles.chipText}>{chip.label}</Text>
          </Pressable>
        ))}
      </View>

      <TrustPills />

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{CATEGORY_TITLE}</Text>
        <Text style={styles.sectionSub}>{CATEGORY_SUB}</Text>
      </View>
      {loadingCategories ? (
        <ActivityIndicator color={NAVY} style={styles.inlineLoader} />
      ) : (
        <View style={styles.catWrap}>
          {categories.slice(0, 10).map((cat) => (
            <Pressable
              key={cat.id}
              style={styles.catChip}
              onPress={() => openBrowse({ category: cat.slug ?? cat.id })}
              accessibilityRole="button"
              accessibilityLabel={cat.name}
            >
              <Text style={styles.catText}>{cat.name}</Text>
            </Pressable>
          ))}
          {categories.length > 10 && (
            <Pressable
              style={styles.catChip}
              onPress={() => openBrowse()}
              accessibilityRole="button"
              accessibilityLabel="All categories"
            >
              <Text style={styles.catText}>All categories</Text>
            </Pressable>
          )}
        </View>
      )}

      <View style={styles.shelfHead}>
        <View style={styles.shelfCopy}>
          <Text style={styles.eyebrow}>{SHELF_EYEBROW}</Text>
          <Text style={styles.sectionTitle}>{SHELF_TITLE}</Text>
        </View>
        <Pressable
          onPress={() => openBrowse()}
          accessibilityRole="button"
          accessibilityLabel={CTA_BROWSE}
        >
          <Text style={styles.seeAll}>{CTA_BROWSE}</Text>
        </Pressable>
      </View>

      {loading && items.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator color={NAVY} />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{error ?? SHELF_EMPTY}</Text>
        </View>
      ) : (
        <BookFeed books={items} />
      )}

      {staffPicks.length > 0 || loadingStaff ? (
        <BookCarousel
          title="Staff picks"
          books={staffPicks}
          isLoading={loadingStaff}
        />
      ) : null}

      <SellShelfCta />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { flexGrow: 1 },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  chip: {
    borderWidth: 1,
    borderColor: LINE,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { fontSize: 13, color: INK, fontWeight: "600" },
  sectionHead: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.3,
  },
  sectionSub: {
    marginTop: 2,
    fontSize: 13,
    color: MUTED,
  },
  catWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  catChip: {
    backgroundColor: NAVY_SOFT,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  catText: { fontSize: 13, color: NAVY, fontWeight: "600" },
  shelfHead: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 12,
  },
  shelfCopy: { flex: 1 },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  seeAll: { fontSize: 13, fontWeight: "700", color: NAVY },
  inlineLoader: { marginVertical: 12 },
  loader: { padding: 32, alignItems: "center" },
  empty: { padding: 32, alignItems: "center" },
  emptyText: { color: MUTED, textAlign: "center" },
});
