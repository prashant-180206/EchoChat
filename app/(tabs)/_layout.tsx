import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from "react-native";
import { Tabs, Slot, useRouter, usePathname } from "expo-router";
import { UserProvider } from "@/context/UserContext";

const tabRoutes = [
  { name: "chats", title: "Chats", icon: "home" },
  { name: "calls", title: "Calls", icon: "phone" },
  { name: "profile", title: "Profile", icon: "user" },
  { name: "search", title: "Search", icon: "search" },
];

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Large screen custom layout
  if (isLargeScreen) {
    return (
      <UserProvider>
        <View className="flex-1 flex-row">
          <View className="w-[70px] bg-blue-500 items-center pt-6 space-y-6">
            {tabRoutes.map((tab) => {
              const isActive = pathname.includes(tab.name);
              return (
                <TouchableOpacity
                  key={tab.name}
                  onPress={() => router.push(`/(tabs)/calls`)}
                  className={`p-2 rounded-lg ${isActive ? "bg-blue-700" : ""}`}
                >
                  <FontAwesome
                    name={tab.icon as any}
                    size={24}
                    color={isActive ? "#fff" : "#cbd5e1"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="flex-1 bg-white">
            <Slot /> {/* ✅ Must use this for nested routes to render */}
          </View>
        </View>
      </UserProvider>
    );
  }

  // ✅ Default Tabs for small screens (AVD, phones)
  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
        }}
        initialRouteName="chats"
      >
        {tabRoutes.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color }) => (
                <FontAwesome name={tab.icon as any} size={24} color={color} />
              ),
            }}
          />
        ))}
      </Tabs>
    </UserProvider>
  );
}
