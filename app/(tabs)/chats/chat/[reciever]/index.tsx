import { View, Text, Alert, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import { GetChats } from "@/backend/firebase/GetChat";
import { useLocalSearchParams } from "expo-router";
import { Conversation, Message } from "@/types/conversations";
import { useUser } from "@/context/UserContext";
import SendMessageBar from "@/components/SendMessageBar";
import { SendMessage } from "@/backend/firebase/SendMsg";
import MessageShow from "@/components/MessageShow";

const ReceiverIndex = () => {
  const [loading, setLoading] = useState(false);
  const { reciever } = useLocalSearchParams();
  const [msg, setMsg] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const { user } = useUser();

  const onSendMessage = async () => {
    try {
      if (msg.length === 0) return;
      // console.log("Sending message:", msg);
      await SendMessage(msg, reciever as string, user);
      setMsg("");
    } catch (error) {
      // console.log("SendMessage error:", error);
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    // console.log("useEffect: Initial getMessages");
    let unsubscribe: (() => void) | undefined;

    const getMessages = async () => {
      // console.log("getMessages: Loading...");
      setLoading(true);
      const { data, unsubscribe: unsub } = await GetChats(
        reciever as string,
        "",
        (convo) => {
          // console.log("Snapshot listener triggered with convo:", convo);
          if (convo === null) return;
          setConversations((prev) => {
            const filtered = prev.filter((p) => p.date !== convo.date);
            const updated = [...filtered, convo];
            updated.sort((a, b) => a.date.localeCompare(b.date));
            // console.log("Snapshot merge: conversations after merge:", updated);
            return updated;
          });
        }
      );

      if (unsub) {
        unsubscribe = unsub;
        // console.log("Snapshot unsubscribe function set");
      }

      // console.log("getMessages: Initial data:", data);

      if (data && !unsubscribe) {
        setConversations((prev) => {
          // console.log("Appending initial data:", data);
          return [...prev, data];
        });
      }
      setLoading(false);
    };

    getMessages();

    return () => {
      if (unsubscribe) {
        // console.log("Cleaning up snapshot unsubscribe");
        unsubscribe();
      }
    };
  }, []);

  const messagesToRender = useMemo(() => {
    let msgs: Message[] = [];
    conversations
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach((val) => {
        const sorted = val.Messages.sort((a, b) =>
          b.Time.localeCompare(a.Time)
        );
        msgs.push(...sorted);
      });
    // console.log("messagesToRender: total =", msgs.length);
    return msgs;
  }, [conversations]);

  const ShowMoreMessages = async () => {
    const lastDate = conversations.map((c) => c.date).sort()[0]; // oldest date

    setLoading(true);
    const { data } = await GetChats(reciever as string, lastDate);
    // console.log("ShowMoreMessages: GetChats returned:", data);

    if (!data) {
      setLoading(false);
      return;
    }

    setConversations((prev) => {
      return [...prev, data];
    });

    setLoading(false);
  };

  return (
    <View className="flex-1 bg-bg">
      {/* <LoadingModal visible={loading} /> */}
      <View className="flex-1">
        <FlatList
          data={messagesToRender}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <MessageShow message={item} />}
          onEndReached={ShowMoreMessages}
          onEndReachedThreshold={0.2}
          inverted
          ListFooterComponent={
            <View className="h-[75vh] items-center justify-center ">
              <Text>Sroll to top to see more messages</Text>
            </View>
          }
          ListEmptyComponent={
            <Text className="text-center text-text-100 mt-4 h-[25vh]">
              No messages yet.
            </Text>
          }
        />
      </View>
      <SendMessageBar
        onPress={() => {
          // console.log("SendMessageBar onPress triggered");
          onSendMessage();
        }}
        value={msg}
        onChangeText={(val) => {
          // console.log("Message input changed:", val);
          setMsg(val);
        }}
      />
    </View>
  );
};

export default ReceiverIndex;
