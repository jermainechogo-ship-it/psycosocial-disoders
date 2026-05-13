import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("user");

  // 🔐 SINGLE MASTER PASSWORD
  const MASTER_PASSWORD = "13052";

  const changeRole = (newRole, password = "") => {
    // 👤 user role is always open
    if (newRole === "user") {
      setRole("user");
      return { success: true };
    }

    // 🔐 protect admin + counselor with same password
    if (password !== MASTER_PASSWORD) {
      return { success: false, message: "Wrong password" };
    }

    setRole(newRole);
    return { success: true };
  };

  return (
    <RoleContext.Provider value={{ role, changeRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);