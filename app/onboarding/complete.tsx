import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function OnboardingCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.centered}>
      <View style={styles.iconWrap}>
        <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
      </View>
      <Text style={styles.title}>You're all set</Text>
      <Text style={styles.subtitle}>
        Start browsing books, selling, or chatting with sellers.
      </Text>
      <Pressable style={styles.btn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.btnText}>Go to ReReadz</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  iconWrap: { marginBottom: 24 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 32, textAlign: "center" },
  btn: { backgroundColor: "#0ea5e9", padding: 14, paddingHorizontal: 32, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
