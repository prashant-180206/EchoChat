
import ThemeClassWrapper from "@/hooks/Themewrapper";
import { useColorScheme } from "nativewind";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

export default function Home() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <ThemeClassWrapper>
      <ScrollView className="flex-row">
       
        <View className="flex-row">
          <View className="flex-1 items-center justify-center bg-white p-4">
            <Text className="text-text mb-2">This should be text-text</Text>
            <Text className="text-text-100 mb-2">
              This should be text-text-100
            </Text>
            <Text className="text-text-200-dark mb-2">
              This should be text-text-200
            </Text>

            <View className="w-40 h-20 bg-primary-dark mb-2 items-center justify-center">
              <Text className="text-white">bg-primary</Text>
            </View>

            <View className="w-40 h-20 bg-primary-100 mb-2 items-center justify-center">
              <Text className="text-white">bg-primary-100</Text>
            </View>

            <View className="w-40 h-20 bg-primary-200 mb-2 items-center justify-center">
              <Text className="text-white">bg-primary-200</Text>
            </View>

            <View className="w-40 h-20 bg-accent mb-2 items-center justify-center">
              <Text className="text-white">bg-accent</Text>
            </View>

            <View className="w-40 h-20 bg-accent-100 mb-2 items-center justify-center">
              <Text className="text-white">bg-accent-100</Text>
            </View>

            <View className="w-40 h-20 bg-accent-200 mb-2 items-center justify-center">
              <Text className="text-white">bg-accent-200</Text>
            </View>

            <View className="w-40 h-20 border border-border mb-2 items-center justify-center">
              <Text className="text-white">border-border</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setColorScheme(colorScheme === "light" ? "dark" : "light");
                console.log("[ThemeToggle] colorScheme:", colorScheme);
              }}
              className="mt-4 bg-secondary p-2"
            >
              <Text className="text-white">Toggle Theme</Text>
            </TouchableOpacity>
          </View>
          {/* <View className="flex-1 items-center justify-center bg-white p-4">
            <Text className="text-text-dark mb-2">
              This should be text-text
            </Text>
            <Text className="text-text-100 mb-2">
              This should be text-text-100
            </Text>
            <Text className="text-text-200-dark mb-2">
              This should be text-text-200
            </Text>

            <View className="w-40 h-20 bg-primary-dark mb-2 items-center justify-center">
              <Text className="text-white">bg-primary</Text>
            </View>

            <View className="w-40 h-20 bg-primary-100-dark mb-2 items-center justify-center">
              <Text className="text-white">bg-primary-100</Text>
            </View>

            <View className="w-40 h-20 bg-primary-200-dark mb-2 items-center justify-center">
              <Text className="text-white">bg-primary-200</Text>
            </View>

            <View className="w-40 h-20 bg-accent-dark mb-2 items-center justify-center">
              <Text className="text-white">bg-accent</Text>
            </View>

            <View className="w-40 h-20 bg-accent-100-dark mb-2 items-center justify-center">
              <Text className="text-white">bg-accent-100</Text>
            </View>

            <View className="w-40 h-20 bg-accent-200-dark mb-2 items-center justify-center">
              <Text className="text-white">bg-accent-200</Text>
            </View>

            <View className="w-40 h-20 border border-border-dark mb-2 items-center justify-center">
              <Text className="text-white">border-border</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setColorScheme(colorScheme === "light" ? "dark" : "light");
                console.log("[ThemeToggle] colorScheme:", colorScheme);
              }}
              className="mt-4 bg-secondary p-2"
            >
              <Text className="text-white">Toggle Theme</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </ThemeClassWrapper>
  );
}
