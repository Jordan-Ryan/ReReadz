import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";

export default function CheckoutConfirmScreen() {
  const params = useLocalSearchParams<{ orderId?: string }>();
  const orderId = params.orderId as string | undefined;
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(!!orderId);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    const fetchOrder = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*, book_listings(title, author))")
        .eq("id", orderId)
        .maybeSingle();
      setOrder(data ?? null);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!orderId || !order) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Order not found</Text>
        <Pressable style={styles.btn} onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.btnText}>Home</Text>
        </Pressable>
      </View>
    );
  }

  const isPaid = order.order_status === "paid";
  const items = order.order_items ?? [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {isPaid ? (
        <>
          <Text style={styles.successTitle}>Thank you for your order!</Text>
          <Text style={styles.successSubtitle}>Order #{orderId.slice(0, 8)}</Text>
          <Text style={styles.total}>Total paid: {formatPrice(Number(order.total_minor ?? 0))}</Text>
          <Pressable
            style={[styles.btn, styles.btnPrimary]}
            onPress={() => router.replace("/checkout/success")}
          >
            <Text style={styles.btnText}>View order status</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.title}>Order confirmation</Text>
          <Text style={styles.orderId}>Order #{orderId.slice(0, 8)}</Text>
          {items.map((item: any) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemTitle}>{item.book_listings?.title ?? "Book"}</Text>
              <Text style={styles.itemAuthor}>{item.book_listings?.author}</Text>
              <Text style={styles.itemPrice}>{formatPrice(Number(item.unit_price_minor ?? 0))}</Text>
            </View>
          ))}
          <Text style={styles.total}>Total: {formatPrice(Number(order.total_minor ?? 0))}</Text>
          <Text style={styles.hint}>Payment is being processed. You can check status in My Orders.</Text>
          <Pressable
            style={[styles.btn, styles.btnPrimary]}
            onPress={() => router.replace("/(tabs)/account")}
          >
            <Text style={styles.btnText}>Go to Account</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "#64748b", marginBottom: 16 },
  successTitle: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  successSubtitle: { color: "#64748b", marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  orderId: { color: "#64748b", marginBottom: 16 },
  item: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
  itemTitle: { fontWeight: "600" },
  itemAuthor: { fontSize: 14, color: "#64748b" },
  itemPrice: { marginTop: 4, fontWeight: "600" },
  total: { fontSize: 18, fontWeight: "700", marginTop: 16, marginBottom: 8 },
  hint: { fontSize: 14, color: "#64748b", marginBottom: 24 },
  btn: { padding: 14, borderRadius: 8, alignItems: "center" },
  btnPrimary: { backgroundColor: "#0ea5e9" },
  btnText: { color: "#fff", fontWeight: "600" },
});
