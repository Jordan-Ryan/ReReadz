import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useLiveMarketplace() {
  const [books, setBooks] = useState<number | null>(null);
  const [readers, setReaders] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [listings, profiles] = await Promise.all([
          supabase
            .from("book_listings")
            .select("id", { count: "exact", head: true })
            .eq("active", true)
            .eq("status", "active")
            .is("deleted_at", null),
          supabase.from("profiles").select("id", { count: "exact", head: true }),
        ]);
        if (cancelled) return;
        if (listings.error) throw listings.error;
        if (profiles.error) {
          console.warn("useLiveMarketplace: readers count failed", profiles.error);
        }
        setBooks(typeof listings.count === "number" ? listings.count : null);
        setReaders(typeof profiles.count === "number" ? profiles.count : null);
      } catch (error) {
        console.error("useLiveMarketplace failed", error);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { books, readers };
}
