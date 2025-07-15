import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { people } from "@/types/user";
import { useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/constant/color";

interface PeopleShowProps {
  person: people;
}

const PeopleShow = ({ person }: PeopleShowProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/chats/chat/${person.Email}`);
      }}
    >
      <View className="p-4 border-b border-gray-200 flex-row justify-start gap-4 items-center">
        <View className="w-14 h-14">
          <Image
            source={{
              uri: person?.profileUrl
                ? person?.profileUrl
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            }}
            className="flex-1 bg-black rounded-full "
          />
        </View>
        <View className="flex-1 ">
          <Text className="text-lg font-semibold">
            {person.Name.split(" ")[0][0].toUpperCase() +
              person.Name.split(" ")[0].slice(1)}
          </Text>
          <View className="flex-row justify-between pr-4">
            <Text className="text-text-100">{person.LastMsg?.Content}</Text>
            {/* <Text className="text-gray-500">{person.LastMsg?.Status}</Text> */}
            <FontAwesome
              name="check"
              size={16}
              color={
                person.LastMsg.Status === "Read"
                  ? Colors.primary.DEFAULT
                  : Colors.text.DEFAULT
              }
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PeopleShow;
