import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useListings } from "@/hooks/useListings";
import { BookCard } from "@/components/BookCard";
import type { BookCardData } from "@/components/BookCard";

export default function ListingsScreen() {
  const params = useLocalSearchParams<{ category?: string; q?: string }>();
  const [query, setQuery] = useState(params.q ?? "");
  const [searchInput, setSearchInput] = useState(params.q ?? "");
  const { items, loading, hasMore, loadMore, refresh, refreshing } = useListings({
    query: query || undefined,
    category: params.category || undefined,
  });

  const handleSearch = () => {
    setQuery(searchInput.trim());
  };

  const renderItem = ({ item }: { item: BookCardData }) => (
    <View style={styles.cardWrap}>
      <BookCard book={item} flex />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Pressable style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>Search</Text>
        </Pressable>
      </View>
      {loading && items.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No listings found.</Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        />
      )}
    </View>
  );
}

const CARD_WIDTH = 160;
const styles = StyleSheet.create({
  container: { flex: 1 },
  searchRow: {
    flexDirection: "row",
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  searchBtn: {
    backgroundColor: "#0ea5e9",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  searchBtnText: { color: "#fff", fontWeight: "600" },
  loader: { flex: 1, justifyContent: "center" },
  listContent: { padding: 12, paddingBottom: 32 },
  row: { gap: 12, marginBottom: 12 },
  cardWrap: { width: "50%", paddingHorizontal: 6 },
  empty: { padding: 32, alignItems: "center" },
  emptyText: { color: "#64748b" },
});
