import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: string | null;
  element: ReactNode;
}

export function ProtectedRoute({ user, element }: ProtectedRouteProps) {
  return user ? element : <Navigate to="/" />;
}
