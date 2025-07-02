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

export const GetChats = async (
  receiverEmail: string,
  DaysAgo: number = 0,
  onLiveUpdate?: (data: Conversation | null) => void
): Promise<{ data: Conversation | null; unsubscribe?: Unsubscribe }> => {
  const senderEmail = auth.currentUser?.email;

  if (!senderEmail || senderEmail === undefined) {
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
    const cached = await AsyncStorage.getItem(storageKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Conversation;
        return { data: parsed };
      } catch {}
    }

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const convo = docSnap.data() as Conversation;
      await AsyncStorage.setItem(storageKey, JSON.stringify(convo));
      return { data: convo };
    } else {
      return { data: null };
    }
  }

  const unsubscribe = onSnapshot(docRef, async (docSnap) => {
    if (docSnap.exists()) {
      const convo = docSnap.data() as Conversation;
      await AsyncStorage.setItem(storageKey, JSON.stringify(convo));
      onLiveUpdate?.(convo);
    } else {
      onLiveUpdate?.(null);
    }
  });

  const initialSnap = await getDoc(docRef);
  const initialData = initialSnap.exists()
    ? (initialSnap.data() as Conversation)
    : null;

  if (initialData) {
    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(docRef);
      if (!snap.exists()) return;

      const freshData = snap.data() as Conversation;

      const updatedMessages = freshData.Messages.map((msg) => ({
        ...msg,
        Status:
          msg.Sender !== senderEmail && msg.Status === "Unread"
            ? "Read"
            : msg.Status,
      }));

      const hasChanges = updatedMessages.some(
        (m, i) => m.Status !== freshData.Messages[i].Status
      );

      if (hasChanges) {
        transaction.set(docRef, {
          ...freshData,
          Messages: updatedMessages,
        } as Conversation);
      }
    });
  }

  return { data: initialData, unsubscribe };
};
