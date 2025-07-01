// components/ScrollWrapper.tsx

import React, { ReactNode } from "react";
import { View, ScrollView, Platform } from "react-native";
import { twMerge } from "tailwind-merge";

interface ScreenContainerProps {
  children: ReactNode;
  className?: string; // for outer container
  innerClassName?: string; // for inner view
}

const ScrollWrapper = ({
  children,
  className = "",
  innerClassName = "",
}: ScreenContainerProps) => {
  return (
    <View className={twMerge("w-full h-[100dvh]", className)}>
      <ScrollView
        className="h-full w-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          className={twMerge(
            "py-20 items-center justify-center",
            innerClassName
          )}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScrollWrapper;
