import { useUserContext } from "@/context/context";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactNode;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user } = useUserContext();
  return user ? element : <Navigate to="/" />;
}
