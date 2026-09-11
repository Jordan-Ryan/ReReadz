import React, { Suspense, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StripeAvailable } from "@/integrations/stripe/optionalStripe";
import { formatPrice } from "@/utils/format";

const STRIPE_ENABLED = !!(
  typeof process !== "undefined" &&
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentWithStripeLazy = React.lazy(
  () =>
    import("@/integrations/stripe/PaymentWithStripe").then((m) => ({
      default: m.PaymentWithStripe,
    }))
);

function PaymentFallback({
  orderId,
  totalMinor,
}: {
  orderId: string | undefined;
  totalMinor: number;
}) {
  const router = useRouter();
  const handleContinue = useCallback(() => {
    if (!orderId) return;
    router.replace({
      pathname: "/checkout/confirm",
      params: { orderId },
    } as any);
  }, [orderId, router]);

  if (!orderId) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Order not found</Text>
        <Pressable style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete payment</Text>
      <Text style={styles.amount}>{formatPrice(totalMinor)}</Text>
      <Text style={styles.hint}>
        {STRIPE_ENABLED
          ? "Card payment requires a development build. Continue to confirm without payment."
          : "Set EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY for card payments. For testing you can continue to confirm."}
      </Text>
      <Pressable style={[styles.btn, styles.btnPrimary]} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue to confirm</Text>
      </Pressable>
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>Back to checkout</Text>
      </Pressable>
    </View>
  );
}

function CheckoutPaymentScreen() {
  const params = useLocalSearchParams<{ orderId?: string; totalMinor?: string }>();
  const orderId = params.orderId as string | undefined;
  const totalMinor = params.totalMinor ? Number(params.totalMinor) : 0;

  if (!StripeAvailable || !STRIPE_ENABLED) {
    return <PaymentFallback orderId={orderId} totalMinor={totalMinor} />;
  }

  return (
    <Suspense
      fallback={
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Setting up payment…</Text>
        </View>
      }
    >
      <PaymentWithStripeLazy />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#64748b" },
  error: { color: "#64748b", marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  amount: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
  hint: { fontSize: 14, color: "#64748b", marginBottom: 24 },
  btn: { padding: 14, borderRadius: 8, alignItems: "center" },
  btnPrimary: { backgroundColor: "#0ea5e9" },
  btnText: { color: "#fff", fontWeight: "600" },
  backBtn: { marginTop: 16, alignItems: "center" },
  backBtnText: { color: "#0ea5e9", fontSize: 14 },
});

export default CheckoutPaymentScreen;
