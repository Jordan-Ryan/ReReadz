import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePaymentSheet } from "@stripe/stripe-react-native";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import Toast from "react-native-toast-message";

export function PaymentWithStripe() {
  const params = useLocalSearchParams<{ orderId?: string; totalMinor?: string }>();
  const orderId = params.orderId as string | undefined;
  const totalMinor = params.totalMinor ? Number(params.totalMinor) : 0;
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();
  const [loading, setLoading] = useState(!!orderId);
  const [paying, setPaying] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data, error: err } = await supabase.functions.invoke(
          "create-payment-intent",
          { body: { orderId } }
        );
        if (err) throw err;
        if ((data as { clientSecret?: string })?.clientSecret) {
          setClientSecret((data as { clientSecret: string }).clientSecret);
        } else {
          throw new Error("No payment secret returned");
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load payment");
        Toast.show({ type: "error", text1: "Payment setup failed" });
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  const handlePayWithSheet = useCallback(async () => {
    if (!orderId || !clientSecret) return;
    setPaying(true);
    try {
      const { error: initErr } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "ReReadz",
      });
      if (initErr) {
        Toast.show({
          type: "error",
          text1: "Payment setup failed",
          text2: initErr.message,
        });
        setPaying(false);
        return;
      }
      const { error: presentErr } = await presentPaymentSheet();
      if (presentErr) {
        if (presentErr.code === "Canceled") {
          setPaying(false);
          return;
        }
        Toast.show({
          type: "error",
          text1: "Payment failed",
          text2: presentErr.message,
        });
        setPaying(false);
        return;
      }
      router.replace({
        pathname: "/checkout/confirm",
        params: { orderId },
      } as any);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Payment failed",
        text2: e instanceof Error ? e.message : "Please try again.",
      });
    } finally {
      setPaying(false);
    }
  }, [orderId, clientSecret, initPaymentSheet, presentPaymentSheet, router]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Setting up payment…</Text>
      </View>
    );
  }
  if (error || !orderId) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error ?? "Order not found"}</Text>
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
      <Pressable
        style={[styles.btn, styles.btnPrimary, paying && styles.disabled]}
        onPress={handlePayWithSheet}
        disabled={paying}
      >
        {paying ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Pay with card</Text>
        )}
      </Pressable>
      <Text style={styles.hint}>
        Secure payment powered by Stripe. You can add or save cards in the sheet.
      </Text>
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>Back to checkout</Text>
      </Pressable>
    </View>
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
  disabled: { opacity: 0.7 },
  backBtn: { marginTop: 16, alignItems: "center" },
  backBtnText: { color: "#0ea5e9", fontSize: 14 },
});
