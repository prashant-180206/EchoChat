// CustomHeader.tsx

import React from "react";
import { Text, StatusBar, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // or your icon lib
import ThemeClassWrapper from "@/hooks/Themewrapper";
import { useRouter } from "expo-router";
import { Colors } from "@/assets/constant/color";

const CustomHeader = ({ Title = "" }) => {
  const router = useRouter();
  return (
    <ThemeClassWrapper>
      <SafeAreaView
        className="w-full bg-bg-200 flex-row items-center justify-between px-4 py-3 md:px-12 md:py-4 min-h-[56px]"
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
          <Ionicons
            name="arrow-back"
            color={Colors.primary.DEFAULT}
            size={28}
          ></Ionicons>
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-primary text-2xl flex-1 px-4 font-bold">
          {Title ? Title : "EchoChat"}
        </Text>

        {/* Optional Action Icon */}
        <Pressable
          className="p-2"
          onPress={() => {
            router.push("/(tabs)/add");
          }}
        >
          <Ionicons
            name="add-outline"
            size={28}
            color={Colors.primary.DEFAULT}
          />
        </Pressable>
        <Pressable className="p-2">
          <Ionicons name="search" size={24} color={Colors.primary.DEFAULT} />
        </Pressable>
        <Pressable className="p-2">
          <Ionicons name="menu" size={24} color={Colors.primary.DEFAULT} />
        </Pressable>
      </SafeAreaView>
    </ThemeClassWrapper>
  );
};

export default CustomHeader;
