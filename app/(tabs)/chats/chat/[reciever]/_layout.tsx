import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Recieverlayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};

export default Recieverlayout;
