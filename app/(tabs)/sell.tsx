import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { SellAuthGate } from "@/components/SellAuthGate";
import { SellFlow } from "@/components/SellFlow";
import { WHITE } from "@/theme/brand";

export default function SellScreen() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <SellAuthGate />;
  }

  return <SellFlow />;
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
});
