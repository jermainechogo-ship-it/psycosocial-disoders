import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const counselors = [
  {
    name: "Dr. Sarah Kim",
    specialty: "Anxiety & Depression",
    status: "Available",
    experience: "8 Years",
    email: "sarah@mindspace.com",
    rating: 4.9,
    sessions: 420,
    focus: ["Stress", "Anxiety", "Burnout"],
  },
  {
    name: "Dr. James Mwangi",
    specialty: "Trauma & PTSD",
    status: "Online",
    experience: "10 Years",
    email: "james@mindspace.com",
    rating: 4.8,
    sessions: 510,
    focus: ["Trauma", "PTSD", "Recovery"],
  },
  {
    name: "Dr. Elena Cruz",
    specialty: "Youth Mental Health",
    status: "Busy",
    experience: "6 Years",
    email: "elena@mindspace.com",
    rating: 4.7,
    sessions: 300,
    focus: ["Youth Care", "Counseling", "Confidence"],
  },

  // 🔥 WORKPLACE SPECIALISTS
  {
    name: "Dr. Kevin Otieno",
    specialty: "Work Burnout & Stress",
    status: "Available",
    experience: "12 Years",
    email: "kevin@mindspace.com",
    rating: 5.0,
    sessions: 720,
    focus: ["Burnout", "Work Stress", "Fatigue"],
  },
  {
    name: "Dr. Maria Lopez",
    specialty: "Employee Wellness",
    status: "Online",
    experience: "9 Years",
    email: "maria@mindspace.com",
    rating: 4.9,
    sessions: 460,
    focus: ["Employee Care", "Wellness", "Mental Recovery"],
  },
];

function Counselors() {
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState(null);

  // 🔥 LOAD FAVORITES
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("favoriteCounselors")) || [];

    setFavorites(saved);
  }, []);

  // 💾 SAVE FAVORITES
  useEffect(() => {
    localStorage.setItem(
      "favoriteCounselors",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // 🔥 REQUEST SESSION
  const requestSession = (counselor) => {
    if (!user) {
      setMessage(
        "🔐 Please login first to request a counseling session."
      );
      return;
    }

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

    setMessage(
      `📨 Call request sent successfully to ${counselor.name}`
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // ⭐ FAVORITES SYSTEM
  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(
        favorites.filter((f) => f !== name)
      );
    } else {
      setFavorites([...favorites, name]);
    }
  };

  // 🔍 SEARCH + FILTER
  const filteredCounselors = counselors.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.specialty
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : c.status.toLowerCase() === filter;

    return matchesSearch && matchesFilter;
  });

  // 📊 STATS
  const availableCount = counselors.filter(
    (c) =>
      c.status === "Available" ||
      c.status === "Online"
  ).length;

  const avgRating =
    (
      counselors.reduce(
        (a, b) => a + b.rating,
        0
      ) / counselors.length
    ).toFixed(1);

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroGlow}></div>

        <h1 style={styles.title}>
          🧠 Employee Psychosocial Support Team
        </h1>

        <p style={styles.subtitle}>
          A calm harbor in the middle of corporate turbulence.
          Connect with specialists trained in workplace
          stress, burnout recovery, emotional resilience,
          trauma care, and employee wellness.
        </p>

        <div style={styles.heroStats}>
          <div style={styles.heroStatCard}>
            <h2>{counselors.length}</h2>
            <p>Licensed Specialists</p>
          </div>

          <div style={styles.heroStatCard}>
            <h2>{availableCount}</h2>
            <p>Ready For Support</p>
          </div>

          <div style={styles.heroStatCard}>
            <h2>{avgRating} ⭐</h2>
            <p>Average Satisfaction</p>
          </div>
        </div>
      </div>

      {/* 🔔 MESSAGE */}
      {message && (
        <div style={styles.messageBox}>
          {message}
        </div>
      )}

      {/* 🔍 SEARCH AREA */}
      <div style={styles.searchSection}>
        <input
          type="text"
          placeholder="Search counselors or specialties..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.searchInput}
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          style={styles.filterSelect}
        >
          <option value="all">
            All Statuses
          </option>

          <option value="available">
            Available
          </option>

          <option value="online">
            Online
          </option>

          <option value="busy">
            Busy
          </option>
        </select>
      </div>

      {/* COUNSELORS */}
      <div style={styles.grid}>
        {filteredCounselors.map((c, i) => (
          <div
            key={i}
            style={styles.card}
            onMouseEnter={() =>
              setSelectedCounselor(c.name)
            }
            onMouseLeave={() =>
              setSelectedCounselor(null)
            }
          >
            {/* STATUS */}
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

            {/* FAVORITE */}
            <button
              style={{
                ...styles.favoriteBtn,
                color: favorites.includes(c.name)
                  ? "#f59e0b"
                  : "#94a3b8",
              }}
              onClick={() =>
                toggleFavorite(c.name)
              }
            >
              ★
            </button>

            {/* AVATAR */}
            <div style={styles.avatar}>
              {c.name.charAt(4)}
            </div>

            <h3>{c.name}</h3>

            <p style={styles.specialty}>
              {c.specialty}
            </p>

            {/* EXPERIENCE */}
            <div style={styles.info}>
              <p>
                <b>Experience:</b>{" "}
                {c.experience}
              </p>

              <p>
                <b>Contact:</b> {c.email}
              </p>

              <p>
                <b>Sessions:</b>{" "}
                {c.sessions}+
              </p>

              <p>
                <b>Rating:</b> ⭐ {c.rating}
              </p>
            </div>

            {/* SKILLS */}
            <div style={styles.skills}>
              {c.focus.map((skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              ))}
            </div>

            {/* LIVE INDICATOR */}
            {selectedCounselor === c.name && (
              <div style={styles.liveIndicator}>
                🟢 Active Support Window Open
              </div>
            )}

            {/* ACTIONS */}
            <div style={styles.buttonGroup}>
              <button
                style={styles.button}
                onClick={() =>
                  requestSession(c)
                }
              >
                📞 Request Session
              </button>

              <button
                style={styles.secondaryBtn}
              >
                💬 Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAVORITES SECTION */}
      {favorites.length > 0 && (
        <div style={styles.favoriteSection}>
          <h2>
            ⭐ Your Preferred Counselors
          </h2>

          <div style={styles.favoriteList}>
            {favorites.map((f, index) => (
              <div
                key={index}
                style={styles.favoriteCard}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUPPORT SECTION */}
      <div style={styles.supportSection}>
        <h2>
          🌱 Workplace Wellness Programs
        </h2>

        <div style={styles.supportGrid}>
          <div style={styles.supportCard}>
            <h3>🔥 Burnout Recovery</h3>

            <p>
              Structured recovery plans for
              emotional exhaustion, fatigue,
              workplace pressure, and chronic
              stress accumulation.
            </p>
          </div>

          <div style={styles.supportCard}>
            <h3>🤝 Confidential Support</h3>

            <p>
              Every session remains private,
              secure, and employee-focused.
              Your conversations stay inside
              the vault.
            </p>
          </div>

          <div style={styles.supportCard}>
            <h3>⚡ Early Intervention</h3>

            <p>
              Detect psychosocial risks before
              they evolve into productivity
              crashes or long-term emotional
              strain.
            </p>
          </div>

          {/* 🔥 NEW */}
          <div style={styles.supportCard}>
            <h3>💼 Corporate Resilience</h3>

            <p>
              Learn emotional resilience
              strategies to navigate demanding
              workloads, deadlines, and team
              pressure.
            </p>
          </div>

          {/* 🔥 NEW */}
          <div style={styles.supportCard}>
            <h3>🌙 Sleep & Recovery</h3>

            <p>
              Address insomnia, fatigue, and
              irregular recovery cycles caused
              by workplace stress patterns.
            </p>
          </div>

          {/* 🔥 NEW */}
          <div style={styles.supportCard}>
            <h3>🧩 Emotional Balance</h3>

            <p>
              Rebuild focus, confidence, and
              emotional clarity through guided
              psychosocial support programs.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <h3>
          🧠 “Healthy employees build healthy
          workplaces.”
        </h3>

        <p>
          MindSpace Support Network • Employee
          Wellness Division
        </p>
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
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a,#2563eb)",
    color: "white",
    padding: "60px 25px",
    borderRadius: "22px",
    textAlign: "center",
    marginBottom: "30px",
    position: "relative",
    overflow: "hidden",
  },

  heroGlow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    top: "-120px",
    right: "-100px",
  },

  title: {
    fontSize: "2.8rem",
    marginBottom: "10px",
    position: "relative",
    zIndex: 2,
  },

  subtitle: {
    maxWidth: "800px",
    margin: "auto",
    opacity: 0.9,
    lineHeight: "1.7",
    position: "relative",
    zIndex: 2,
  },

  heroStats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    marginTop: "35px",
    position: "relative",
    zIndex: 2,
  },

  heroStatCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
  },

  messageBox: {
    background: "#dcfce7",
    color: "#166534",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #86efac",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  searchSection: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  searchInput: {
    flex: 1,
    minWidth: "250px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
  },

  filterSelect: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    minWidth: "180px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "22px",
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.08)",
    position: "relative",
    transition: "0.3s",
    border: "1px solid #e2e8f0",
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

  favoriteBtn: {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
  },

  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
    boxShadow:
      "0 6px 15px rgba(37,99,235,0.3)",
  },

  specialty: {
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  info: {
    marginTop: "12px",
    fontSize: "14px",
    lineHeight: "1.8",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "16px",
  },

  liveIndicator: {
    marginTop: "15px",
    background: "#dcfce7",
    color: "#166534",
    padding: "10px",
    borderRadius: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  button: {
    flex: 1,
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  secondaryBtn: {
    flex: 1,
    padding: "12px",
    background: "#e2e8f0",
    color: "#0f172a",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  favoriteSection: {
    marginTop: "45px",
  },

  favoriteList: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "15px",
  },

  favoriteCard: {
    background: "#fef3c7",
    padding: "12px 18px",
    borderRadius: "999px",
    fontWeight: "bold",
    color: "#92400e",
  },

  supportSection: {
    marginTop: "60px",
  },

  supportGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  supportCard: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    boxShadow:
      "0 6px 14px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #2563eb",
  },

  footer: {
    marginTop: "60px",
    textAlign: "center",
    padding: "30px",
    background: "#0f172a",
    color: "white",
    borderRadius: "18px",
  },
};

export default Counselors;