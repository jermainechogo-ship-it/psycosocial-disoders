import React from "react";
import { Link } from "react-router-dom";
import disorders from "../data/disorders";

function Home() {
  // simulate "most searched" (later you can make it dynamic)
  const trending = ["depression", "anxiety", "ptsd"];

  const featured = disorders.filter((d) =>
    trending.includes(d.id)
  );

  // 📊 LIVE CHATBOT LOGS
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

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              🧠 Employee Wellness & HR Support Platform
            </div>

            <h1 style={styles.title}>
              HR Psychosocial Support System
            </h1>

            <p style={styles.subtitle}>
              Supporting employee mental wellness through
              early assessment, counselor access, guided
              learning resources, and confidential support tools.
            </p>

            {/* TRUST CARDS */}
            <div style={styles.trustRow}>
              <div style={styles.trustCard}>
                🔒 Confidential Support
              </div>

              <div style={styles.trustCard}>
                👨‍⚕️ Professional Guidance
              </div>

              <div style={styles.trustCard}>
                ⚡ Real-Time Assistance
              </div>
            </div>

            <div style={styles.buttons}>
              <Link to="/learn" style={styles.primaryBtn}>
                Start Your Wellness Journey
              </Link>

              <Link to="/chatbot" style={styles.secondaryBtn}>
                Talk to Wellness Assistant
              </Link>

              <Link to="/counselors" style={styles.emergencyBtn}>
                🚨 Contact Support Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 WELLNESS DASHBOARD */}
      <section style={styles.statsBar}>
        <div style={styles.statBox}>
          <h3>🟢 {countSeverity("mild")}</h3>
          <p>Mild Cases</p>
        </div>

        <div style={styles.statBox}>
          <h3>🟡 {countSeverity("moderate")}</h3>
          <p>Moderate Cases</p>
        </div>

        <div style={styles.statBox}>
          <h3>🔴 {countSeverity("severe")}</h3>
          <p>High-Risk Cases</p>
        </div>

        <div style={styles.statBox}>
          <h3>💬 {logs.length}</h3>
          <p>Total Interactions</p>
        </div>
      </section>

      {/* SUPPORT NOTICE */}
      <div style={styles.warningBanner}>
        💙 Employee wellbeing matters. If you are experiencing emotional distress,
        burnout, anxiety, or workplace pressure, please seek support immediately.
      </div>

      {/* TRENDING CONDITIONS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2>🔥 Most Viewed Wellness Topics</h2>
            <p style={styles.sectionSub}>
              Common workplace psychosocial concerns employees explore.
            </p>
          </div>
        </div>

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

                <div style={styles.cardIcon}>
                  🧠
                </div>

                <h3 style={styles.cardTitle}>{d.name}</h3>

                <p style={styles.description}>
                  {d.description}
                </p>

                {level === "high" && (
                  <div style={styles.warning}>
                    ⚠ Professional attention recommended
                  </div>
                )}

                <div style={styles.quickInfo}>
                  <p>
                    <b>Symptoms:</b>{" "}
                    {d.symptoms.slice(0, 2).join(", ")}
                  </p>

                  <p>
                    <b>Triggers:</b>{" "}
                    {d.triggers.slice(0, 2).join(", ")}
                  </p>
                </div>

                <Link to={`/learn/${d.id}`} style={styles.link}>
                  Open Wellness Guide →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section style={styles.quickAccess}>
        <h2>⚡ Employee Quick Access</h2>

        <div style={styles.quickGrid}>
          <Link to="/chatbot" style={styles.quickCard}>
            🤖 Wellness Assistant
          </Link>

          <Link to="/assessment" style={styles.quickCard}>
            📝 Mental Health Assessment
          </Link>

          <Link to="/booking" style={styles.quickCard}>
            📅 Book Counseling Session
          </Link>

          <Link to="/tickets" style={styles.quickCard}>
            🎫 Support Tickets
          </Link>

          <Link to="/counselors" style={styles.quickCard}>
            👨‍⚕️ Counselors
          </Link>

          <Link to="/admin" style={styles.quickCard}>
            🛡 HR Admin
          </Link>
        </div>
      </section>

      {/* HOW IT HELPS */}
      <section style={styles.infoSection}>
        <h2>How this platform supports employees</h2>

        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <h3>🧠 Mental Wellness Education</h3>
            <p>
              Learn about psychosocial disorders,
              emotional wellbeing, workplace stress,
              and healthy coping strategies.
            </p>
          </div>

          <div style={styles.infoCard}>
            <h3>🤖 AI Support Assistant</h3>
            <p>
              Interact with the wellness assistant
              for symptom guidance, recommendations,
              and emotional support resources.
            </p>
          </div>

          <div style={styles.infoCard}>
            <h3>📅 Counselor Booking</h3>
            <p>
              Employees can confidentially request
              counseling sessions and receive
              approval from support staff.
            </p>
          </div>

          <div style={styles.infoCard}>
            <h3>📊 Wellness Monitoring</h3>
            <p>
              Track emotional severity indicators
              and provide faster intervention
              for high-risk cases.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    background: "#eef4f8",
    minHeight: "100vh",
    color: "#0f172a",
  },

  hero: {
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a,#0ea5e9)",
    color: "white",
    position: "relative",
  },

  overlay: {
    background: "rgba(0,0,0,0.15)",
    padding: "70px 20px",
  },

  heroContent: {
    maxWidth: "1000px",
    margin: "auto",
    textAlign: "center",
  },

  heroBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    padding: "8px 16px",
    borderRadius: "999px",
    marginBottom: "20px",
    fontSize: "14px",
    backdropFilter: "blur(6px)",
  },

  title: {
    fontSize: "3rem",
    marginBottom: "15px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "1.1rem",
    maxWidth: "760px",
    margin: "0 auto 30px",
    lineHeight: "1.7",
    opacity: 0.95,
  },

  trustRow: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  trustCard: {
    background: "rgba(255,255,255,0.12)",
    padding: "10px 16px",
    borderRadius: "12px",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.15)",
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
    padding: "14px 20px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  secondaryBtn: {
    border: "2px solid white",
    color: "white",
    padding: "14px 20px",
    borderRadius: "12px",
    textDecoration: "none",
  },

  emergencyBtn: {
    background: "#ef4444",
    color: "white",
    padding: "14px 20px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  statsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    padding: "25px 20px",
    maxWidth: "1100px",
    margin: "-40px auto 0",
    position: "relative",
    zIndex: 5,
  },

  statBox: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },

  warningBanner: {
    background: "#dbeafe",
    color: "#1e3a8a",
    padding: "14px",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "20px",
  },

  section: {
    padding: "50px 20px",
  },

  sectionHeader: {
    marginBottom: "20px",
  },

  sectionSub: {
    opacity: 0.7,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "22px",
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
    position: "relative",
    transition: "0.3s",
  },

  cardIcon: {
    fontSize: "28px",
    marginBottom: "10px",
  },

  badge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: "white",
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  cardTitle: {
    marginBottom: "10px",
  },

  description: {
    fontSize: "0.95rem",
    opacity: 0.8,
    lineHeight: "1.6",
  },

  warning: {
    marginTop: "12px",
    color: "#b91c1c",
    fontWeight: "bold",
    fontSize: "13px",
  },

  quickInfo: {
    marginTop: "12px",
    fontSize: "13px",
    opacity: 0.85,
    lineHeight: "1.6",
  },

  link: {
    display: "inline-block",
    marginTop: "15px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },

  quickAccess: {
    padding: "50px 20px",
    background: "#ffffff",
  },

  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  quickCard: {
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "14px",
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: "bold",
    border: "1px solid #e2e8f0",
  },

  infoSection: {
    padding: "60px 20px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "25px",
  },

  infoCard: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
};

export default Home;