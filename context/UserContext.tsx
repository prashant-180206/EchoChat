import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserStructure } from "@/types/user";
import { getUser } from "@/backend/firebase/User";
import { auth } from "@/backend/firebase/firebasestart";

interface UserContextType {
  user: UserStructure | null;
  setUser: React.Dispatch<React.SetStateAction<UserStructure | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserStructure | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser?.email) {
        setUser(null);
        setLoading(false);

        if (unsubscribeUser) unsubscribeUser();
        return;
      }

      const { data, unsubscribe } = await getUser(
        firebaseUser.email,
        (liveUser) => {
          setUser(liveUser);
        }
      );

      unsubscribeUser = unsubscribe;

      if (data) setUser(data);

      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, []);

  if (loading) {
    return null; // Or splash screen
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
