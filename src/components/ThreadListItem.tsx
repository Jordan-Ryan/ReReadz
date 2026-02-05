import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface ThreadListItemProps {
  peerName: string;
  peerAvatar: string | null;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unread: boolean;
  listingImage?: string | null;
  listingTitle?: string | null;
  onPress: () => void;
}

function formatTime(dateString: string | null): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" });
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export function ThreadListItem({
  peerName,
  peerAvatar,
  lastMessage,
  lastMessageAt,
  unread,
  listingImage,
  listingTitle,
  onPress,
}: ThreadListItemProps) {
  const displayText = listingTitle || lastMessage || "No messages yet";
  const time = formatTime(lastMessageAt);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.avatarWrap, unread && styles.avatarUnread]}>
        {peerAvatar ? (
          <Image source={{ uri: peerAvatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarInitial}>{peerName?.[0]?.toUpperCase() || "U"}</Text>
          </View>
        )}
        {unread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.name, unread && styles.nameUnread]} numberOfLines={1}>
            {peerName}
          </Text>
          <Text style={[styles.time, unread && styles.timeUnread]}>{time}</Text>
        </View>
        <View style={styles.previewRow}>
          {listingImage ? (
            <Image source={{ uri: listingImage }} style={styles.thumb} />
          ) : null}
          <Text style={[styles.preview, unread && styles.previewUnread]} numberOfLines={2}>
            {displayText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  avatarWrap: {
    position: "relative",
    marginRight: 12,
  },
  avatarUnread: {
    borderWidth: 2,
    borderColor: "#0ea5e9",
    borderRadius: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: "600",
    color: "#475569",
  },
  unreadDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0ea5e9",
    borderWidth: 2,
    borderColor: "#fff",
  },
  content: { flex: 1, minWidth: 0 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#334155",
    flex: 1,
  },
  nameUnread: {
    fontWeight: "700",
    color: "#0f172a",
  },
  time: {
    fontSize: 12,
    color: "#64748b",
    marginLeft: 8,
  },
  timeUnread: {
    color: "#0ea5e9",
    fontWeight: "500",
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  thumb: {
    width: 24,
    height: 32,
    borderRadius: 4,
    backgroundColor: "#f1f5f9",
  },
  preview: {
    flex: 1,
    fontSize: 14,
    color: "#64748b",
  },
  previewUnread: {
    color: "#475569",
    fontWeight: "500",
  },
});
