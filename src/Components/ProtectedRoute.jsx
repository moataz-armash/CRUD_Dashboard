// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuthContext();

  if (loading) return null; // or a spinner
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
