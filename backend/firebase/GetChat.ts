import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  Unsubscribe,
} from "firebase/firestore";
import { auth, db } from "./firebasestart";
import { Conversation } from "@/types/conversations";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetChats = async (
  receiverEmail: string,
  DaysAgo: number = 0,
  onLiveUpdate?: (data: Conversation | null) => void
): Promise<{ data: Conversation | null; unsubscribe?: Unsubscribe }> => {
  
  const senderEmail = auth.currentUser?.email;
  if (!senderEmail) {
    console.warn("No authenticated user");
    return { data: null };
  }

  const date = new Date();
  date.setDate(date.getDate() - DaysAgo);
  const formattedDate = date.toISOString().split("T")[0];

  const [first, last] = [receiverEmail, senderEmail].sort();
  const convoId = `${first}_${last}_${formattedDate}`;
  const storageKey = `${receiverEmail}_${formattedDate}`;
  const docRef = doc(db, "CONVERSATIONS", convoId);

  // Static past data
  if (DaysAgo > 0) {
    const cached = await AsyncStorage.getItem(storageKey);
    if (cached) {
      try {
        return { data: JSON.parse(cached) as Conversation };
      } catch (e) {
        console.warn("Failed to parse cached chat", e);
      }
    }

    // Fallback: fetch from Firestore and store in AsyncStorage
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const convo = docSnap.data() as Conversation;
      await AsyncStorage.setItem(storageKey, JSON.stringify(convo));
      return { data: convo };
    }

    return { data: null };
  }

  // Live updates
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
    const updatedMessages = initialData.Messages.map((msg) => ({
      ...msg,
      Status: msg.Sender === receiverEmail ? "Read" : msg.Status,
    }));

    const hasChanges = updatedMessages.some(
      (m, i) => m.Status !== initialData.Messages[i].Status
    );

    if (hasChanges) {
      await setDoc(docRef, {
        ...initialData,
        Messages: updatedMessages,
      } satisfies Conversation);
    }
  }

  return { data: initialData, unsubscribe };
};

// Sample Use

// useEffect(() => {
//   let unsub: (() => void) | undefined;

//   const setup = async () => {
//     const { data, unsubscribe } = await GetChats("someone@email.com", 0, (liveData) => {
//       setChat(liveData);
//     });

//     unsub = unsubscribe;
//   };

//   setup();

//   return () => {
//     unsub?.(); // ✅ stops onSnapshot when screen unmounts
//   };
// }, []);
