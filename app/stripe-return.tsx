import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import Toast from "react-native-toast-message";

export default function StripeReturnScreen() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("stripe-connect-complete");
        if (error) throw error;
        if ((data as any)?.complete) {
          setSuccess(true);
          Toast.show({ type: "success", text1: "Stripe account connected!" });
          setTimeout(() => router.replace("/(tabs)"), 2000);
        } else {
          setSuccess(false);
          Toast.show({ type: "error", text1: "Stripe onboarding incomplete" });
        }
      } catch (e) {
        setSuccess(false);
        Toast.show({ type: "error", text1: "Failed to verify Stripe connection" });
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Verifying your Stripe account…</Text>
      </View>
    );
  }
  if (success) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>All set!</Text>
        <Text style={styles.subtitle}>Stripe connected. Redirecting…</Text>
      </View>
    );
  }
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Setup incomplete</Text>
      <Text style={styles.subtitle}>You can complete Stripe later from Account.</Text>
      <Pressable style={styles.btn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.btnText}>Continue to ReReadz</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  loadingText: { marginTop: 12, color: "#64748b" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#64748b", marginBottom: 24, textAlign: "center" },
  btn: { backgroundColor: "#0ea5e9", padding: 14, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "600" },
});
