import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Input from "./libs/Input";
import { Ionicons } from "@expo/vector-icons";

interface SendBarProps {
  onPress?: () => void;
  value?: string;
  onChangeText?: (tex: string) => void;
}

const SendMessageBar = ({
  onPress = () => {},
  value = "",
  onChangeText = (tex) => {},
}: SendBarProps) => {
  return (
    <View className="bg-bg-200 py-4 px-4 flex-row gap-2">
      <View className="flex-1">
        <Input
          placeholder="Type Message..."
          value={value}
          onChangeText={onChangeText}
          showTitle={false}
          numberOfLines={5}
          className="my-0 border-0 bg-bg-100 py-3 rounded-3xl"
        ></Input>
      </View>

      <TouchableOpacity
        className="bg-primary-100 mb-4 rounded-full items-center justify-center px-6"
        onPress={onPress}
      >
        <Ionicons name="send" size={28} color={"black"} />
      </TouchableOpacity>
      <Text />
    </View>
  );
};

export default SendMessageBar;
