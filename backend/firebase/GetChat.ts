import {
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  Unsubscribe,
} from "firebase/firestore";
import { auth, db } from "./firebasestart";
import { Conversation } from "@/types/conversations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserStructure } from "@/types/user";
import { Alert } from "react-native";

export const GetChats = async (
  receiverEmail: string,
  DaysAgo: number = 0,
  onLiveUpdate?: (data: Conversation | null) => void
): Promise<{ data: Conversation | null; unsubscribe?: Unsubscribe }> => {
  const senderEmail = auth.currentUser?.email;

  if (!senderEmail) {
    return { data: null };
  }

  const date = new Date();
  date.setDate(date.getDate() - DaysAgo);
  const formattedDate = date.toISOString().split("T")[0];
  const [first, last] = [receiverEmail, senderEmail].sort();
  const convoId = `${first}_${last}_${formattedDate}`;
  const storageKey = `${receiverEmail}_${formattedDate}`;
  const docRef = doc(db, "CONVERSATIONS", convoId);

  if (DaysAgo > 0) {
    try {
      const cached = await AsyncStorage.getItem(storageKey);
      if (cached) {
        const parsed = JSON.parse(cached) as Conversation;
        return { data: parsed };
      }
    } catch (err) {}

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const convo = docSnap.data() as Conversation;
        await AsyncStorage.setItem(storageKey, JSON.stringify(convo));

        return { data: convo };
      } else {
        return { data: null };
      }
    } catch (err) {
      return { data: null };
    }
  }

  let unsubscribe: Unsubscribe | undefined;

  try {
    unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        const convo = docSnap.data() as Conversation;
        await AsyncStorage.setItem(storageKey, JSON.stringify(convo));

        onLiveUpdate?.(convo);
      } else {
        onLiveUpdate?.(null);
      }
    });
  } catch (err) {}

  let initialData: Conversation | null = null;

  try {
    const initialSnap = await getDoc(docRef);
    if (initialSnap.exists()) {
      initialData = initialSnap.data() as Conversation;
    } else {
    }
  } catch (err) {}

  if (initialData) {
    try {
      await runTransaction(db, async (transaction) => {
        const userdocref = doc(db, "USERS", senderEmail);
        const recieverdocref = doc(db, "USERS", receiverEmail);
        // === ALL READS FIRST ===
        const convoSnap = await transaction.get(docRef);
        const userSnap = await transaction.get(userdocref);
        const receiverSnap = await transaction.get(recieverdocref);

        if (!convoSnap.exists()) {
          return;
        }
        if (!userSnap.exists() || !receiverSnap.exists()) {
          Alert.alert("Invalid USERS");
          return;
        }

        const convo = convoSnap.data() as Conversation;
        const userData = userSnap.data() as UserStructure;
        const receiverData = receiverSnap.data() as UserStructure;

        // === COMPUTE YOUR UPDATES ===
        const updatedMessages = convo.Messages.map((msg, index) => ({
          ...msg,
          Status:
            msg.Sender !== senderEmail && msg.Status === "Unread"
              ? "Read"
              : msg.Status,
        }));

        const hasMessageChanges = updatedMessages.some(
          (m, i) => m.Status !== convo.Messages[i].Status
        );

        const updatedUserPeople = userData.ConnectedPeople.map((p) => {
          if (p.Email === receiverEmail) {
            p.LastMsg.Status = "Read";
          }
          return p;
        });

        const updatedReceiverPeople = receiverData.ConnectedPeople.map((p) => {
          if (p.Email === senderEmail) {
            p.LastMsg.Status = "Read";
          }
          return p;
        });

        // === DO YOUR WRITES ===
        if (hasMessageChanges) {
          transaction.set(docRef, {
            ...convo,
            Messages: updatedMessages,
          } as Conversation);
        } else {
        }

        transaction.update(userdocref, {
          ...userData,
          ConnectedPeople: updatedUserPeople,
        });

        transaction.update(recieverdocref, {
          ...receiverData,
          ConnectedPeople: updatedReceiverPeople,
        });
      });
    } catch (err) {}
  }

  return { data: initialData, unsubscribe };
};
