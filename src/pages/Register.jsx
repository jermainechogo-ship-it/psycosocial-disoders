import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { register } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("⚠ Please enter a valid email.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      register(email);

      // 🧠 store enhanced user profile
      const userProfile = {
        email,
        role,
        createdAt: new Date().toLocaleString(),
        onboardingComplete: true,
      };

      localStorage.setItem("user", JSON.stringify(userProfile));

      setLoading(false);
      setMessage("✅ Account created successfully! Welcome to MindSpace.");

      setEmail("");
      setRole("user");

      setTimeout(() => setMessage(""), 3000);
    }, 900);
  };

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <h1>🧠 MindSpace Onboarding Portal</h1>
        <p>
          Create your account to access psychosocial support, counseling,
          assessments, and wellness tools.
        </p>
      </div>

      {/* MESSAGE */}
      {message && <div style={styles.messageBox}>{message}</div>}

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Email Address</label>

        <input
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label>Select Role</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="user">Employee / User</option>
          <option value="counselor">Counselor</option>
          <option value="admin">HR Admin</option>
        </select>

        {/* 🧠 onboarding insight panel */}
        <div style={styles.infoBox}>
          <p>🔐 Your data is confidential</p>
          <p>🧠 Used only for wellness support</p>
          <p>⚡ Instant access to mental health tools</p>
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* FOOTER INSIGHT */}
      <div style={styles.footer}>
        <p>💙 Supporting mental wellness in the workplace</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  hero: {
    background: "linear-gradient(135deg,#1e3a8a,#2563eb,#0ea5e9)",
    color: "white",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "20px",
    textAlign: "center",
  },

  messageBox: {
    background: "#dcfce7",
    color: "#166534",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },

  form: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  infoBox: {
    background: "#eff6ff",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "13px",
    color: "#1e3a8a",
  },

  footer: {
    marginTop: "20px",
    textAlign: "center",
    opacity: 0.7,
  },
};

export default Register;