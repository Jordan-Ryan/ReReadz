import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BookCardData } from "@/components/BookCard";

export function useStaffPicks() {
  const [books, setBooks] = useState<BookCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("staff-picks");
        if (cancelled) return;
        if (error) throw error;
        if (data?.books?.length) {
          setBooks(
            data.books.map((book: any) => ({
              id: book.id,
              slug: book.slug ?? book.id,
              title: book.title,
              author: book.author,
              price_minor: book.price_minor,
              image_url: book.image_url,
              condition: book.condition,
              created_at: book.created_at,
            }))
          );
        } else {
          setBooks([]);
        }
      } catch (e) {
        if (!cancelled) setBooks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { books, loading };
}
