import { doc, getDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "./firebasestart";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserStructure } from "@/types/user";

/**
 * Fetches user data with Firestore live sync.
 * Returns: { data, unsubscribe } if Firestore works
 * Falls back to AsyncStorage if Firestore fails.
 */
export const getUser = async (
  email: string,
  onLiveUpdate?: (user: UserStructure | null) => void
): Promise<{ data: UserStructure | null; unsubscribe?: Unsubscribe }> => {
  try {
    const docRef = doc(db, "USERS", email);

    // 🔁 Live sync
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        const freshData = docSnap.data() as UserStructure;
        await AsyncStorage.setItem("UserData", JSON.stringify(freshData));
        onLiveUpdate?.(freshData);
      } else {
        onLiveUpdate?.(null);
        Alert.alert("Error", "User not found in Firestore.");
      }
    });

    // 🔄 Initial fetch for immediate UI update
    const docSnap = await getDoc(docRef);
    const freshData = docSnap.exists()
      ? (docSnap.data() as UserStructure)
      : null;

    if (!freshData) {
      Alert.alert("Error", "User not found in Firestore.");
    } else {
      await AsyncStorage.setItem("UserData", JSON.stringify(freshData));
    }

    return { data: freshData, unsubscribe };
  } catch (error) {
    Alert.alert((error as Error).message);
  }

  // ⛔ Firestore failed: Try AsyncStorage
  try {
    const cached = await AsyncStorage.getItem("UserData");
    if (cached) {
      const user = JSON.parse(cached) as UserStructure;
      return { data: user };
    } else {
      Alert.alert("Offline", "No cached user data available.");
    }
  } catch (cacheError) {
    Alert.alert("Offline", (cacheError as Error).message);
  }

  return { data: null };
};

// Sample Use effect

// useEffect(() => {
//   let unsub: (() => void) | undefined;

//   const fetchUser = async () => {
//     const { data, unsubscribe } = await getUser("user@example.com", (liveUser) => {
//       setUser(liveUser);
//     });

//     if (data) setUser(data);
//     unsub = unsubscribe;
//   };

//   fetchUser();

//   return () => {
//     unsub?.(); // ✅ Stop Firestore listener on unmount
//   };
// }, []);
