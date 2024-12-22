import { useContext } from "react";
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <></>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
