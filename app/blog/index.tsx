import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/LoadingScreen";

interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image_url: string | null;
  published_at: string | null;
  read_time: number;
  category: string;
}

export default function BlogIndexScreen() {
  const router = useRouter();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("blog_articles")
        .select("id, slug, title, excerpt, featured_image_url, published_at, read_time, category")
        .eq("status", "published")
        .not("published_at", "is", null)
        .order("published_at", { ascending: false })
        .limit(50);
      if (err) throw err;
      setArticles((data as BlogArticle[]) ?? []);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load blog");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingScreen message="Loading blog…" />;
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No articles yet</Text>
        <Text style={styles.subtitle}>Check back soon for news and tips.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => router.push(`/blog/${item.slug}` as any)}
          accessibilityRole="link"
          accessibilityLabel={`Read article: ${item.title}`}
        >
          {item.featured_image_url ? (
            <Image source={{ uri: item.featured_image_url }} style={styles.thumb} />
          ) : (
            <View style={[styles.thumb, styles.thumbPlaceholder]}>
              <Ionicons name="book-outline" size={24} color="#94a3b8" />
            </View>
          )}
          <View style={styles.cardBody}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.excerpt} numberOfLines={2}>{item.excerpt}</Text>
            <Text style={styles.meta}>
              {item.published_at
                ? new Date(item.published_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
              {item.read_time ? ` · ${item.read_time} min read` : ""}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  errorText: { color: "#64748b", textAlign: "center" },
  emptyTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#64748b" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  thumb: { width: 100, height: 100, backgroundColor: "#f1f5f9" },
  thumbPlaceholder: { justifyContent: "center", alignItems: "center" },
  thumbText: { fontSize: 24 },
  cardBody: { flex: 1, padding: 12, justifyContent: "center" },
  category: { fontSize: 12, color: "#0ea5e9", fontWeight: "600", marginBottom: 4 },
  title: { fontSize: 16, fontWeight: "600", color: "#0f172a", marginBottom: 4 },
  excerpt: { fontSize: 13, color: "#64748b", marginBottom: 4 },
  meta: { fontSize: 11, color: "#94a3b8" },
});
