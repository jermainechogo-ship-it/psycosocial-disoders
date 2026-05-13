import React, {
  createContext,
  useContext,
  useState,
} from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 👤 ACTIVE SESSION
  const [user, setUser] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("user")
      ) || null
    );
  });

  // 💾 LOAD SAVED USERS
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem(
      "registeredUsers"
    );

    // 🧠 DEFAULT SYSTEM USERS
    const defaultUsers = [
      {
        email: "john@email.com",
        password: "123",
        role: "user",
      },

      {
        email: "anna@email.com",
        password: "456",
        role: "counselor",
      },

      {
        email: "admin@email.com",
        password: "999",
        role: "admin",
      },
    ];

    return savedUsers
      ? JSON.parse(savedUsers)
      : defaultUsers;
  });

  // 🔐 LOGIN
  const login = (
    email,
    password,
    masterPassword = ""
  ) => {
    const foundUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    let role = foundUser.role;

    // 👑 MASTER OVERRIDE
    if (masterPassword === "13052") {
      role = "admin";
    }

    const sessionUser = {
      email: foundUser.email,
      role,
    };

    setUser(sessionUser);

    localStorage.setItem(
      "user",
      JSON.stringify(sessionUser)
    );

    return { success: true };
  };

  // 🆕 REGISTER
  const register = (email, password) => {
    // 🚫 prevent duplicates
    const exists = users.find(
      (u) => u.email === email
    );

    if (exists) {
      return {
        success: false,
        message:
          "User already exists",
      };
    }

    const newUser = {
      email,
      password,
      role: "user",
    };

    const updatedUsers = [
      ...users,
      newUser,
    ];

    // 💾 SAVE USERS
    setUsers(updatedUsers);

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );

    // 🔓 AUTO LOGIN
    const sessionUser = {
      email,
      role: "user",
    };

    setUser(sessionUser);

    localStorage.setItem(
      "user",
      JSON.stringify(sessionUser)
    );

    return { success: true };
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);