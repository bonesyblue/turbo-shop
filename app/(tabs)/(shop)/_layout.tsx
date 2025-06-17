import { Stack } from "expo-router";

export default function ShopStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Shop" }} />
      <Stack.Screen name="category/[id]" />
    </Stack>
  );
}
