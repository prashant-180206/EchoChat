// CustomHeader.tsx

import React from "react";
import { View, Text, Platform, StatusBar, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // or your icon lib
import ThemeClassWrapper from "@/hooks/Themewrapper";

const CustomHeader = () => {
  return (
    <ThemeClassWrapper>
      <SafeAreaView
        className=" w-full bg-primary flex-row items-center justify-between px-4 py-3 md:px-12 md:py-4 "
        edges={["top"]}
      >
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />

        {/* Title */}
        <Text className="text-text text-xl font-bold">EchoChat</Text>

        {/* Optional Action Icon */}
        <Pressable className="p-2">
          <Ionicons name="settings-outline" size={24} color="#ffffff" />
        </Pressable>
      </SafeAreaView>
    </ThemeClassWrapper>
  );
};

export default CustomHeader;
