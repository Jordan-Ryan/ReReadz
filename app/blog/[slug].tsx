import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BlogContent } from "@/components/BlogContent";

interface Article {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  featured_image_url: string | null;
  published_at: string | null;
  read_time: number;
  category: string;
}

export default function BlogArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("blog_articles")
          .select("title, content, excerpt, author, featured_image_url, published_at, read_time, category")
          .eq("slug", slug)
          .eq("status", "published")
          .maybeSingle();
        if (err) throw err;
        setArticle(data as Article | null);
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : "Article not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <LoadingScreen message="Loading article…" />;
  if (error || !article) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? "Article not found"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {article.featured_image_url ? (
        <Image source={{ uri: article.featured_image_url }} style={styles.image} />
      ) : null}
      <Text style={styles.category}>{article.category}</Text>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.meta}>
        {article.author}
        {article.published_at
          ? ` · ${new Date(article.published_at).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}`
          : ""}
        {article.read_time ? ` · ${article.read_time} min read` : ""}
      </Text>
      <View style={styles.bodyWrap}>
        <BlogContent content={article.content} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  errorText: { color: "#64748b", textAlign: "center" },
  image: { width: "100%", height: 200, backgroundColor: "#f1f5f9", marginBottom: 16, borderRadius: 8 },
  category: { fontSize: 12, color: "#0ea5e9", fontWeight: "600", marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "700", color: "#0f172a", marginBottom: 12 },
  meta: { fontSize: 14, color: "#64748b", marginBottom: 20 },
  bodyWrap: { marginTop: 8 },
});
