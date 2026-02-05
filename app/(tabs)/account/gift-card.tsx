import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import Toast from "react-native-toast-message";

export default function GiftCardRedeemScreen() {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; balance_added_minor?: number } | null>(null);

  const handleRedeem = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      Toast.show({ type: "error", text1: "Enter a gift card code" });
      return;
    }
    if (!user?.id) {
      Toast.show({ type: "info", text1: "Sign in to redeem a gift card" });
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      const { data, error } = await supabase.rpc("redeem_gift_card", {
        p_code: trimmed,
        p_user_id: user.id,
      });
      if (error) throw error;
      const payload = data as { success?: boolean; message?: string; balance_added_minor?: number; error?: string };
      if (payload?.error) throw new Error(payload.error);
      setResult({
        success: payload?.success ?? true,
        message: payload?.message ?? "Gift card redeemed",
        balance_added_minor: payload?.balance_added_minor,
      });
      setCode("");
      Toast.show({
        type: "success",
        text1: payload?.message ?? "Gift card redeemed",
        text2: payload?.balance_added_minor != null ? `£${(payload.balance_added_minor / 100).toFixed(2)} added to your wallet` : undefined,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Redeem failed";
      setResult({ success: false, message: msg });
      Toast.show({ type: "error", text1: "Redeem failed", text2: msg });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to redeem a gift card.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Redeem gift card</Text>
        <Text style={styles.hint}>Enter the code from your ReReadz gift card.</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="e.g. REREADZ-XXXX-XXXX"
          placeholderTextColor="#94a3b8"
          autoCapitalize="characters"
          autoCorrect={false}
          editable={!submitting}
          accessibilityLabel="Gift card code"
        />
        <Pressable
          style={[styles.btn, styles.btnPrimary, submitting && styles.disabled]}
          onPress={handleRedeem}
          disabled={submitting}
          accessibilityRole="button"
          accessibilityLabel="Redeem gift card"
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.btnText}>Redeem</Text>
          )}
        </Pressable>
        {result && (
          <View style={[styles.result, result.success ? styles.resultSuccess : styles.resultError]}>
            <Text style={styles.resultText}>{result.message}</Text>
            {result.balance_added_minor != null && result.success && (
              <Text style={styles.resultAmount}>{formatPrice(result.balance_added_minor)} added to wallet</Text>
            )}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  subtitle: { color: "#64748b" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#e2e8f0" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  hint: { fontSize: 14, color: "#64748b", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  btn: { padding: 14, borderRadius: 8, alignItems: "center" },
  btnPrimary: { backgroundColor: "#0ea5e9" },
  btnText: { color: "#fff", fontWeight: "600" },
  disabled: { opacity: 0.7 },
  result: { marginTop: 16, padding: 12, borderRadius: 8 },
  resultSuccess: { backgroundColor: "#f0fdf4" },
  resultError: { backgroundColor: "#fef2f2" },
  resultText: { fontSize: 14, color: "#0f172a" },
  resultAmount: { fontSize: 13, color: "#166534", marginTop: 4 },
});
