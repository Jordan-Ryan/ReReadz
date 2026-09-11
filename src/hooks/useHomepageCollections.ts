import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HomeCollection {
  id: string;
  name: string;
  slug: string;
  book_count?: number;
  icon_name?: string | null;
}

export function useHomepageCollections() {
  const [collections, setCollections] = useState<HomeCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.rpc("get_homepage_collections");
        if (error) throw error;
        const rows = ((data as HomeCollection[] | null) ?? [])
          .filter((row) => row?.id && row?.name)
          .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        if (!cancelled) setCollections(rows);
      } catch (rpcError) {
        console.warn(
          "useHomepageCollections: RPC failed, falling back to categories",
          rpcError
        );
        try {
          const { data, error } = await supabase
            .from("categories")
            .select("id, name, slug, icon_name")
            .eq("is_active", true)
            .order("name");
          if (error) throw error;
          if (!cancelled) {
            setCollections(
              (data ?? []).map((cat) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug ?? cat.id,
                icon_name: cat.icon_name,
              }))
            );
          }
        } catch (fallbackError) {
          console.error("useHomepageCollections: fallback failed", fallbackError);
          if (!cancelled) setCollections([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { collections, loading };
}
