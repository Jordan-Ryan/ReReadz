import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Toast from "react-native-toast-message";

export default function OnboardingScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      router.replace("/(auth)/login");
      return;
    }
    supabase
      .from("profiles")
      .select("onboarding_completed, display_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if ((data as any)?.onboarding_completed) {
          router.replace("/(tabs)");
          return;
        }
        setDisplayName((data as any)?.display_name ?? user.email?.split("@")[0] ?? "");
        setLoading(false);
      });
  }, [user?.id, router]);

  const complete = async () => {
    if (!user?.id) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim() || null,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      if (error) throw error;
      router.replace("/onboarding/complete");
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Could not save",
        text2: e instanceof Error ? e.message : "Try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to ReReadz</Text>
        <Text style={styles.subtitle}>
          Add your display name so buyers and sellers can recognise you.
        </Text>
        <Text style={styles.label}>Display name</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your name"
          placeholderTextColor="#94a3b8"
          editable={!saving}
        />
        <Pressable
          style={[styles.btn, saving && styles.disabled]}
          onPress={complete}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Continue</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24, paddingTop: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6, color: "#475569" },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 14,
    marginBottom: 24,
    fontSize: 16,
  },
  btn: { backgroundColor: "#0ea5e9", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600" },
  disabled: { opacity: 0.7 },
});
