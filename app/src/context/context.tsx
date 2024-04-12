import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";

interface UserContextType {
  user: string | undefined;
  loading: boolean;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({
  children,
  testUser,
}: {
  children: any;
  testUser?: string | undefined;
}) {
  const [user, setUser] = useState<string | undefined>(testUser);
  const [loading, setLoading] = useState<boolean>(Boolean(!testUser));

  if (!testUser) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(uid);
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });
  }
  console.log(loading);

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
