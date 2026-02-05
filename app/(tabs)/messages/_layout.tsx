import { Stack } from "expo-router";

export default function MessagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Messages",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Messages" }} />
      <Stack.Screen name="[threadId]" options={{ title: "Chat" }} />
    </Stack>
  );
}
