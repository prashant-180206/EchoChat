// app/(auth)/_layout.tsx
import CustomHeader from "@/components/CustomHeader";
import { Slot, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          header: () => <CustomHeader Title="Log In" />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          header: () => <CustomHeader Title="Create Account" />,
        }}
      ></Stack.Screen>
      <Stack.Screen name="forgotpassword"></Stack.Screen>
    </Stack>
  );
}
