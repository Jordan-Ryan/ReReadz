import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MessageBubbleProps {
  content: string;
  isMe: boolean;
  timestamp: string;
  readAt?: string | null;
  attachments?: { url: string }[];
}

export function MessageBubble({ content, isMe, timestamp, readAt, attachments = [] }: MessageBubbleProps) {
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const photoUrl = content === "Photo" && attachments.length > 0 ? attachments[0].url : null;

  if (content === "Photo" || !content) {
    return (
      <View style={[styles.wrap, isMe && styles.wrapMe]}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={styles.photo} resizeMode="cover" />
        ) : (
          <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
            <View style={styles.photoFallback}>
              <Ionicons
                name="camera-outline"
                size={16}
                color={isMe ? "#fff" : "#0f172a"}
              />
              <Text style={[styles.text, isMe && styles.textMe]}>Photo</Text>
            </View>
          </View>
        )}
        <View style={[styles.meta, isMe && styles.metaMe]}>
          <Text style={styles.time}>{time}</Text>
          {isMe ? (
            <Ionicons
              name={readAt ? "checkmark-done" : "checkmark"}
              size={14}
              color="#0ea5e9"
            />
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrap, isMe && styles.wrapMe]}>
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={[styles.text, isMe && styles.textMe]}>{content}</Text>
      </View>
      <View style={[styles.meta, isMe && styles.metaMe]}>
        <Text style={styles.time}>{time}</Text>
        {isMe ? (
          <Ionicons
            name={readAt ? "checkmark-done" : "checkmark"}
            size={14}
            color="#0ea5e9"
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    maxWidth: "85%",
    marginVertical: 4,
    alignSelf: "flex-start",
  },
  wrapMe: {
    alignSelf: "flex-end",
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  bubbleThem: {
    backgroundColor: "#e2e8f0",
  },
  bubbleMe: {
    backgroundColor: "#0ea5e9",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: 15,
    color: "#0f172a",
  },
  textMe: {
    color: "#fff",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
    paddingHorizontal: 4,
  },
  metaMe: {
    justifyContent: "flex-end",
  },
  time: {
    fontSize: 11,
    color: "#64748b",
  },
  photoFallback: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  photo: {
    width: 220,
    maxHeight: 280,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
  },
});
