import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";

interface OrderItem {
  listing_id: string;
  quantity: number;
  unit_price_minor: number;
  book_listings?: { id: string; title: string | null } | null;
}

interface Order {
  id: string;
  created_at: string;
  order_status: string;
  total_minor: number;
  seller_id: string;
  buyer_id: string;
  order_items: OrderItem[];
}

const STATUS_LABELS: Record<string, string> = {
  checkout_initiated: "Checkout",
  payment_pending: "Awaiting Payment",
  paid: "Confirmed",
  label_created: "Ready to Ship",
  preparing_shipment: "Preparing",
  dispatched: "Shipped",
  in_transit: "In Transit",
  delivered: "Delivered",
  completed: "Completed",
  disputed: "Disputed",
  cancelled_seller: "Cancelled",
  cancelled_admin: "Cancelled",
  payment_failed: "Failed",
};

export default function MyOrdersScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [bought, setBought] = useState<Order[]>([]);
  const [sold, setSold] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bought" | "sold">("bought");

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data: boughtData } = await supabase
        .from("orders")
        .select(
          "id, created_at, order_status, total_minor, seller_id, buyer_id, order_items(listing_id, quantity, unit_price_minor, book_listings(title))"
        )
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      const { data: soldData } = await supabase
        .from("orders")
        .select(
          "id, created_at, order_status, total_minor, seller_id, buyer_id, order_items(listing_id, quantity, unit_price_minor, book_listings(title))"
        )
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      setBought((boughtData as Order[]) || []);
      setSold((soldData as Order[]) || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to view orders.</Text>
      </View>
    );
  }

  const orders = tab === "bought" ? bought : sold;
  const label = tab === "bought" ? "Bought" : "Sold";

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, tab === "bought" && styles.tabActive]}
          onPress={() => setTab("bought")}
        >
          <Text style={[styles.tabText, tab === "bought" && styles.tabTextActive]}>
            Bought
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, tab === "sold" && styles.tabActive]}
          onPress={() => setTab("sold")}
        >
          <Text style={[styles.tabText, tab === "sold" && styles.tabTextActive]}>
            Sold
          </Text>
        </Pressable>
      </View>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0ea5e9" />
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="receipt-outline" size={48} color="#94a3b8" />
          <Text style={styles.emptyTitle}>No {label.toLowerCase()} orders</Text>
          <Text style={styles.subtitle}>
            {tab === "bought"
              ? "Orders you've placed will appear here."
              : "Orders you've sold will appear here."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const firstItem = item.order_items?.[0];
            const listing = firstItem?.book_listings ?? (firstItem as any)?.listing;
            const title = listing?.title ?? "Book";
            const statusLabel =
              STATUS_LABELS[item.order_status] ?? item.order_status;
            return (
              <Pressable
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: "order/[id]",
                    params: { id: item.id },
                  } as any)
                }
              >
                <View style={styles.cardRow}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {title}
                    {item.order_items && item.order_items.length > 1
                      ? ` +${item.order_items.length - 1} more`
                      : ""}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
                </View>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardDate}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                  <Text style={styles.cardStatus}>{statusLabel}</Text>
                  <Text style={styles.cardPrice}>
                    {formatPrice(item.total_minor)}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#0ea5e9",
  },
  tabText: { fontSize: 15, color: "#64748b", fontWeight: "500" },
  tabTextActive: { color: "#0ea5e9", fontWeight: "600" },
  list: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#0f172a", flex: 1 },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  cardDate: { fontSize: 13, color: "#64748b" },
  cardStatus: {
    fontSize: 13,
    color: "#0ea5e9",
    fontWeight: "500",
  },
  cardPrice: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyTitle: { fontSize: 18, fontWeight: "600", marginTop: 12 },
  subtitle: { fontSize: 14, color: "#64748b", marginTop: 8, textAlign: "center" },
});
