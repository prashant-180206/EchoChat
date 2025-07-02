import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import LoadingModal from "@/components/libs/LoadingModal";
import { GetChats } from "@/backend/firebase/GetChat";
import { useLocalSearchParams } from "expo-router";
import { Conversation, Message } from "@/types/conversations";
import { useUser } from "@/context/UserContext";
import SendMessageBar from "@/components/SendMessageBar";
import { SendMessage } from "@/backend/firebase/SendMsg";
import MessageShow from "@/components/MessageShow";

const recierverindex = () => {
  const [Loading, setLoading] = useState(false);
  const { reciever } = useLocalSearchParams();
  const [Msg, setMsg] = useState("");
  const [Messages, setMessages] = useState<Conversation[]>([]);

  const { user } = useUser();

  const onSendMessage = async () => {
    try {
      if (Msg.length === 0) return;
      await SendMessage(Msg, reciever as string, user);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    let unsubscribe: () => void;

    const getMessages = async () => {
      console.log("Started searching");
      const { data, unsubscribe: unsub } = await GetChats(
        reciever as string,
        0,
        (convo) => {
          if (convo === null) return;
          setMessages((prev) => [convo]);
        }
      );
      if (unsub) {
        unsubscribe = unsub;
      }
      // console.log("DAta ", data);
      if (!data) return;
      setMessages([...Messages, data]);
      // console.log(...Messages);
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
          Messages.map((convo, convoIndex) => (
            <React.Fragment key={convoIndex}>
              {convo.Messages.map((msg, msgIndex) => (
                <MessageShow message={msg} key={msgIndex}/>
              ))}
            </React.Fragment>
          ))}
      </View>
      <SendMessageBar
        onPress={onSendMessage}
        value={Msg}
        onChangeText={setMsg}
      />
    </View>
  );
};

export default recierverindex;
