import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { usePathname } from "expo-router";
import ThemeClassWrapper from "@/hooks/Themewrapper";

const CustomTabbar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const pathname = usePathname();
  return (
    <ThemeClassWrapper>
      <View
        className={`flex-row bg-bg-200 pb-6 pt-2 px-4 gap-2
        ${pathname.includes("chats/chat") ? "hidden" : ""}`}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // ✅ Pull the icon function
          const icon = options.tabBarIcon?.({
            focused: isFocused,
            color: isFocused ? "#000" : "#9ca3af",
            size: 30,
          });

          if (route.name === "add") return null;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="flex-1 rounded-full items-center justify-center p-2"
            >
              <View>
                <Text>{icon}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ThemeClassWrapper>
  );
};

export default CustomTabbar;
