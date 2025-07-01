import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from "react-native";
import { Tabs, Slot, useRouter, usePathname, Stack } from "expo-router";
import { UserProvider } from "@/context/UserContext";
import { Colors } from "@/assets/constant/color";
import CustomTabbar from "@/components/CustomTabbar";

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
                  onPress={() => router.push(`/(tabs)/${tab.name}` as any)}
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
        tabBar={(props) => <CustomTabbar {...props} />}
        initialRouteName="chats"
      >
        {tabRoutes.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <FontAwesome
                    name={tab.icon as any}
                    size={30}
                    color={
                      focused ? Colors.primary.DEFAULT : Colors.primary[100]
                    }
                  ></FontAwesome>
                );
              },
            }}
          />
        ))}
        <Tabs.Screen
          name="add"
          options={{
            headerShown: false,
            href: null,
          }}
        ></Tabs.Screen>
      </Tabs>
    </UserProvider>
  );
}
