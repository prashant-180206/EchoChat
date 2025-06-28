// app/_layout.tsx
import "./global.css";

import { Slot, Stack } from "expo-router";
import CustomHeader from "@/components/CustomHeader";

export default function RootLayout() {
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="(authscreens)"></Stack.Screen>
        <Stack.Screen name="(tabs)"></Stack.Screen>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }}
        ></Stack.Screen>
      </Stack>
    </>
  );
}
