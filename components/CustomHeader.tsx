// CustomHeader.tsx

import React from "react";
import { Text, StatusBar, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // or your icon lib
import ThemeClassWrapper from "@/hooks/Themewrapper";
import { useRouter } from "expo-router";

const CustomHeader = ({ Title = "" }) => {
  const router = useRouter();
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
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" color={"white"} size={28}></Ionicons>
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-text text-xl font-bold">
          {Title ? Title : "EchoChat"}
        </Text>

        {/* Optional Action Icon */}
        <Pressable className="p-2">
          <Ionicons name="settings-outline" size={24} color="#ffffff" />
        </Pressable>
      </SafeAreaView>
    </ThemeClassWrapper>
  );
};

export default CustomHeader;
