import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function CheckoutSuccessScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment successful</Text>
      <Text style={styles.subtitle}>Your order has been placed. You can track it in My Orders.</Text>
      <Pressable style={styles.btn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.btnText}>Back to Home</Text>
      </Pressable>
      <Pressable style={styles.linkBtn} onPress={() => router.replace("/(tabs)/account")}>
        <Text style={styles.linkBtnText}>My Orders</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#64748b", marginBottom: 24 },
  btn: { backgroundColor: "#0ea5e9", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600" },
  linkBtn: { marginTop: 12, alignItems: "center" },
  linkBtnText: { color: "#0ea5e9", fontSize: 14 },
});
