// app/_layout.tsx
import "./global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </>
  );
}
