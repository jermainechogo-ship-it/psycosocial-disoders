import React from "react";
import { Link } from "react-router-dom";
import disorders from "../data/disorders";

function Home() {
  // simulate "most searched" (later you can make it dynamic)
  const trending = ["depression", "anxiety", "ptsd"];

  const featured = disorders.filter((d) =>
    trending.includes(d.id)
  );

  // 📊 LIVE CHATBOT LOGS (NEW UPGRADE)
  const logs = JSON.parse(localStorage.getItem("logs") || "[]");

  const countSeverity = (type) =>
    logs.filter((l) => l.severity === type).length;

  const getSeverity = (d) => {
    const highRisk = ["ptsd", "schizophrenia", "bpd", "bipolar"];
    const mediumRisk = ["anxiety", "panic", "ocd", "adhd"];

    if (highRisk.includes(d.id)) return "high";
    if (mediumRisk.includes(d.id)) return "medium";
    return "low";
  };

  const severityColor = (level) => {
    if (level === "high") return "#ef4444";
    if (level === "medium") return "#f59e0b";
    return "#22c55e";
  };

  const severityLabel = (level) => {
    if (level === "high") return "Severe";
    if (level === "medium") return "Moderate";
    return "Mild";
  };

  return (
    <div style={styles.container}>

      {/* HERO SECTION (UPGRADED CTA ADDED) */}
      <section style={styles.hero}>
        <h1 style={styles.title}>
          Psychosocial Disorders Learning System
        </h1>

        <p style={styles.subtitle}>
          Explore mental health conditions, understand symptoms, triggers,
          causes, and learn healthy coping strategies in one structured space.
        </p>

        <div style={styles.buttons}>
          <Link to="/learn" style={styles.primaryBtn}>
            Start Learning
          </Link>

          <Link to="/chatbot" style={styles.secondaryBtn}>
            Talk to Assistant
          </Link>

          {/* 🆕 EMERGENCY CTA */}
          <Link to="/counselors" style={styles.emergencyBtn}>
            🚨 Need Help Now
          </Link>
        </div>
      </section>

      {/* 📊 SEVERITY DASHBOARD (NEW) */}
      <section style={styles.statsBar}>
        <div>🟢 Mild: {countSeverity("mild")}</div>
        <div>🟡 Moderate: {countSeverity("moderate")}</div>
        <div>🔴 Severe: {countSeverity("severe")}</div>
      </section>

      {/* WARNING BANNER */}
      <div style={styles.warningBanner}>
        ⚠️ If you are experiencing severe distress, seek professional help or contact a counselor immediately.
      </div>

      {/* TRENDING SECTION */}
      <section style={styles.section}>
        <h2>🔥 Most Viewed Conditions</h2>

        <div style={styles.grid}>
          {featured.map((d) => {
            const level = getSeverity(d);

            return (
              <div key={d.id} style={styles.card}>

                <div
                  style={{
                    ...styles.badge,
                    background: severityColor(level),
                  }}
                >
                  {severityLabel(level)}
                </div>

                <h3 style={styles.cardTitle}>{d.name}</h3>

                <p style={styles.description}>
                  {d.description}
                </p>

                {level === "high" && (
                  <div style={styles.warning}>
                    ⚠ High attention recommended
                  </div>
                )}

                <div style={styles.quickInfo}>
                  <p><b>Symptoms:</b> {d.symptoms.slice(0, 2).join(", ")}</p>
                  <p><b>Triggers:</b> {d.triggers.slice(0, 2).join(", ")}</p>
                </div>

                <Link to={`/learn/${d.id}`} style={styles.link}>
                  Open Full Guide →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ⚡ QUICK ACCESS DASHBOARD (NEW) */}
      <section style={styles.quickAccess}>
        <h2>⚡ Quick Access</h2>

        <div style={styles.quickGrid}>
          <Link to="/chatbot">🤖 Chatbot</Link>
          <Link to="/learn">📚 Learn</Link>
          <Link to="/counselors">📞 Counselors</Link>
          <Link to="/admin">📊 Admin</Link>
        </div>
      </section>

      {/* INFO SECTION */}
      <section style={styles.infoSection}>
        <h2>How this platform helps</h2>

        <ul>
          <li>Understand psychosocial disorders clearly</li>
          <li>Learn symptoms, causes, and coping strategies</li>
          <li>Use chatbot for symptom checking</li>
          <li>Access structured learning articles</li>
          <li>Get emergency counselor support when needed</li>
        </ul>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  hero: {
    padding: "60px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg,#1e3a8a,#2563eb,#38bdf8)",
    color: "white",
  },

  title: {
    fontSize: "2.6rem",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "1.1rem",
    maxWidth: "750px",
    margin: "0 auto 25px",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "white",
    color: "#2563eb",
    padding: "12px 18px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  secondaryBtn: {
    border: "2px solid white",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    textDecoration: "none",
  },

  emergencyBtn: {
    background: "#ef4444",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  statsBar: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    background: "#fff",
    fontWeight: "bold",
  },

  warningBanner: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
  },

  section: {
    padding: "40px 20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  cardTitle: {
    marginTop: "10px",
  },

  description: {
    fontSize: "0.9rem",
    opacity: 0.8,
  },

  warning: {
    marginTop: "10px",
    color: "#b91c1c",
    fontSize: "12px",
    fontWeight: "bold",
  },

  quickInfo: {
    marginTop: "10px",
    fontSize: "12px",
    opacity: 0.85,
  },

  link: {
    display: "inline-block",
    marginTop: "12px",
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  },

  quickAccess: {
    padding: "30px 20px",
    background: "#ffffff",
  },

  quickGrid: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  infoSection: {
    padding: "40px 20px",
    background: "#ffffff",
  },
};

export default Home;