import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: "Set up" }}>
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="complete" options={{ title: "You're all set" }} />
    </Stack>
  );
}
