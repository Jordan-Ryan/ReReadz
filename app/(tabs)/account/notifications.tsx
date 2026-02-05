import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Ionicons } from "@expo/vector-icons";

interface NotificationRow {
  id: string;
  title: string;
  content: string;
  type: string;
  read_at: string | null;
  read_status: boolean;
  related_entity_type: string | null;
  related_entity_id: string | null;
  data: Record<string, unknown> | null;
  created_at: string;
}

export default function NotificationsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [list, setList] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("id, title, content, type, read_at, read_status, related_entity_type, related_entity_id, data, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      setList((data as NotificationRow[]) ?? []);
    } catch (e) {
      console.error(e);
      setList([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (id: string) => {
    try {
      await supabase
        .from("notifications")
        .update({ read_at: new Date().toISOString(), read_status: true })
        .eq("id", id);
      setList((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, read_at: new Date().toISOString(), read_status: true }
            : n
        )
      );
    } catch (_) {}
  };

  const onPress = (n: NotificationRow) => {
    if (!n.read_at) markRead(n.id);
    if (n.related_entity_type === "thread" && n.related_entity_id) {
      router.push(`/(tabs)/messages/${n.related_entity_id}` as any);
      return;
    }
    if (n.related_entity_type === "order" && n.related_entity_id) {
      router.push({
        pathname: "order/[id]",
        params: { id: n.related_entity_id },
      } as any);
      return;
    }
    const data = n.data as { thread_id?: string; order_id?: string } | null;
    if (data?.thread_id) {
      router.push(`/(tabs)/messages/${data.thread_id}` as any);
      return;
    }
    if (data?.order_id) {
      router.push({ pathname: "order/[id]", params: { id: data.order_id } } as any);
    }
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to view notifications.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (list.length === 0) {
    return (
      <View style={styles.centered}>
        <Ionicons name="notifications-outline" size={48} color="#94a3b8" />
        <Text style={styles.emptyTitle}>No notifications yet</Text>
        <Text style={styles.subtitle}>
          Orders and messages will show up here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={[styles.row, !item.read_at && styles.rowUnread]}
          onPress={() => onPress(item)}
        >
          <View style={styles.rowContent}>
            <Text style={[styles.rowTitle, !item.read_at && styles.rowTitleUnread]}>
              {item.title}
            </Text>
            <Text style={styles.rowContentText} numberOfLines={2}>
              {item.content}
            </Text>
            <Text style={styles.rowDate}>
              {new Date(item.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, paddingBottom: 32 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  subtitle: { color: "#64748b", marginTop: 8 },
  emptyTitle: { fontSize: 18, fontWeight: "600", marginTop: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  rowUnread: { backgroundColor: "#f0f9ff" },
  rowContent: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: "500", color: "#0f172a" },
  rowTitleUnread: { fontWeight: "700" },
  rowContentText: { fontSize: 14, color: "#64748b", marginTop: 2 },
  rowDate: { fontSize: 12, color: "#94a3b8", marginTop: 4 },
});
