import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BookCardData } from "@/components/BookCard";

const PAGE_SIZE = 20;

export function useListings(opts: {
  query?: string;
  category?: string;
  categoryId?: string;
} = {}) {
  const [items, setItems] = useState<BookCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPage = useCallback(
    async (pageNum: number, append: boolean) => {
      try {
        let q = supabase
          .from("book_listings")
          .select(
            "id, slug, title, author, price_minor, condition, created_at, book_images!left(url, position)"
          )
          .eq("active", true)
          .eq("status", "active")
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
          .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1);

        if (opts.query?.trim()) {
          q = q.or(
            `title.ilike.%${opts.query.trim()}%,author.ilike.%${opts.query.trim()}%`
          );
        }
        if (opts.categoryId) {
          q = q.eq("category_id", opts.categoryId);
        }
        if (opts.category) {
          const { data: cat } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", opts.category)
            .maybeSingle();
          if (cat?.id) q = q.eq("category_id", cat.id);
        }

        const { data, error } = await q;
        if (error) throw error;
        const list = (data || []).map((row: any) => {
          const firstImg =
            row.book_images?.find((i: any) => i.position === 0) ||
            row.book_images?.[0];
          return {
            id: row.id,
            slug: row.slug ?? row.id,
            title: row.title,
            author: row.author,
            price_minor: row.price_minor,
            image_url: firstImg?.url ?? null,
            condition: row.condition,
            created_at: row.created_at,
          };
        });
        if (append) setItems((prev) => (pageNum === 0 ? list : [...prev, ...list]));
        else setItems(list);
        setHasMore(list.length === PAGE_SIZE);
      } catch (e) {
        if (!append) setItems([]);
        setHasMore(false);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [opts.query, opts.category, opts.categoryId]
  );

  useEffect(() => {
    setLoading(true);
    setPage(0);
    fetchPage(0, false);
  }, [opts.query, opts.category, opts.categoryId]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next, true);
  }, [page, loading, hasMore, fetchPage]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setPage(0);
    fetchPage(0, false);
  }, [fetchPage]);

  return { items, loading, hasMore, loadMore, refresh, refreshing };
}
