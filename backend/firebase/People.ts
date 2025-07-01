import { people, UserStructure } from "@/types/user";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebasestart";
import { Message } from "@/types/conversations";
import { Alert } from "react-native";

export const SearchPeople = async (key: string): Promise<UserStructure[]> => {
  const usersRef = collection(db, "USERS");

  key = key.trim();

  const uidQuery = query(
    usersRef,
    where("uid", ">=", key.toLowerCase()),
    where("uid", "<=", key.toLowerCase() + "\uf8ff"),
    limit(10)
  );

  const nameQuery = query(
    usersRef,
    where("Name", ">=", key.toLowerCase()),
    where("Name", "<=", key.toLowerCase() + "\uf8ff"),
    limit(10)
  );

  const [uidSnap, nameSnap] = await Promise.all([
    getDocs(uidQuery),
    getDocs(nameQuery),
  ]);

  // Use Map to deduplicate by document ID
  const resultsMap = new Map<string, UserStructure>();

  uidSnap.forEach((doc) => {
    resultsMap.set(doc.id, doc.data() as UserStructure);
  });

  nameSnap.forEach((doc) => {
    resultsMap.set(doc.id, doc.data() as UserStructure);
  });

  // Convert to array and limit to 10 if needed
  const finalResults = Array.from(resultsMap.values());

  return finalResults;
};

export const Add_people = async (
  toadd: UserStructure,
  currentUser: UserStructure
): Promise<boolean> => {
  if (!currentUser || !toadd) return false;

  const convertUserToPeople = (
    other: UserStructure,
    lastMessage: Message = {
      Content: "Start Chat To See",
      Time: new Date().toLocaleTimeString(),
      Sender: currentUser.Email,
      Status: "Read",
    }
  ): people => {
    const person: people = {
      Email: other.Email,
      Name: other.Name,
      LastMsg: lastMessage,
      Read: "Read",
    };

    if (other.ProfilePicUrl) {
      person.profileUrl = other.ProfilePicUrl;
    }

    return person;
  };

  const toaddDocRef = doc(db, "USERS", toadd.Email);
  const currentUserDocRef = doc(db, "USERS", currentUser.Email);

  // Check for duplicates using provided objects
  const toaddAlreadyHasUser = toadd.ConnectedPeople?.some(
    (p) => p.Email === currentUser.Email
  );
  const userAlreadyHasToadd = currentUser.ConnectedPeople?.some(
    (p) => p.Email === toadd.Email
  );

  const updatedToaddPeople = toaddAlreadyHasUser
    ? toadd.ConnectedPeople
    : [...(toadd.ConnectedPeople || []), convertUserToPeople(currentUser)];

  const updatedCurrentUserPeople = userAlreadyHasToadd
    ? currentUser.ConnectedPeople
    : [...(currentUser.ConnectedPeople || []), convertUserToPeople(toadd)];

  try {
    await Promise.all([
      updateDoc(toaddDocRef, { ConnectedPeople: updatedToaddPeople }),
      updateDoc(currentUserDocRef, {
        ConnectedPeople: updatedCurrentUserPeople,
      }),
    ]);
    return true;
  } catch (error) {
    Alert.alert("ftghjjnn", (error as Error).message);
    return false;
  }
};
