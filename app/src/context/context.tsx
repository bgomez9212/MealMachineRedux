import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";

interface UserContextType {
  user: string | null;
  loading: boolean;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUser(uid);
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return userContext;
}
