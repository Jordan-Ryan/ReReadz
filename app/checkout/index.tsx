import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import Toast from "react-native-toast-message";

type Address = {
  full_name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  postcode?: string;
  country?: string;
};

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{ orderId?: string }>();
  const orderId = params.orderId as string | undefined;
  const router = useRouter();
  const [loading, setLoading] = useState(!!orderId);
  const [order, setOrder] = useState<any>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [contact, setContact] = useState<{ phone?: string; email?: string }>({});
  const [saving, setSaving] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("checkout", {
          body: { action: "get_data", orderId },
        });
        if (error) throw error;
        if (data?.order) setOrder(data.order);
        if (data?.address) setAddress(data.address);
        if (data?.contact) setContact(data.contact);
      } catch (e) {
        Toast.show({ type: "error", text1: "Failed to load checkout" });
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  const saveAddress = async () => {
    if (!orderId || !address) return;
    setSaving(true);
    try {
      const { error } = await supabase.functions.invoke("checkout", {
        body: { action: "update_address", orderId, address },
      });
      if (error) throw error;
      Toast.show({ type: "success", text1: "Address saved" });
    } catch (e) {
      Toast.show({ type: "error", text1: "Failed to save address" });
    } finally {
      setSaving(false);
    }
  };

  const handleContinueToPayment = () => {
    if (!orderId || !order) return;
    if (!agree) {
      Toast.show({ type: "error", text1: "Please agree to the terms" });
      return;
    }
    const subtotal = Number(order?.subtotal_minor ?? 0);
    const shipping = Number(order?.shipping_minor ?? 0);
    const protection = Number(order?.buyer_protection_fee_minor ?? 0);
    const total = subtotal + shipping + protection;
    router.push({
      pathname: "/checkout/payment",
      params: { orderId, totalMinor: String(total) },
    } as any);
  };

  if (loading || (!order && orderId)) {
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
        <Pressable style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const subtotal = Number(order.subtotal_minor ?? 0);
  const shipping = Number(order.shipping_minor ?? 0);
  const protection = Number(order.buyer_protection_fee_minor ?? 0);
  const total = subtotal + shipping + protection;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Order summary</Text>
        <Text style={styles.row}>Subtotal: {formatPrice(subtotal)}</Text>
        <Text style={styles.row}>Shipping: {formatPrice(shipping)}</Text>
        <Text style={styles.row}>Protection: {formatPrice(protection)}</Text>
        <Text style={[styles.row, styles.total]}>Total: {formatPrice(total)}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Delivery address</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={address?.full_name ?? ""}
          onChangeText={(t) => setAddress((a) => ({ ...a, full_name: t }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Address line 1"
          value={address?.line1 ?? ""}
          onChangeText={(t) => setAddress((a) => ({ ...a, line1: t }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Address line 2 (optional)"
          value={address?.line2 ?? ""}
          onChangeText={(t) => setAddress((a) => ({ ...a, line2: t }))}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={address?.city ?? ""}
          onChangeText={(t) => setAddress((a) => ({ ...a, city: t }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Postcode"
          value={address?.postcode ?? ""}
          onChangeText={(t) => setAddress((a) => ({ ...a, postcode: t }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={address?.country ?? "GB"}
          onChangeText={(t) => setAddress((a) => ({ ...a, country: t }))}
        />
        <Pressable style={[styles.btn, styles.btnSecondary]} onPress={saveAddress} disabled={saving}>
          <Text style={styles.btnTextSecondary}>{saving ? "Saving…" : "Save address"}</Text>
        </Pressable>
      </View>
      <View style={styles.block}>
        <Pressable
          style={styles.checkRow}
          onPress={() => setAgree((a) => !a)}
        >
          <View style={[styles.checkbox, agree && styles.checkboxChecked]} />
          <Text style={styles.checkLabel}>I agree to the terms and buyer protection</Text>
        </Pressable>
      </View>
      <Pressable
        style={[styles.btn, styles.btnPrimary]}
        onPress={handleContinueToPayment}
        disabled={!agree}
      >
        <Text style={styles.btnText}>Continue to payment</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "#64748b", marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  block: { marginBottom: 24 },
  blockTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  row: { fontSize: 14, marginBottom: 4 },
  total: { fontWeight: "700", marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  btn: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnPrimary: { backgroundColor: "#0ea5e9" },
  btnText: { color: "#fff", fontWeight: "600" },
  btnSecondary: { backgroundColor: "#f1f5f9", marginTop: 8 },
  btnTextSecondary: { color: "#0ea5e9", fontWeight: "600" },
  checkRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: { backgroundColor: "#0ea5e9", borderColor: "#0ea5e9" },
  checkLabel: { flex: 1, fontSize: 14 },
});
