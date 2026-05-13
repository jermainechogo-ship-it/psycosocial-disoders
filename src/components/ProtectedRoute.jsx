import React from "react";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <h2 style={{ padding: "20px" }}>🔐 Please login first</h2>;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <h2 style={{ padding: "20px" }}>
        🚫 Access denied for role: {user.role}
      </h2>
    );
  }

  return children;
}

export default ProtectedRoute;