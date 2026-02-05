import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const [checkedOnboarding, setCheckedOnboarding] = useState(false);

  useEffect(() => {
    if (loading || !session?.user?.id) {
      if (!loading && !session) router.replace("/(auth)/login");
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", session.user.id)
          .maybeSingle();
        if (cancelled) return;
        setCheckedOnboarding(true);
        const completed = (data as { onboarding_completed?: boolean } | null)?.onboarding_completed;
        if (completed) {
          router.replace("/(tabs)");
        } else {
          router.replace("/onboarding");
        }
      } catch {
        if (!cancelled) {
          setCheckedOnboarding(true);
          router.replace("/(tabs)");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [loading, session, router]);

  const showSpinner = loading || (!!session && !checkedOnboarding);
  if (!showSpinner && !session) return null;

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
    </View>
  );
}


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
