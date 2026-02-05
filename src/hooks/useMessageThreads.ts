import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ThreadRow = Database["public"]["Tables"]["message_threads"]["Row"];
type ProfileRow = {
  id: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
};

export interface ThreadWithMeta extends ThreadRow {
  peerName: string;
  peerAvatar: string | null;
  unread: boolean;
  listingTitle?: string | null;
  listingImage?: string | null;
}

export function useMessageThreads(userId: string | null) {
  const [threads, setThreads] = useState<ThreadWithMeta[]>([]);
  const [listingsData, setListingsData] = useState<
    Record<string, { title: string; image_url: string | null; price_minor: number }>
  >({});
  const [lastMeta, setLastMeta] = useState<
    Record<string, { sender_id: string; read_at: string | null }>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchThreads = useCallback(async () => {
    if (!userId) {
      setThreads([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: th, error: thError } = await supabase
        .from("message_threads")
        .select("id, listing_id, book_club_id, buyer_id, seller_id, last_message_at, last_message_preview")
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
        .order("last_message_at", { ascending: false });

      if (thError) throw thError;
      const threadList = (th || []) as ThreadRow[];

      if (threadList.length === 0) {
        setThreads([]);
        setListingsData({});
        setLastMeta({});
        setLoading(false);
        return;
      }

      const peerIds = Array.from(
        new Set(
          threadList.map((t) => (t.buyer_id === userId ? t.seller_id : t.buyer_id))
        )
      );

      const { data: allProfs } = await supabase.rpc("get_public_profiles");
      const profs = (allProfs || []) as ProfileRow[];
      const peerMap: Record<string, { name: string; avatar: string | null }> = {};
      peerIds.forEach((id) => {
        const p = profs.find((x) => x.id === id);
        const name = p?.display_name || p?.username || "User";
        const avatar = p?.avatar_url ?? null;
        peerMap[id] = { name, avatar };
      });

      const threadIds = threadList.map((t) => t.id);
      const { data: msgs } = await supabase
        .from("messages")
        .select("id, thread_id, sender_id, read_at, created_at")
        .in("thread_id", threadIds)
        .order("created_at", { ascending: false });

      const lm: Record<string, { sender_id: string; read_at: string | null }> = {};
      (msgs || []).forEach((msg: { thread_id: string; sender_id: string; read_at: string | null }) => {
        if (!lm[msg.thread_id])
          lm[msg.thread_id] = { sender_id: msg.sender_id, read_at: msg.read_at || null };
      });
      setLastMeta(lm);

      const listingIds = threadList.map((t) => t.listing_id).filter(Boolean) as string[];
      let listingsMap: Record<string, { title: string; image_url: string | null; price_minor: number }> = {};
      if (listingIds.length > 0) {
        const { data: listings } = await supabase
          .from("book_listings")
          .select("id, title, price_minor")
          .in("id", listingIds);
        const { data: images } = await supabase
          .from("book_images")
          .select("listing_id, url")
          .in("listing_id", listingIds)
          .eq("is_primary", true);

        (listings || []).forEach((l: { id: string; title: string; price_minor: number }) => {
          const img = (images as { listing_id: string; url: string }[] | null)?.find(
            (i) => i.listing_id === l.id
          );
          listingsMap[l.id] = {
            title: l.title,
            price_minor: l.price_minor,
            image_url: img?.url ?? null,
          };
        });
        setListingsData(listingsMap);
      }

      const withMeta: ThreadWithMeta[] = threadList.map((t) => {
        const peerId = t.buyer_id === userId ? t.seller_id : t.buyer_id;
        const p = peerMap[peerId] || { name: "User", avatar: null };
        const unread = Boolean(
          lm[t.id] && !lm[t.id].read_at && lm[t.id].sender_id !== userId
        );
        const listing = t.listing_id ? listingsMap[t.listing_id] : null;
        return {
          ...t,
          peerName: p.name,
          peerAvatar: p.avatar,
          unread,
          listingTitle: listing?.title ?? null,
          listingImage: listing?.image_url ?? null,
        };
      });

      setThreads(withMeta);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setThreads([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  return { threads, listingsData, lastMeta, loading, error, refetch: fetchThreads };
}
