import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Linking, ActivityIndicator } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/LoadingScreen";

const WEB_ADMIN_URL = "https://app.rereadz.com/admin";

export default function AdminScreen() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setRole(null);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data, error } = await supabase.rpc("get_admin_role", {
          _user_id: user.id,
        });
        if (error) throw error;
        setRole((data as string | null) ?? null);
      } catch (e) {
        console.error(e);
        setRole(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  if (loading) return <LoadingScreen message="Checking access…" />;
  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to access admin.</Text>
      </View>
    );
  }
  if (!role) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Access denied</Text>
        <Text style={styles.subtitle}>You don’t have admin access.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Admin</Text>
        <Text style={styles.subtitle}>
          The full admin dashboard is available on the web. Use it to manage users, content, and settings.
        </Text>
        <Pressable
          style={styles.btn}
          onPress={() => Linking.openURL(WEB_ADMIN_URL)}
          accessibilityRole="link"
          accessibilityLabel="Open admin in web browser"
        >
          <Text style={styles.btnText}>Open admin in browser</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#e2e8f0" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 20 },
  btn: { backgroundColor: "#0ea5e9", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600" },
});
