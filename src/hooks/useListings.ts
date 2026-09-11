import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BookCardData } from "@/components/BookCard";

const PAGE_SIZE = 20;

export type ListingSort = "newest" | "price_asc" | "price_desc";

export interface ListingFilters {
  query?: string;
  category?: string;
  categoryId?: string;
  condition?: string;
  format?: string;
  minPriceMinor?: number;
  maxPriceMinor?: number;
  sort?: ListingSort;
}

export function useListings(opts: ListingFilters = {}) {
  const [items, setItems] = useState<BookCardData[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sort = opts.sort ?? "newest";

  const fetchPage = useCallback(
    async (pageNum: number, append: boolean) => {
      try {
        setError(null);
        let q = supabase
          .from("book_listings")
          .select(
            "id, slug, title, author, price_minor, condition, created_at, book_images!left(url, position)",
            { count: "exact" }
          )
          .eq("active", true)
          .eq("status", "active")
          .is("deleted_at", null)
          .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1);

        if (sort === "price_asc") {
          q = q.order("price_minor", { ascending: true });
        } else if (sort === "price_desc") {
          q = q.order("price_minor", { ascending: false });
        } else {
          q = q.order("created_at", { ascending: false });
        }

        if (opts.query?.trim()) {
          const term = opts.query.trim().replace(/,/g, " ");
          q = q.or(`title.ilike.%${term}%,author.ilike.%${term}%`);
        }
        if (opts.condition) {
          q = q.eq("condition", opts.condition as never);
        }
        if (opts.format) {
          q = q.eq("format", opts.format as never);
        }
        if (typeof opts.minPriceMinor === "number") {
          q = q.gte("price_minor", opts.minPriceMinor);
        }
        if (typeof opts.maxPriceMinor === "number") {
          q = q.lte("price_minor", opts.maxPriceMinor);
        }
        if (opts.categoryId) {
          q = q.eq("category_id", opts.categoryId);
        }
        if (opts.category) {
          const { data: cat, error: catError } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", opts.category)
            .maybeSingle();
          if (catError) {
            console.error("Failed to resolve category slug", catError);
          }
          if (cat?.id) q = q.eq("category_id", cat.id);
        }

        const { data, error: queryError, count } = await q;
        if (queryError) throw queryError;
        if (typeof count === "number") setTotal(count);
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
        const message = e instanceof Error ? e.message : "Could not load listings";
        console.error("useListings failed", e);
        setError(message);
        if (!append) setItems([]);
        setHasMore(false);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [
      opts.query,
      opts.category,
      opts.categoryId,
      opts.condition,
      opts.format,
      opts.minPriceMinor,
      opts.maxPriceMinor,
      sort,
    ]
  );

  useEffect(() => {
    setLoading(true);
    setPage(0);
    fetchPage(0, false);
  }, [fetchPage]);

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

  return {
    items,
    total,
    loading,
    hasMore,
    loadMore,
    refresh,
    refreshing,
    error,
  };
}