import { Stack } from "expo-router";

export default function BlogLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: "Blog" }}>
      <Stack.Screen name="index" options={{ title: "Blog" }} />
      <Stack.Screen name="[slug]" options={{ title: "Article" }} />
    </Stack>
  );
}
