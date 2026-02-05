import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading…" }: LoadingScreenProps): React.ReactElement {
  return (
    <View style={styles.container} accessibilityLabel={message}>
      <ActivityIndicator size="large" color="#0ea5e9" accessibilityLabel="Loading" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: { marginTop: 12, fontSize: 14, color: "#64748b" },
});
