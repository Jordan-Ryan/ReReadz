import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import Toast from "react-native-toast-message";

export default function VerifyEmailScreen() {
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
      if (type === "signup" && access_token && refresh_token) {
        try {
          await supabase.auth.setSession({ access_token, refresh_token });
          setStatus("success");
          Toast.show({
            type: "success",
            text1: "Email verified",
            text2: "You can now sign in.",
          });
          setTimeout(() => router.replace("/(auth)/login"), 1500);
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

  return (
    <View style={styles.container}>
      {status === "loading" && (
        <Text style={styles.text}>Verifying your email…</Text>
      )}
      {status === "success" && (
        <Text style={styles.text}>Email verified. Redirecting to sign in…</Text>
      )}
      {status === "error" && (
        <>
          <Text style={styles.text}>Invalid or expired verification link.</Text>
          <Text style={styles.subtitle}>
            Request a new verification email from sign in or check your inbox.
          </Text>
          <Pressable
            style={styles.btn}
            onPress={() => router.replace("/(auth)/login")}
          >
            <Text style={styles.btnText}>Go to sign in</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 12 },
  subtitle: { fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 24 },
  btn: { padding: 14, paddingHorizontal: 24, backgroundColor: "#0ea5e9", borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "600" },
});
