import { auth } from "@/firebase";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { type Groceries } from "../types";

interface GroceryContextType {
  groceries: Groceries[];
  isGroceryLoading: boolean;
  isGroceryError: boolean;
}
const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

export default function GroceryContextProvider({
  children,
}: {
  children: any;
}) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  });

  const {
    data: groceries,
    isLoading: isGroceryLoading,
    isError: isGroceryError,
  } = useQuery({
    queryKey: ["groceries"],
    queryFn: async () =>
      axios
        .get(import.meta.env.VITE_server_groceries, {
          params: {
            user_id: user,
          },
        })
        .then((res) => {
          return res.data;
        }),
    enabled: !!user,
  });

  return (
    <GroceryContext.Provider
      value={{
        groceries,
        isGroceryLoading,
        isGroceryError,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
}

export function useGroceryContext() {
  const groceryContext = useContext(GroceryContext);
  if (!groceryContext) {
    throw new Error(
      "useGroceryContext must be used within a GroceryContextProvider"
    );
  }
  return groceryContext;
}
