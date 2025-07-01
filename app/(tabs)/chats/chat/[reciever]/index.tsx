import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "@/components/libs/Input";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/assets/constant/color";
import LoadingModal from "@/components/libs/LoadingModal";
import { GetChats } from "@/backend/firebase/GetChat";
import { useLocalSearchParams } from "expo-router";
import { SendMessage } from "@/backend/firebase/SendMsg";
import { Conversation, Message } from "@/types/conversations";

const recierverindex = () => {
  const [Loading, setLoading] = useState(false);
  const { reciever } = useLocalSearchParams();
  const [Msg, setMsg] = useState("");
  const [Messages, setMessages] = useState<Conversation[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    const getMessages = async () => {
      console.log("Started searching");
      const { data, unsubscribe: unsub } = await GetChats(
        reciever as string,
        0,
        (convo) => {
          if (convo === null) return;
          setMessages((prev) => [...prev, convo]);
        }
      );
      if (unsub) {
        unsubscribe = unsub;
      }
      console.log("DAta ", data);
      if (!data) return;
      setMessages([...Messages, data]);
      console.log(...Messages);
    };

    getMessages();
    console.log("Ended searching");

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []); // add reciever if it can change!

  return (
    <View className="flex-1 bg-bg">
      <LoadingModal visible={Loading} />
      <View className="flex-1">
        {Messages.length !== 0 &&
          Messages.map((convo, index) => {
            const spreadmessages = convo.Messages.map((msg, index) => {
              return (
                <Text key={index}>
                  {msg.Content} - {msg.Status}
                </Text>
              );
            });
            return <>{spreadmessages.map((val, index) => val)}</>;
          })}
      </View>
      <View className="pb-4 bg-bg-200 flex-row items-center justify-between px-4">
        <View className="flex-[3]">
          <Input
            Title="SendMsg"
            placeholder="Type Message"
            showTitle={false}
            value={Msg}
            onChangeText={setMsg}
            className="my-4 "
          />
        </View>
        <TouchableOpacity
          className="flex-1 p-2 bg-primary-100 flex-row items-center justify-center rounded-full px-4 pl-4 mb-4 mx-2"
          onPress={async () => {
            setLoading(true);
            try {
              await SendMessage(Msg, reciever as string);
              // Alert.alert("Message Sent");
            } catch (error) {
              // Alert.alert("Message Not Sent");
            }
            setMsg("");
            setLoading(false);
          }}
        >
          <Ionicons
            name="send"
            size={24}
            color={Colors.text.DEFAULT}
          ></Ionicons>
          <Text className=" ml-2 font-semibold text-center text-xl items-center justify-center">
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default recierverindex;
