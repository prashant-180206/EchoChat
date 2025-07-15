import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  startAfter,
  Unsubscribe,
} from "firebase/firestore";
import { auth, db } from "./firebasestart";
import { Conversation } from "@/types/conversations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserStructure } from "@/types/user";
import { Alert } from "react-native";

export const GetChats = async (
  receiverEmail: string,
  lastDate: string = "",
  onLiveUpdate?: (data: Conversation | null) => void
): Promise<{ data: Conversation | null; unsubscribe?: Unsubscribe }> => {
  const senderEmail = auth.currentUser?.email;

  if (!senderEmail) {
    return { data: null };
  }

  const formattedDate = new Date().toISOString().split("T")[0];

  const [first, last] = [receiverEmail, senderEmail].sort();
  // const convoId = `${first}_${last}/${formattedDate}`;
  let storageKey = `${receiverEmail}_${formattedDate}`;
  const docRef = doc(
    db,
    "CONVERSATIONS",
    `${first}_${last}`,
    "MESSAGES",
    formattedDate
  );

  if (lastDate !== "") {
    const knownDatesKey = `knownDates_${first}_${last}`;
    let storageKey = `${receiverEmail}_${lastDate}`;

    // 1️⃣ Try cache first
    try {
      const cached = await AsyncStorage.getItem(storageKey);
      if (cached) {
        const parsed = JSON.parse(cached) as Conversation;
        return { data: parsed };
      }
    } catch (err) {
      console.warn("AsyncStorage getItem error:", err);
    }

    // 2️⃣ If cache miss → Firestore query
    try {
      const q = query(
        collection(db, "CONVERSATIONS", `${first}_${last}`, "MESSAGES"),
        orderBy("uid", "desc"),
        startAfter(lastDate),
        limit(1)
      );

      const docSnap = await getDocs(q);
      if (!docSnap.empty) {
        const convoDoc = docSnap.docs[0];
        const convo = convoDoc.data() as Conversation;

        // Update correct storage key with new doc ID
        storageKey = `${receiverEmail}_${convoDoc.id}`;
        await AsyncStorage.setItem(storageKey, JSON.stringify(convo));

        // ✅ 3️⃣ Update local knownDates list
        const knownDatesRaw = await AsyncStorage.getItem(knownDatesKey);
        let knownDates: string[] = knownDatesRaw
          ? JSON.parse(knownDatesRaw)
          : [];

        if (!knownDates.includes(convoDoc.id)) {
          knownDates.push(convoDoc.id);
          knownDates.sort().reverse(); // newest → oldest
          await AsyncStorage.setItem(knownDatesKey, JSON.stringify(knownDates));
        }

        return { data: convo };
      } else {
        return { data: null };
      }
    } catch (err) {
      console.warn("Firestore query error:", err);
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
