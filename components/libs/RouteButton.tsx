import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { twMerge } from "tailwind-merge"; // ✅ Add this

type ButtonProps = {
  className?: string;
  path: string;
  Name: string;
};

const RouteButton = ({ className = "", path, Name = "" }: ButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(path as any)}
      className="items-center"
    >
      <Text
        className={twMerge(
          "bg-accent text-text px-10 text-center py-2 my-4 text-xl font-semibold rounded-full ",
          className
        )}
      >
        {Name}
      </Text>
    </TouchableOpacity>
  );
};

export default RouteButton;
