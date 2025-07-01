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

  console.log("🚩 [GetChats] Called with:", {
    receiverEmail,
    DaysAgo,
    senderEmail,
  });

  if (!senderEmail) {
    console.warn("🚫 [GetChats] No authenticated user");
    return { data: null };
  }

  const date = new Date();
  date.setDate(date.getDate() - DaysAgo);
  const formattedDate = date.toISOString().split("T")[0];

  const [first, last] = [receiverEmail, senderEmail].sort();
  const convoId = `${first}_${last}_${formattedDate}`;
  const storageKey = `${receiverEmail}_${formattedDate}`;
  const docRef = doc(db, "CONVERSATIONS", convoId);

  console.log("🗂️ [GetChats] Computed:", {
    convoId,
    formattedDate,
    storageKey,
  });

  // 👉 If fetching static data for past days
  if (DaysAgo > 0) {
    console.log("⏳ [GetChats] Past data mode. DaysAgo:", DaysAgo);

    const cached = await AsyncStorage.getItem(storageKey);
    console.log("💾 [GetChats] AsyncStorage result:", cached);

    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Conversation;
        console.log("✅ [GetChats] Returning cached conversation:", parsed);
        return { data: parsed };
      } catch (e) {
        console.warn("⚠️ [GetChats] Failed to parse cached chat:", e);
      }
    }

    console.log("🌐 [GetChats] Fetching from Firestore instead...");
    const docSnap = await getDoc(docRef);
    console.log("📄 [GetChats] Firestore snapshot exists:", docSnap.exists());

    if (docSnap.exists()) {
      const convo = docSnap.data() as Conversation;
      await AsyncStorage.setItem(storageKey, JSON.stringify(convo));
      console.log("✅ [GetChats] Returning Firestore conversation:", convo);
      return { data: convo };
    } else {
      console.log("🚫 [GetChats] Firestore doc does not exist");
      return { data: null };
    }
  }

  // 👉 Real-time mode
  console.log("🔴 [GetChats] Real-time updates mode");

  const unsubscribe = onSnapshot(docRef, async (docSnap) => {
    console.log(
      "📡 [GetChats] onSnapshot fired. Doc exists:",
      docSnap.exists()
    );
    if (docSnap.exists()) {
      const convo = docSnap.data() as Conversation;
      console.log("📡 [GetChats] onSnapshot data:", convo);
      await AsyncStorage.setItem(storageKey, JSON.stringify(convo));
      onLiveUpdate?.(convo);
    } else {
      console.log("📡 [GetChats] onSnapshot: doc does not exist");
      onLiveUpdate?.(null);
    }
  });

  console.log("⚡ [GetChats] Getting initial snapshot...");
  const initialSnap = await getDoc(docRef);
  console.log("⚡ [GetChats] Initial snapshot exists:", initialSnap.exists());

  const initialData = initialSnap.exists()
    ? (initialSnap.data() as Conversation)
    : null;

  console.log("⚡ [GetChats] Initial data:", initialData);

  if (initialData) {
    const updatedMessages = initialData.Messages.map((msg) => ({
      ...msg,
      Status: msg.Sender === receiverEmail ? "Read" : msg.Status,
    }));

    const hasChanges = updatedMessages.some(
      (m, i) => m.Status !== initialData.Messages[i].Status
    );

    console.log("🔍 [GetChats] Should update Statuses?", hasChanges);

    if (hasChanges) {
      console.log("📝 [GetChats] Updating Statuses in Firestore...");
      await setDoc(docRef, {
        ...initialData,
        Messages: updatedMessages,
      } satisfies Conversation);
    }
  }

  console.log("✅ [GetChats] Returning:", { data: initialData });
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
