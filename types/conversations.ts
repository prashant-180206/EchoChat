export type Message = {
  Content: string;
  Links?: string;
  Time: string;
  Sender: string;
  Status: "Read" | "Unread";
};

export type Conversation = {
  participants: string[];
  date: string;
  Messages: Message[];
  LastMsg: Message;
};
