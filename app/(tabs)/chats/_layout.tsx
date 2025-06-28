import { View, useWindowDimensions } from "react-native";
import { Redirect, Slot, Stack } from "expo-router";
import IndexScreen from "./chatlist";

export default function ChatsLayout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768; // md breakpoint

  if (isLargeScreen) {
    // ✅ Split view layout
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Left: index.tsx manually rendered */}
        <View className="flex-1 max-w-[400px]">
          <IndexScreen />
        </View>
        <View style={{ flex: 1, borderLeftWidth: 1, borderColor: "#ccc" }}>
          <Redirect href={"/(tabs)/chats/chat"}></Redirect>
          <Slot initialRouteName="chatlist" />
        </View>
      </View>
    );
  }

  // 📱 Mobile fallback: just a regular stack
  return (
    <Stack initialRouteName="chatlist">
      <Stack.Screen name="chatlist" />
      <Stack.Screen name="chat" />
    </Stack>
  );
}
