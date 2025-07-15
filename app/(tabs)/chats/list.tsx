import { View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";
import ThemeClassWrapper from "@/hooks/Themewrapper";
import PeopleShow from "@/components/PeopleShow";

const Chats = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <ThemeClassWrapper>
      <View className="flex-1 bg-bg">
        {user &&
          user.ConnectedPeople.map((person, index) => {
            return <PeopleShow key={index} person={person} />;
          })}
      </View>
    </ThemeClassWrapper>
  );
};

export default Chats;
