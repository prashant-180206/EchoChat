import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';

const ThemeToggleBtn = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  return (
    <View className="items-center justify-center">
      <Pressable
        onPress={toggleColorScheme}
        className="p-3 rounded-full bg-gray-200 dark:bg-gray-800"
      >
        <Text className="text-xl">
          {isDark ? '🌙' : '☀️'}
        </Text>
      </Pressable>
    </View>
  );
};

export default ThemeToggleBtn;
