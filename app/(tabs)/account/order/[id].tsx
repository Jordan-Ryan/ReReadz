import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";

interface OrderItemRow {
  id: string;
  listing_id: string;
  quantity: number;
  unit_price_minor: number;
  book_listings?: { title: string | null; author: string | null } | null;
}

interface OrderData {
  id: string;
  created_at: string;
  order_status: string;
  total_minor: number;
  subtotal_minor: number;
  shipping_minor: number;
  buyer_id: string;
  seller_id: string;
  order_items: OrderItemRow[];
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

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user?.id) return;
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select(
            "id, created_at, order_status, total_minor, subtotal_minor, shipping_minor, buyer_id, seller_id, order_items(id, listing_id, quantity, unit_price_minor, book_listings(title, author))"
          )
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          setOrder(null);
          return;
        }
        if (data.buyer_id !== user.id && data.seller_id !== user.id) {
          setOrder(null);
          return;
        }
        setOrder(data as unknown as OrderData);

        const { data: threads } = await supabase
          .from("message_threads")
          .select("id")
          .eq("buyer_id", data.buyer_id)
          .eq("seller_id", data.seller_id)
          .limit(1);
        if (threads?.[0]?.id) setThreadId(threads[0].id);
      } catch (e) {
        console.error(e);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user?.id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }
  if (!order) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Order not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const statusLabel = STATUS_LABELS[order.order_status] ?? order.order_status;
  const isBuyer = order.buyer_id === user?.id;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.status}>{statusLabel}</Text>
        <Text style={styles.date}>
          Ordered {new Date(order.created_at).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Items</Text>
        {(order.order_items || []).map((oi) => {
          const listing = oi.book_listings ?? (oi as any).book_listings;
          const title = listing?.title ?? "Book";
          const author = listing?.author ?? "";
          return (
            <View key={oi.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{title}</Text>
                {author ? (
                  <Text style={styles.itemAuthor}>{author}</Text>
                ) : null}
                <Text style={styles.itemQty}>
                  Qty {oi.quantity} × {formatPrice(oi.unit_price_minor)}
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                {formatPrice(oi.quantity * oi.unit_price_minor)}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        {order.subtotal_minor != null && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>
              {formatPrice(order.subtotal_minor)}
            </Text>
          </View>
        )}
        {order.shipping_minor != null && order.shipping_minor > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text style={styles.totalValue}>
              {formatPrice(order.shipping_minor)}
            </Text>
          </View>
        )}
        <View style={[styles.totalRow, styles.totalRowMain]}>
          <Text style={styles.totalLabelMain}>Total</Text>
          <Text style={styles.totalValueMain}>
            {formatPrice(order.total_minor)}
          </Text>
        </View>
      </View>

      {threadId && (
        <Pressable
          style={styles.messageBtn}
          onPress={() =>
            router.push(`/(tabs)/messages/${threadId}` as any)
          }
        >
          <Ionicons name="chatbubble-outline" size={20} color="#0ea5e9" />
          <Text style={styles.messageBtnText}>
            {isBuyer ? "Message seller" : "Message buyer"}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  subtitle: { color: "#64748b", marginBottom: 16 },
  backBtn: { padding: 12 },
  backBtnText: { color: "#0ea5e9", fontWeight: "600" },
  section: { marginBottom: 24 },
  label: { fontSize: 12, color: "#64748b", marginBottom: 4, textTransform: "uppercase" },
  status: { fontSize: 18, fontWeight: "600", color: "#0f172a" },
  date: { fontSize: 14, color: "#64748b", marginTop: 4 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: "500", color: "#0f172a" },
  itemAuthor: { fontSize: 13, color: "#64748b", marginTop: 2 },
  itemQty: { fontSize: 13, color: "#64748b", marginTop: 2 },
  itemTotal: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  totalRowMain: { marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#e2e8f0" },
  totalLabel: { fontSize: 14, color: "#64748b" },
  totalValue: { fontSize: 14, color: "#0f172a" },
  totalLabelMain: { fontSize: 16, fontWeight: "600", color: "#0f172a" },
  totalValueMain: { fontSize: 16, fontWeight: "700", color: "#0f172a" },
  messageBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0ea5e9",
    marginTop: 8,
  },
  messageBtnText: { color: "#0ea5e9", fontWeight: "600", fontSize: 16 },
});
