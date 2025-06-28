import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebasestart";
import { Alert } from "react-native";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { UserStructure } from "@/types/user";

export const Signup = async (
  Email: string,
  password: string,
  Bio: string,
  Firstname: string,
  Lastname: string
): Promise<boolean> => {
  try {
    // 1. Try to create Firebase Auth user
    const userCred = await createUserWithEmailAndPassword(
      auth,
      Email,
      password
    );

    // 2. Prepare user data
    const now = new Date();
    const userData: UserStructure = {
      Name: `${Firstname.toLowerCase()} ${Lastname.toLowerCase()}`,
      Email,
      Bio,
      ConnectedPeople: [],
      CreatedAt: Timestamp.fromDate(now),
    };

    // 3. Store user data in Firestore
    await setDoc(doc(db, "USERS", Email), userData);

    return true;
  } catch (err) {
    const message = (err as Error).message;
    Alert.alert("Signup failed", message);
    return false;
  }
};

export const validateSignup = (
  Firstname: string,
  Lastname: string,
  Email: string,
  password: string,
  confirmPassword: string,
  Bio: string
): { valid: boolean; error?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(Email)) {
    return { valid: false, error: "Invalid email address" };
  }

  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }

  if (!Firstname.trim()) {
    return { valid: false, error: "First name cannot be empty" };
  }

  if (!Lastname.trim()) {
    return { valid: false, error: "Last name cannot be empty" };
  }
  if (password !== confirmPassword) {
    return { valid: false, error: "Passwords dont match" };
  }

  if (Bio.length > 0 && Bio.length < 10) {
    return {
      valid: false,
      error: "Bio must be at least 10 characters or leave it empty",
    };
  }

  return { valid: true };
};
