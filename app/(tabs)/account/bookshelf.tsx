import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Shelf {
  id: string;
  name: string;
  shelf_type: string;
  items_count?: number;
}

interface BookImageRow {
  url: string;
  is_primary: boolean;
}

interface ShelfItemRow {
  id: string;
  listing_id: string;
  book_listings?: {
    title: string | null;
    author: string | null;
    slug: string | null;
    primary_image_url?: string | null;
    book_images?: BookImageRow[] | null;
  } | null;
}

export default function BookshelfScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [activeShelfId, setActiveShelfId] = useState<string | null>(null);
  const [items, setItems] = useState<ShelfItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);

  const loadShelves = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data, error } = await supabase
        .from("bookshelves")
        .select("id, name, shelf_type")
        .eq("user_id", user.id)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      const list = (data || []) as Shelf[];
      setShelves(list);
      if (list.length > 0 && !activeShelfId) setActiveShelfId(list[0].id);
    } catch (e) {
      console.error(e);
      setShelves([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const loadItems = useCallback(async (shelfId: string) => {
    setItemsLoading(true);
    try {
      const { data, error } = await supabase
        .from("shelf_items")
        .select("id, listing_id, book_listings(title, author, slug, primary_image_url, book_images(url, is_primary))")
        .eq("shelf_id", shelfId)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      setItems((data as ShelfItemRow[]) || []);
    } catch (e) {
      setItems([]);
    } finally {
      setItemsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShelves();
  }, [loadShelves]);

  useEffect(() => {
    if (activeShelfId) loadItems(activeShelfId);
    else setItems([]);
  }, [activeShelfId, loadItems]);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to view your bookshelf.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (shelves.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No shelves yet</Text>
        <Text style={styles.subtitle}>
          Save books from listings to organise your reading.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {shelves.map((s) => (
          <Pressable
            key={s.id}
            style={[styles.tab, activeShelfId === s.id && styles.tabActive]}
            onPress={() => setActiveShelfId(s.id)}
          >
            <Text style={[styles.tabText, activeShelfId === s.id && styles.tabTextActive]}>
              {s.name}
            </Text>
          </Pressable>
        ))}
      </View>
      {itemsLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0ea5e9" />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.subtitle}>No books in this shelf.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const listing = item.book_listings ?? (item as any).book_listings;
            const title = listing?.title ?? "Book";
            const slug = listing?.slug ?? item.listing_id;
            const images = listing?.book_images;
            const imageUrl =
              listing?.primary_image_url ??
              (Array.isArray(images) && images.length > 0
                ? (images.find((img: BookImageRow) => img.is_primary) ?? images[0])?.url
                : null);
            return (
              <Pressable
                style={styles.row}
                onPress={() => slug && router.push(`/listing/${slug}` as any)}
              >
                {imageUrl ? (
                  <Image source={{ uri: imageUrl }} style={styles.thumb} />
                ) : (
                  <View style={[styles.thumb, styles.thumbPlaceholder]}>
                    <Text style={styles.thumbText}>?</Text>
                  </View>
                )}
                <View style={styles.rowBody}>
                  <Text style={styles.rowTitle} numberOfLines={2}>{title}</Text>
                  {listing?.author ? (
                    <Text style={styles.rowAuthor} numberOfLines={1}>{listing.author}</Text>
                  ) : null}
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  subtitle: { color: "#64748b", marginTop: 8 },
  emptyTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  tabs: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 16, paddingBottom: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: "#f1f5f9" },
  tabActive: { backgroundColor: "#0ea5e9" },
  tabText: { fontSize: 14, color: "#64748b", fontWeight: "500" },
  tabTextActive: { color: "#fff" },
  list: { padding: 16, paddingBottom: 32 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  thumb: { width: 48, height: 64, borderRadius: 4, backgroundColor: "#f1f5f9" },
  thumbPlaceholder: { justifyContent: "center", alignItems: "center" },
  thumbText: { fontSize: 14, color: "#94a3b8" },
  rowBody: { flex: 1, marginLeft: 12 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  rowAuthor: { fontSize: 13, color: "#64748b", marginTop: 2 },
});
