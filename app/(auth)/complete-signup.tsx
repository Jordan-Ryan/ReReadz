import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function CompleteSignupScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete signup</Text>
      <Text style={styles.subtitle}>
        Accept terms to continue. (Full flow can be added later.)
      </Text>
      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#64748b", marginBottom: 24 },
  button: {
    backgroundColor: "#0ea5e9",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
