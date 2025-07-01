import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import SearchBar from "@/components/libs/SearchBar";
import { useUser } from "@/context/UserContext";
import ThemeToggleBtn from "@/components/Themetogglebtn";
import ThemeClassWrapper from "@/hooks/Themewrapper";

const Chats = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <ThemeClassWrapper>
      <View className="flex-1 bg-bg">
        {/* <ThemeToggleBtn /> */}
        {user &&
          user.ConnectedPeople.map((person) => {
            return (
              <TouchableOpacity
                key={person.Email}
                onPress={() => {
                  router.push(`/chats/chat/${person.Email}`);
                }}
              >
                <View className="p-4 border-b border-gray-200 flex-row justify-start gap-4 items-center">
                  <View className="w-20 h-20">
                    <Image
                      source={{
                        uri: person?.profileUrl
                          ? person?.profileUrl
                          : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                      }}
                      className="flex-1 bg-black rounded-full border-2 border-secondary-100"
                    />
                  </View>
                  <View className="flex-1 ">
                    <Text className="text-lg font-semibold">{person.Name}</Text>
                    <View className="flex-row justify-between pr-4">
                      <Text className="text-gray-500">
                        {person.LastMsg?.Content}
                      </Text>
                      <Text className="text-gray-500">
                        {person.LastMsg?.Status}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </ThemeClassWrapper>
  );
};

export default Chats;
