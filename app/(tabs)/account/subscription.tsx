import { View, Text, StyleSheet, Pressable, Linking } from "react-native";

const SUBSCRIPTION_WEB_URL = "https://app.rereadz.com/account/subscription";

export default function SubscriptionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
      <Text style={styles.subtitle}>
        Manage your ReReadz subscription, benefits, and billing on the web.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => Linking.openURL(SUBSCRIPTION_WEB_URL)}
        accessibilityRole="link"
        accessibilityLabel="Open subscription in browser"
      >
        <Text style={styles.buttonText}>Open subscription in browser</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 20 },
  button: { backgroundColor: "#0ea5e9", padding: 14, borderRadius: 8, alignItems: "center", alignSelf: "flex-start" },
  buttonText: { color: "#fff", fontWeight: "600" },
});
