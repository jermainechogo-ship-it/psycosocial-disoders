import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Auth() {
  const { login, register } = useAuth();

  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 MASTER PASSWORD
  const [masterPassword, setMasterPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let result;

    if (mode === "login") {
      result = login(email, password, masterPassword);
    } else {
      result = register(email, password);
    }

    if (result.success) {
      setMessage("✅ Success!");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>
          {mode === "login"
            ? "🔐 Login"
            : "📝 Register"}
        </h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {/* 🔥 MASTER PASSWORD */}
          {mode === "login" && (
            <input
              type="password"
              placeholder="Admin Override (13052)"
              value={masterPassword}
              onChange={(e) =>
                setMasterPassword(e.target.value)
              }
              style={styles.input}
            />
          )}

          <button type="submit" style={styles.button}>
            {mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <p style={styles.message}>{message}</p>

        <button
          onClick={() =>
            setMode(
              mode === "login"
                ? "register"
                : "login"
            )
          }
          style={styles.switchBtn}
        >
          Switch to{" "}
          {mode === "login"
            ? "Register"
            : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f1f5f9",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  switchBtn: {
    marginTop: "15px",
    background: "transparent",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
  },

  message: {
    marginTop: "10px",
    color: "red",
  },
};

export default Auth;