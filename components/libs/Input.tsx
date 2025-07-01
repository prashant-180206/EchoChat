import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { twMerge } from "tailwind-merge";

interface InputProps {
  Title?: string;
  placeholder?: string;
  className?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  value?: string;
  Numpad?: boolean;
  VisibilityToggleShow?: boolean;
  numberOfLines?: number;
  keystring?: number | string; // key is required for React to track the component
  showTitle?: boolean; // Optional prop to show/hide title
}

const Input = ({
  Title = "Title",
  placeholder = "Enter Details",
  className = "",
  onChangeText = (text: string) => {},
  onBlur = () => {},
  value = "",
  Numpad = false,
  VisibilityToggleShow = false,
  numberOfLines = 1,
  keystring = 1,
  showTitle = true, // Optional prop to show/hide title
}: InputProps) => {
  const [Visibility, setVisibility] = useState(false);
  return (
    <View className="w-full items-start justify-center flex-col mb-4" key={keystring}>
      {showTitle && (
        <Text className="text-text-100 text-base font-semibold mb-1">
          {Title}
        </Text>
      )}
      <View className="w-full ">
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
          keyboardType={Numpad ? "numeric" : "default"}
          secureTextEntry={
            VisibilityToggleShow ? (Visibility ? false : true) : false
          }
          numberOfLines={numberOfLines}
          multiline={numberOfLines > 1}
          className={twMerge(
            "bg-bg-200 p-2 pl-4 mb-4 rounded-full border-2 border-border-200 w-full",
            className
          )}
        />
        {VisibilityToggleShow && (
          <TouchableOpacity
            onPress={() => {
              setVisibility(!Visibility);
            }}
            className="absolute right-4 top-1.5"
          >
            <Ionicons name={Visibility ? "eye" : "eye-off"} size={28} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
