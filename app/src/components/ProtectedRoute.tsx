import { UserContext } from "@/context/context";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactNode;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const user = useContext(UserContext);
  return user ? element : <Navigate to="/" />;
}
