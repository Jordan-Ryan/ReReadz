import { useCallback, useEffect, useState } from "react";
import { storage } from "@/storage";

const KEY = "favourite_listing_ids";
type Listener = (ids: Set<string>) => void;

let cache: Set<string> | null = null;
let loadPromise: Promise<Set<string>> | null = null;
const listeners = new Set<Listener>();

async function loadIds(): Promise<Set<string>> {
  if (cache) return cache;
  if (loadPromise) return loadPromise;
  loadPromise = storage
    .getItem(KEY)
    .then((raw) => {
      try {
        const parsed = raw ? (JSON.parse(raw) as string[]) : [];
        cache = new Set(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.warn("useFavourites: could not parse saved hearts", error);
        cache = new Set();
      }
      return cache;
    })
    .catch((error) => {
      console.warn("useFavourites: could not load hearts", error);
      cache = new Set();
      return cache;
    });
  return loadPromise;
}

async function persist(next: Set<string>): Promise<void> {
  cache = next;
  listeners.forEach((listener) => listener(next));
  try {
    await storage.setItem(KEY, JSON.stringify([...next]));
  } catch (error) {
    console.warn("useFavourites: could not save hearts", error);
  }
}

export function useFavourites() {
  const [ids, setIds] = useState<Set<string>>(cache ?? new Set());

  useEffect(() => {
    const onChange: Listener = (next) => setIds(new Set(next));
    listeners.add(onChange);
    void loadIds().then((loaded) => setIds(new Set(loaded)));
    return () => {
      listeners.delete(onChange);
    };
  }, []);

  const isFavourite = useCallback((id: string) => ids.has(id), [ids]);

  const toggleFavourite = useCallback(async (id: string) => {
    try {
      const current = cache ?? (await loadIds());
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      await persist(next);
    } catch (error) {
      console.warn("useFavourites: toggle failed", { id, error });
    }
  }, []);

  return { isFavourite, toggleFavourite };
}
