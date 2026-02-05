import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Toast from "react-native-toast-message";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function SettingsScreen() {
  const { user } = useAuth();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("push_notifications, email_notifications")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setPushNotifications((data as { push_notifications?: boolean | null }).push_notifications ?? true);
        setEmailNotifications((data as { email_notifications?: boolean | null }).email_notifications ?? true);
      }
    } catch (e) {
      console.error(e);
      Toast.show({ type: "error", text1: "Failed to load settings" });
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const updatePush = async (value: boolean) => {
    if (!user?.id) return;
    setPushNotifications(value);
    setSaving("push");
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ push_notifications: value, updated_at: new Date().toISOString() })
        .eq("id", user.id);
      if (error) throw error;
      Toast.show({ type: "success", text1: "Settings saved" });
    } catch (e) {
      setPushNotifications(!value);
      Toast.show({ type: "error", text1: "Could not save" });
    } finally {
      setSaving(null);
    }
  };

  const updateEmail = async (value: boolean) => {
    if (!user?.id) return;
    setEmailNotifications(value);
    setSaving("email");
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ email_notifications: value, updated_at: new Date().toISOString() })
        .eq("id", user.id);
      if (error) throw error;
      Toast.show({ type: "success", text1: "Settings saved" });
    } catch (e) {
      setEmailNotifications(!value);
      Toast.show({ type: "error", text1: "Could not save" });
    } finally {
      setSaving(null);
    }
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to change settings.</Text>
      </View>
    );
  }

  if (loading) return <LoadingScreen message="Loading settings…" />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Push notifications</Text>
        <Switch
          value={pushNotifications}
          onValueChange={updatePush}
          disabled={saving === "push"}
          trackColor={{ false: "#e2e8f0", true: "#7dd3fc" }}
          thumbColor={pushNotifications ? "#0ea5e9" : "#94a3b8"}
          accessibilityLabel="Push notifications"
          accessibilityRole="switch"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email notifications</Text>
        <Switch
          value={emailNotifications}
          onValueChange={updateEmail}
          disabled={saving === "email"}
          trackColor={{ false: "#e2e8f0", true: "#7dd3fc" }}
          thumbColor={emailNotifications ? "#0ea5e9" : "#94a3b8"}
          accessibilityLabel="Email notifications"
          accessibilityRole="switch"
        />
      </View>
      <Text style={styles.hint}>
        Control how we notify you about orders, messages, and offers.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  subtitle: { color: "#64748b" },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#0f172a", marginBottom: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  label: { fontSize: 16, color: "#0f172a" },
  hint: { fontSize: 13, color: "#64748b", marginTop: 16 },
});
