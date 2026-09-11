import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useRecentlyAdded } from "@/hooks/useRecentlyAdded";
import { useStaffPicks } from "@/hooks/useStaffPicks";
import { useCategories } from "@/hooks/useCategories";
import { useLiveMarketplace } from "@/hooks/useLiveMarketplace";
import { HomeHero } from "@/components/HomeHero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BookShelf } from "@/components/BookShelf";
import { QrShipBand } from "@/components/QrShipBand";
import { TrustPoints } from "@/components/TrustPoints";
import { SellShelfCta } from "@/components/SellShelfCta";
import { useTabClearance } from "@/hooks/useTabClearance";
import { useHeaderClearance } from "@/hooks/useHeaderClearance";
import {
  CTA_BROWSE,
  HOT_OFF_PRESS,
  SHELF_EMPTY,
  SHELF_EYEBROW,
  SHELF_SUB,
  SHELF_TITLE,
  WHITE,
} from "@/theme/brand";

/** Home is marketing/discovery (hero, categories, shelves, QR, sell). Not a Browse feed. */
export default function HomeScreen() {
  const router = useRouter();
  const clearance = useTabClearance();
  const headerClearance = useHeaderClearance();
  const { books: justListed, loading: loadingListed } = useRecentlyAdded();
  const { books: staffPicks, loading: loadingStaff } = useStaffPicks();
  const { categories, loading: loadingCategories } = useCategories(true);
  const { books: liveBooks, readers: liveReaders } = useLiveMarketplace();

  const openBrowse = (params: Record<string, string> = {}) => {
    router.push({
      pathname: "/(tabs)/listings",
      params,
    } as any);
  };

  return (
    <ScrollView
      style={[styles.container, { marginTop: -headerClearance }]}
      contentContainerStyle={[styles.content, { paddingBottom: clearance }]}
    >
      <HomeHero
        collections={categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug ?? cat.id,
          book_count: cat.book_count,
        }))}
        covers={justListed}
        liveBooks={liveBooks}
        liveReaders={liveReaders}
        topInset={headerClearance}
        onBrowse={openBrowse}
      />

      <CategoryGrid
        collections={categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug ?? cat.id,
          book_count: cat.book_count,
        }))}
        loading={loadingCategories}
        onSelect={(slug) => openBrowse({ category: slug })}
        onSeeAll={() => openBrowse()}
      />

      <BookShelf
        eyebrow={HOT_OFF_PRESS}
        title={staffPicks.length > 0 ? "Staff picks" : HOT_OFF_PRESS}
        books={(staffPicks.length > 0 ? staffPicks : justListed).slice(0, 8)}
        isLoading={staffPicks.length > 0 ? loadingStaff : loadingListed}
        featured
        onSeeAll={() => openBrowse()}
        seeAllLabel={CTA_BROWSE}
      />

      <BookShelf
        eyebrow={SHELF_EYEBROW}
        title={SHELF_TITLE}
        subtitle={SHELF_SUB}
        books={justListed.slice(0, 8)}
        isLoading={loadingListed}
        emptyMessage={SHELF_EMPTY}
        onSeeAll={() => openBrowse()}
        seeAllLabel={CTA_BROWSE}
      />

      <QrShipBand />
      <TrustPoints />
      <SellShelfCta />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { flexGrow: 1 },
});
