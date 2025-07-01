import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { twMerge } from "tailwind-merge";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  // onClear?: () => void;
  className?: string; // extra styling if needed
  btnClassName?: string;
  onSearch?: () => void; // optional search function
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  // onClear,
  className = "",
  btnClassName = "",
  onSearch = () => {},
}) => {
  return (
    <View
      className={twMerge(
        "flex-row items-center px-4 rounded-full bg-bg border-2 border-bg-200 ",
        className
      )}
    >
      {/* Search Icon */}
      <Ionicons name="search-outline" size={20} color="#6b7280" />

      {/* Text Input */}
      <TextInput
        className="flex-1 ml-2 text-base text-text"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
      />

      {/* Clear Button */}

      <TouchableOpacity onPress={onSearch}>
        <Text
          className={twMerge(
            " bg-accent-100 p-4 py-2 rounded-full text-text font-semibold",
            btnClassName
          )}
        >
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
