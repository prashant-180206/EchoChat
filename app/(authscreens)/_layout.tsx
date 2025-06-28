// app/(auth)/_layout.tsx
import { Slot, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="signup">
      <Stack.Screen name="login"></Stack.Screen>
      <Stack.Screen name="signup"></Stack.Screen>
      <Stack.Screen name="forgotpassword"></Stack.Screen>
    </Stack>
  );
}
