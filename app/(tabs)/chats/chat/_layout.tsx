import { Stack } from "expo-router";
import { View } from "react-native";

export default function ChatLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="[reciever]" />
    </Stack>
  );
}
