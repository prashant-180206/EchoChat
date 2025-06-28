import { View, Text, StatusBar, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = () => {
  return (
    <View className="">
      {/* Transparent status bar for edge-to-edge layout */}
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent" // set to transparent for edge-to-edge
      />

      {/* Actual header content */}
      <SafeAreaView className="bg-primary py-4 px-5 ">
        <Text className="text-text text-lg font-semibold">Echme g imngjoChat</Text>
      </SafeAreaView>
    </View>
  );
};

export default CustomHeader;
