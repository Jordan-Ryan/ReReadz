import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useTabClearance } from "@/hooks/useTabClearance";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Toast from "react-native-toast-message";
import { INK, MUTED, NAVY, SELLERS_KEEP, WHITE } from "@/theme/brand";

export default function SellScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const clearance = useTabClearance();
  const [creating, setCreating] = useState(false);

  const handleStartListing = async () => {
    if (!session) {
      router.replace("/(auth)/login");
      return;
    }
    setCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke("listings", {
        body: { action: "create_draft" },
      });
      if (error) throw error;
      const id = (data as any)?.id;
      if (!id) throw new Error("No draft ID");
      router.push({ pathname: "/sell/[id]", params: { id } } as any);
    } catch (e: unknown) {
      console.error("Sell: could not start listing", e);
      Toast.show({
        type: "error",
        text1: "Could not start listing",
        text2: e instanceof Error ? e.message : "Try again",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: clearance }]}>
      <Text style={styles.kicker}>Sell</Text>
      <Text style={styles.title}>List a book in 60 seconds</Text>
      <Text style={styles.subtitle}>
        Scan a barcode, set your price. Listing is free and you keep {SELLERS_KEEP} of
        every sale.
      </Text>
      <Pressable
        style={[styles.btn, creating && styles.disabled]}
        onPress={handleStartListing}
        disabled={creating}
        accessibilityRole="button"
        accessibilityLabel="Start listing"
      >
        {creating ? (
          <ActivityIndicator color={WHITE} />
        ) : (
          <Text style={styles.btnText}>Start listing</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: WHITE,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitle: { color: MUTED, fontSize: 15, lineHeight: 22, marginBottom: 24 },
  btn: {
    backgroundColor: NAVY,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  btnText: { color: WHITE, fontWeight: "700", fontSize: 15 },
  disabled: { opacity: 0.7 },
});
