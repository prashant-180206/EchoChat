import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Chats = () => {
  return (
    <View>
      <Text>Chatj jjnnnjnnnin fnnfs</Text>
      <Link href={"/(tabs)/chats/chat"}>
        <Text>frg</Text>
        <Link href={"/(tabs)/chats/chat"}>
          <Text>go to chat</Text>
        </Link>
      </Link>
    </View>
  );
};

export default Chats;
