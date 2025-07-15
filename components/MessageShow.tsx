import { View, Text } from "react-native";
import React from "react";
import { Message } from "@/types/conversations";
import { auth } from "@/backend/firebase/firebasestart";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/constant/color";

interface MessageShowProps {
  message: Message;
}

const MessageShow = ({ message }: MessageShowProps) => {
  const useremail = auth.currentUser?.email;
  if (!useremail) return <View></View>;
  const sent = useremail === message.Sender;
  return (
    <View
      className={` mb-2 w-full flex-row ${!sent ? "justify-start" : "justify-end"} px-2`}
    >
      <View
        className={`p-2 rounded-3xl flex-row 
          ${!sent ? "bg-secondary-100 rounded-bl-none" : "bg-primary-100 rounded-br-none"}
           max-w-[80%]`}
      >
        <Text className="px-4 text-text font-semibold pr-0 max-w-[80%]">
          {message.Content}
        </Text>
        <Text className="text-sm px-2">
          {message.Time.split(":", 2).join(":")}
        </Text>
        {sent && (
          <View>
            <FontAwesome
              name="check"
              size={16}
              color={
                message.Status === "Read"
                  ? Colors.primary.DEFAULT
                  : Colors.text.DEFAULT
              }
            />
            {/* <Text>{message.Status}</Text> */}
          </View>
        )}
      </View>
    </View>
  );
};

export default MessageShow;
