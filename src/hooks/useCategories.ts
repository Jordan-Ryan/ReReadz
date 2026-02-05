import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  id: string;
  name: string;
  slug?: string | null;
  icon_name?: string | null;
  icon_color?: string | null;
  description?: string | null;
  book_count?: number;
}

export function useCategories(includeCounts = false) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        if (includeCounts) {
          const { data, error } = await supabase
            .from("categories")
            .select(
              `id, name, slug, icon_name, icon_color, description,
              book_listings!book_listings_category_id_fkey(id)`
            )
            .eq("is_active", true)
            .order("name");

          if (error) throw error;
          const categoriesWithCounts = (data || []).map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            icon_name: cat.icon_name,
            icon_color: cat.icon_color,
            description: cat.description,
            book_count: Array.isArray(cat.book_listings) ? cat.book_listings.length : 0,
          }));
          setCategories(categoriesWithCounts);
        } else {
          const { data, error } = await supabase
            .from("categories")
            .select("id, name, slug, icon_name, icon_color, description")
            .eq("is_active", true)
            .order("name");
          if (error) throw error;
          setCategories(data || []);
        }
      } catch (e) {
        console.error("Error fetching categories:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [includeCounts]);

  return { categories, loading };
}
