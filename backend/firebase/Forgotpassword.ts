import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebasestart"; // already initialized instance
import { Alert } from "react-native";

const isEmailRegistered = async (email: string): Promise<boolean> => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

export const SendPasswordResetLink = async (
  email: string
): Promise<boolean> => {
  const valid = await isEmailRegistered(email);

  if (!valid) {
    return false;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    Alert.alert(
      "Error sending password reset email:",
      (error as Error).message
    );
    return false;
  }
};
