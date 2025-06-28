import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebasestart";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Login and save credentials
export const Login = async (email: string, password: string): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem(
      "LoginCredentials",
      JSON.stringify({ email, password })
    );
    return true;
  } catch (err) {
    Alert.alert("Login failed", (err as Error).message);
    return false;
  }
};

// Try login from cache
export const StartApp = async (): Promise<boolean> => {
  const cached = await AsyncStorage.getItem("LoginCredentials");

  if (cached) {
    const { email, password } = JSON.parse(cached);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      console.warn("Auto-login failed", err);
    }
  }

  return false;
};
