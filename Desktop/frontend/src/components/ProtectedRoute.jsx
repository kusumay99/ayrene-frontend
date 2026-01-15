// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  console.log("ProtectedRoute:", { token, storedRole, role });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && storedRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
