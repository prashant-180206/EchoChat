import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { UserStructure } from "@/types/user";

interface SearchResultProps {
  person: UserStructure;
  onAdd?: () => void;
}

const SearchResult = ({ person, onAdd = () => {} }: SearchResultProps) => {
  return (
    <View className="flex-row items-center justify-between gap-2  border-2 border-bg-200 p-4 rounded-2xl mb-2">
      <View className="flex-row items-center w-4/6">
        <View className="w-14 mr-2 h-14">
          <Image
            source={{
              uri: person.ProfilePicUrl
                ? person.ProfilePicUrl
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            }}
            className="flex-1 bg-black rounded-full"
          />
        </View>
        <View className="flex-col pl-2">
          <Text className="text-text font-semibold text-xl">
            {person.Name.split(" ")[0][0].toUpperCase() +
              person.Name.split(" ")[0].slice(1)}{" "}
            {person.Name.split(" ")[1][0].toUpperCase() +
              person.Name.split(" ")[1].slice(1)}
          </Text>
          <Text className="text-text-100">{person.Email}</Text>
        </View>
      </View>
      <TouchableOpacity className="" onPress={onAdd}>
        <Text className="bg-secondary-100 px-4 p-2 rounded-full font-semibold">
          + add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchResult;
