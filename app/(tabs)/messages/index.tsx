import { useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useTabClearance } from "@/hooks/useTabClearance";
import { useMessageThreads } from "@/hooks/useMessageThreads";
import { ThreadListItem } from "@/components/ThreadListItem";
import { Ionicons } from "@expo/vector-icons";

export default function MessagesListScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const clearance = useTabClearance();
  const { threads, loading, error } = useMessageThreads(user?.id ?? null);

  const openThread = useCallback(
    (threadId: string) => {
      router.push(`/(tabs)/messages/${threadId}`);
    },
    [router]
  );

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to view messages.</Text>
        <Pressable
          style={styles.signIn}
          onPress={() => router.push("/(auth)/login" as any)}
          accessibilityRole="button"
          accessibilityLabel="Sign in"
        >
          <Text style={styles.signInText}>Sign in</Text>
        </Pressable>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.subtitle}>Loading conversations…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Failed to load messages.</Text>
        <Text style={styles.subtitle}>{error.message}</Text>
      </View>
    );
  }

  if (threads.length === 0) {
    return (
      <View style={styles.centered}>
        <View style={styles.emptyIcon}>
          <Ionicons name="chatbubbles-outline" size={48} color="#94a3b8" />
        </View>
        <Text style={styles.title}>No conversations yet</Text>
        <Text style={styles.subtitle}>
          Start by making an offer on a book or buying something.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={threads}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ThreadListItem
          peerName={item.peerName}
          peerAvatar={item.peerAvatar}
          lastMessage={item.last_message_preview}
          lastMessageAt={item.last_message_at}
          unread={item.unread}
          listingImage={item.listingImage}
          listingTitle={item.listingTitle}
          onPress={() => openThread(item.id)}
        />
      )}
      contentContainerStyle={[styles.listContent, { paddingBottom: clearance }]}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
  error: {
    fontSize: 16,
    fontWeight: "600",
    color: "#dc2626",
    marginBottom: 8,
    textAlign: "center",
  },
  signIn: {
    marginTop: 16,
    backgroundColor: "#1700AD",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  signInText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
