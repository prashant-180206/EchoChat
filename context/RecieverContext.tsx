// context/ChatContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Conversation } from "@/types/conversations";
import { GetChats } from "@/backend/firebase/GetChat";

type ChatContextType = {
  chat: Conversation | null;
  loading: boolean;
};

const ChatContext = createContext<ChatContextType>({
  chat: null,
  loading: true,
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { reciever } = useLocalSearchParams<{ reciever: string }>();
  const [chat, setChat] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reciever) return;

    let unsubscribe: (() => void) | undefined;

    const loadChat = async () => {
      const { data, unsubscribe: unsub } = await GetChats(reciever, 0, (liveData) => {
        setChat(liveData);
      });

      setChat(data);
      unsubscribe = unsub;
      setLoading(false);
    };

    loadChat();

    return () => {
      unsubscribe?.();
    };
  }, [reciever]);

  return (
    <ChatContext.Provider value={{ chat, loading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
