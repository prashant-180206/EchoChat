import { Conversation, Message } from "@/types/conversations";
import { auth, db } from "./firebasestart";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SendMessage = async (
  message: string,
  receiverEmail: string,
  Links?: string
): Promise<void> => {
  const now = new Date();
  const senderEmail = auth.currentUser?.email;

  if (!senderEmail) {
    Alert.alert("User Not Logged In");
    return;
  }

  const [first, last] = [senderEmail, receiverEmail].sort();
  const docRef = doc(
    db,
    "CONVERSATIONS",
    `${first}_${last}_${now.toLocaleDateString()}`
  );

  const Msg: Message = {
    Content: message,
    Time: now.toLocaleTimeString(),
    Sender: senderEmail,
    Status: "Unread",
    ...(Links && { Links }),
  };

  // Prepare the data that you're writing to Firestore
  const conversationUpdate = {
    participants: [senderEmail, receiverEmail],
    Messages: arrayUnion(Msg),
    LastMsg: Msg,
    date: now.toLocaleDateString(),
  };

  // Write to Firestore
  await setDoc(docRef, conversationUpdate, { merge: true });

  // Store a lightweight local copy in AsyncStorage
  await AsyncStorage.mergeItem(
    `${receiverEmail}${now.toLocaleDateString()}`,
    JSON.stringify({
      conversationUpdate,
    })
  );
};
