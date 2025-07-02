import { Conversation, Message } from "@/types/conversations";
import { auth, db } from "./firebasestart";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/context/UserContext";
import { people, UserStructure } from "@/types/user";

export const SendMessage = async (
  message: string,
  receiverEmail: string,
  user: UserStructure | null,
  Links?: string
): Promise<void> => {
  const now = new Date();
  const senderEmail = auth.currentUser?.email;

  if (!senderEmail || user === null) {
    // console.error("[SendMessage] User not logged in.");
    Alert.alert("User Not Logged In");
    return;
  }

  const [first, last] = [senderEmail, receiverEmail].sort();
  const conversationID = `${first}_${last}_${now.toISOString().split("T")[0]}`;
  const docRef = doc(db, "CONVERSATIONS", conversationID);
  const Msg: Message = {
    Content: message,
    Time: now.toLocaleTimeString(),
    Sender: senderEmail,
    Status: "Unread",
    ...(Links && { Links }),
  };

  const conversationUpdate = {
    participants: [senderEmail, receiverEmail],
    Messages: arrayUnion(Msg),
    LastMsg: Msg,
    date: now.toLocaleDateString(),
  };

  // ✅ Update sender's ConnectedPeople
  const ConnectedUserArray: people[] = user.ConnectedPeople.map((val) => {
    if (val.Email === receiverEmail) {
      val.LastMsg = Msg;
    }
    return val;
  });

  // Write conversation doc
  await setDoc(docRef, conversationUpdate, { merge: true });

  // Update sender user doc
  await updateDoc(doc(db, "USERS", user.Email), {
    ...user,
    ConnectedPeople: ConnectedUserArray,
  } satisfies UserStructure);

  // ✅ Update receiver's ConnectedPeople
  const receiverDocRef = doc(db, "USERS", receiverEmail);
  const receiverSnap = await getDoc(receiverDocRef);

  if (receiverSnap.exists()) {
    const receiverData = receiverSnap.data() as UserStructure;

    const updatedReceiverConnectedPeople: people[] =
      receiverData.ConnectedPeople.map((val) => {
        if (val.Email === senderEmail) {
          val.LastMsg = Msg;
        }
        return val;
      });

    await updateDoc(receiverDocRef, {
      ...receiverData,
      ConnectedPeople: updatedReceiverConnectedPeople,
    } satisfies UserStructure);
  } else {
  }

  // ✅ Store lightweight local copy
  const asyncStorageKey = `${receiverEmail}${now.toLocaleDateString()}`;
  await AsyncStorage.mergeItem(
    asyncStorageKey,
    JSON.stringify({
      conversationUpdate,
    })
  );
};
