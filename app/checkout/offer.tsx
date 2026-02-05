import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import Toast from "react-native-toast-message";

export default function CheckoutFromOfferScreen() {
  const params = useLocalSearchParams<{ offerId?: string }>();
  const offerId = params.offerId as string | undefined;
  const router = useRouter();
  const [loading, setLoading] = useState(!!offerId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!offerId) {
      setError("No offer specified");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data, error: err } = await supabase.functions.invoke(
          "checkout-from-offer",
          { body: { offerId } }
        );
        if (err) throw err;
        const orderId = (data as { order_id?: string })?.order_id;
        if (!orderId) throw new Error((data as { error?: string })?.error ?? "No order created");
        const totalMinor = (data as { total_minor?: number })?.total_minor ?? 0;
        router.replace({
          pathname: "/checkout",
          params: { orderId, totalMinor: String(totalMinor) },
        } as any);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to start checkout";
        setError(msg);
        Toast.show({ type: "error", text1: "Checkout failed", text2: msg });
      } finally {
        setLoading(false);
      }
    })();
  }, [offerId, router]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Setting up checkout…</Text>
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Checkout error</Text>
      <Text style={styles.subtitle}>{error ?? "Something went wrong."}</Text>
      <Pressable style={styles.btn} onPress={() => router.replace("/(tabs)/messages")}>
        <Text style={styles.btnText}>Return to Messages</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  loadingText: { marginTop: 12, color: "#64748b" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8, color: "#0f172a" },
  subtitle: { color: "#64748b", marginBottom: 24, textAlign: "center" },
  btn: { backgroundColor: "#0ea5e9", padding: 14, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "600" },
});
