import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Toast from "react-native-toast-message";

export default function SellScreen() {
  const router = useRouter();
  const { session } = useAuth();
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
    <View style={styles.container}>
      <Text style={styles.title}>Sell books</Text>
      <Text style={styles.subtitle}>List your book in a few steps. You set the price.</Text>
      <Pressable
        style={[styles.btn, creating && styles.disabled]}
        onPress={handleStartListing}
        disabled={creating}
      >
        {creating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Start listing</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#64748b", marginBottom: 24 },
  btn: { backgroundColor: "#0ea5e9", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600" },
  disabled: { opacity: 0.7 },
});
