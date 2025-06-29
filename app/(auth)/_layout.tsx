// app/(auth)/_layout.tsx
import CustomHeader from "@/components/CustomHeader";
import { Slot, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="signup">
      <Stack.Screen name="login"></Stack.Screen>
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          header: () => <CustomHeader Title="SignUp" />,
        }}
      ></Stack.Screen>
      <Stack.Screen name="forgotpassword"></Stack.Screen>
    </Stack>
  );
}
