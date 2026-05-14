import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const counselors = [
  {
    name: "Dr. Sarah Kim",
    specialty: "Anxiety & Depression",
    status: "Available",
    experience: "8 Years",
    email: "sarah@mindspace.com",
  },
  {
    name: "Dr. James Mwangi",
    specialty: "Trauma & PTSD",
    status: "Online",
    experience: "10 Years",
    email: "james@mindspace.com",
  },
  {
    name: "Dr. Elena Cruz",
    specialty: "Youth Mental Health",
    status: "Busy",
    experience: "6 Years",
    email: "elena@mindspace.com",
  },

  // 🔥 NEW WORKPLACE SPECIALISTS
  {
    name: "Dr. Kevin Otieno",
    specialty: "Work Burnout & Stress",
    status: "Available",
    experience: "12 Years",
    email: "kevin@mindspace.com",
  },
  {
    name: "Dr. Maria Lopez",
    specialty: "Employee Wellness",
    status: "Online",
    experience: "9 Years",
    email: "maria@mindspace.com",
  },
];

function Counselors() {
  const { user } = useAuth();

  const [message, setMessage] = useState("");

  // 🔥 REQUEST SESSION
  const requestSession = (counselor) => {
    // 🔒 USER MUST LOGIN FIRST
    if (!user) {
      setMessage("🔐 Please login first to request a counseling session.");
      return;
    }

    // 📦 STORE REQUEST
    const requests =
      JSON.parse(localStorage.getItem("sessionRequests")) || [];

    const newRequest = {
      id: Date.now(),
      user: user.email,
      counselor: counselor.name,
      status: "pending",
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "sessionRequests",
      JSON.stringify([newRequest, ...requests])
    );

    // ✅ SMALL MESSAGE BOX
    setMessage(
      `📨 Call request sent successfully to ${counselor.name}`
    );

    // ⏳ AUTO REMOVE MESSAGE
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          🧠 Employee Psychosocial Support Team
        </h1>

        <p style={styles.subtitle}>
          Connect with licensed counselors for emotional wellness,
          workplace stress management, burnout recovery, and mental
          health support.
        </p>
      </div>

      {/* 🔔 MESSAGE BOX */}
      {message && (
        <div style={styles.messageBox}>
          {message}
        </div>
      )}

      {/* STATS */}
      <div style={styles.statsGrid}>
        <div style={styles.statsCard}>
          <h2>{counselors.length}</h2>
          <p>Available Specialists</p>
        </div>

        <div style={styles.statsCard}>
          <h2>
            {
              counselors.filter(
                (c) =>
                  c.status === "Available" ||
                  c.status === "Online"
              ).length
            }
          </h2>
          <p>Ready For Support</p>
        </div>

        <div style={styles.statsCard}>
          <h2>24/7</h2>
          <p>Support Access</p>
        </div>
      </div>

      {/* COUNSELORS */}
      <div style={styles.grid}>
        {counselors.map((c, i) => (
          <div key={i} style={styles.card}>
            {/* STATUS BADGE */}
            <div
              style={{
                ...styles.badge,
                background:
                  c.status === "Busy"
                    ? "#ef4444"
                    : "#22c55e",
              }}
            >
              {c.status}
            </div>

            <div style={styles.avatar}>
              {c.name.charAt(4)}
            </div>

            <h3>{c.name}</h3>

            <p style={styles.specialty}>
              {c.specialty}
            </p>

            <div style={styles.info}>
              <p>
                <b>Experience:</b> {c.experience}
              </p>

              <p>
                <b>Contact:</b> {c.email}
              </p>
            </div>

            {/* SKILLS */}
            <div style={styles.skills}>
              <span>🧘 Wellness</span>
              <span>💼 Workplace Care</span>
              <span>🧠 Mental Health</span>
            </div>

            {/* BUTTON */}
            <button
              style={styles.button}
              onClick={() => requestSession(c)}
            >
              📞 Request Session
            </button>
          </div>
        ))}
      </div>

      {/* EXTRA INFO SECTION */}
      <div style={styles.supportSection}>
        <h2>🌱 Why Reach Out?</h2>

        <div style={styles.supportGrid}>
          <div style={styles.supportCard}>
            <h3>🔥 Burnout Recovery</h3>
            <p>
              Learn coping strategies for work fatigue,
              emotional exhaustion, and chronic stress.
            </p>
          </div>

          <div style={styles.supportCard}>
            <h3>🤝 Confidential Support</h3>
            <p>
              All conversations remain private and focused
              on employee wellbeing.
            </p>
          </div>

          <div style={styles.supportCard}>
            <h3>⚡ Early Intervention</h3>
            <p>
              Address psychosocial risks before they affect
              productivity and personal wellbeing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  hero: {
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
    color: "white",
    padding: "50px 20px",
    borderRadius: "18px",
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },

  subtitle: {
    maxWidth: "700px",
    margin: "auto",
    opacity: 0.9,
    lineHeight: "1.6",
  },

  messageBox: {
    background: "#dcfce7",
    color: "#166534",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #86efac",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statsCard: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    position: "relative",
    transition: "0.3s",
  },

  badge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: "white",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  avatar: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },

  specialty: {
    color: "#2563eb",
    fontWeight: "bold",
  },

  info: {
    marginTop: "12px",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "15px",
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },

  supportSection: {
    marginTop: "50px",
  },

  supportGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  supportCard: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
};

export default Counselors;