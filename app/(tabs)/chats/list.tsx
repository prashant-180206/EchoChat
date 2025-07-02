import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import SearchBar from "@/components/libs/SearchBar";
import { useUser } from "@/context/UserContext";
import ThemeToggleBtn from "@/components/Themetogglebtn";
import ThemeClassWrapper from "@/hooks/Themewrapper";
import PeopleShow from "@/components/PeopleShow";

const Chats = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <ThemeClassWrapper>
      <View className="flex-1 bg-bg">
        {/* <ThemeToggleBtn /> */}
        {user &&
          user.ConnectedPeople.map((person) => {
            return <PeopleShow person={person} />;
          })}
      </View>
    </ThemeClassWrapper>
  );
};

export default Chats;
