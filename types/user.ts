import { Timestamp } from "firebase/firestore";
import { Message } from "./conversations";

export type people = {
  Email: string;
  Name: string;
  LastMsg: Message;
  profileUrl?: string;
  Read: "Read" | "Unread";
  // LastModified: Timestamp;
};

export type UserStructure = {
  Name: string;
  Email: string;
  Bio: string;
  ConnectedPeople: people[];
  ProfilePicUrl?: string;
  CreatedAt: Timestamp;
};
