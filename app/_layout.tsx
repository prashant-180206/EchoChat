// app/_layout.tsx
import { UserProvider } from "@/context/UserContext";
import "./global.css";

import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="(authscreens)"></Stack.Screen>
        <Stack.Screen name="(tabs)"></Stack.Screen>
        <Stack.Screen name="index"></Stack.Screen>
      </Stack>
    </>
  );
}
