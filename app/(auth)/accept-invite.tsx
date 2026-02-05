import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import Toast from "react-native-toast-message";

export default function AcceptInviteScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const handleUrl = async (url: string | null) => {
      if (!url) {
        setStatus("error");
        return;
      }
      const hashIndex = url.indexOf("#");
      const hash = hashIndex >= 0 ? url.slice(hashIndex + 1) : "";
      const params = new URLSearchParams(hash);
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");
      const type = params.get("type");
      if ((type === "invite" || type === "magiclink") && access_token && refresh_token) {
        try {
          await supabase.auth.setSession({ access_token, refresh_token });
          setStatus("success");
          Toast.show({ type: "success", text1: "Invite accepted" });
          setTimeout(() => router.replace("/(tabs)"), 1500);
        } catch (e) {
          console.error(e);
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    };

    Linking.getInitialURL().then(handleUrl);
    const sub = Linking.addEventListener("url", ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, [router]);

  if (status === "loading") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Accepting invite…</Text>
      </View>
    );
  }
  if (status === "success") {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>You're in. Redirecting…</Text>
      </View>
    );
  }
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>Invalid or expired invite link.</Text>
      <Pressable style={styles.btn} onPress={() => router.replace("/(auth)/login")}>
        <Text style={styles.btnText}>Go to sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  text: { fontSize: 16, marginBottom: 24, textAlign: "center" },
  btn: { padding: 14, paddingHorizontal: 24, backgroundColor: "#0ea5e9", borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "600" },
});
