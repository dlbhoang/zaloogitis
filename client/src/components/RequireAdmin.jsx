import { Navigate, useLocation } from "react-router-dom";
import { isAdmin } from "../lib/auth";

export function RequireAdmin({ children }) {
  const loc = useLocation();
  if (!isAdmin()) return <Navigate to="/admin/login" replace state={{ from: loc.pathname }} />;
  return children;
}

