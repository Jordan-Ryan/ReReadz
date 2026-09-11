import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useListings } from "@/hooks/useListings";
import { useStaffPicks } from "@/hooks/useStaffPicks";
import { useCategories } from "@/hooks/useCategories";
import { BookFeed } from "@/components/BookFeed";
import type { BookCardData } from "@/components/BookCard";
import { CategoryChips, pickHomeChips } from "@/components/CategoryChips";
import { TrustStrip } from "@/components/TrustStrip";
import { INK, MUTED, WHITE } from "@/theme/brand";

const STRIP_AFTER = 4;

type HomeRow =
  | { kind: "books"; key: string; books: BookCardData[] }
  | { kind: "strip"; key: string }
  | { kind: "staff"; key: string; books: BookCardData[] };

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { items, loading, hasMore, loadMore, refresh, refreshing, error } =
    useListings({ sort: "newest" });
  const { books: staffPicks, loading: loadingStaff } = useStaffPicks();
  const { categories, loading: loadingCategories } = useCategories();
  const chips = useMemo(() => pickHomeChips(categories), [categories]);
  const firstName = user?.email?.split("@")[0];

  const rows = useMemo<HomeRow[]>(() => {
    const next: HomeRow[] = [];
    const first = items.slice(0, STRIP_AFTER);
    const rest = items.slice(STRIP_AFTER);
    if (first.length > 0) {
      next.push({ kind: "books", key: "just-listed-top", books: first });
    }
    if (items.length > 0) {
      next.push({ kind: "strip", key: "trust" });
    }
    if (staffPicks.length > 0) {
      next.push({ kind: "staff", key: "staff", books: staffPicks });
    }
    if (rest.length > 0) {
      next.push({ kind: "books", key: "just-listed-more", books: rest });
    }
    return next;
  }, [items, staffPicks]);

  const renderRow = ({ item }: { item: HomeRow }) => {
    if (item.kind === "strip") return <TrustStrip />;
    if (item.kind === "staff") {
      return (
        <View style={styles.staffBlock}>
          <Text style={styles.sectionTitle}>Staff picks</Text>
          <BookFeed books={item.books} />
        </View>
      );
    }
    return <BookFeed books={item.books} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(row) => row.key}
        renderItem={renderRow}
        onEndReached={() => {
          if (hasMore) loadMore();
        }}
        onEndReachedThreshold={0.4}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            {user && firstName ? (
              <Text style={styles.welcome}>Welcome back, {firstName}</Text>
            ) : null}
            {!loadingCategories && chips.length > 0 && (
              <CategoryChips
                categories={chips}
                onSelect={(slug) => {
                  if (!slug) return;
                  router.push({
                    pathname: "/(tabs)/listings",
                    params: { category: slug },
                  } as any);
                }}
              />
            )}
            <Text style={styles.sectionTitle}>Just listed</Text>
          </View>
        }
        ListEmptyComponent={
          loading || loadingStaff ? (
            <View style={styles.loader}>
              <ActivityIndicator color="#1700AD" />
            </View>
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                {error ?? "No books yet — check back soon."}
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListFooterComponent={
          loading && items.length > 0 ? (
            <ActivityIndicator style={styles.footer} color="#1700AD" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { paddingBottom: 32 },
  welcome: {
    fontSize: 14,
    color: MUTED,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: INK,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  staffBlock: { marginTop: 4 },
  loader: { padding: 32, alignItems: "center" },
  empty: { padding: 32, alignItems: "center" },
  emptyText: { color: MUTED, textAlign: "center" },
  footer: { marginVertical: 16 },
});