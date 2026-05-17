import React from "react";
import { Link } from "react-router-dom";
import disorders from "../data/disorders";

function Home() {
  // simulate "most searched"
  const trending = [
    "depression",
    "anxiety",
    "ptsd",
  ];

  const featured = disorders.filter((d) =>
    trending.includes(d.id)
  );

  // 📊 LIVE CHATBOT LOGS
  const logs = JSON.parse(
    localStorage.getItem("logs") || "[]"
  );

  // 📅 BOOKINGS
  const bookings = JSON.parse(
    localStorage.getItem("bookings") || "[]"
  );

  // 🎫 TICKETS
  const tickets = JSON.parse(
    localStorage.getItem("tickets") || "{}"
  );

  // 👥 COUNSELORS
  const counselorCount = 5;

  const countSeverity = (type) =>
    logs.filter((l) => l.severity === type)
      .length;

  // 🔥 TOTAL TICKETS
  const totalTickets = Object.values(
    tickets
  ).flat().length;

  const getSeverity = (d) => {
    const highRisk = [
      "ptsd",
      "schizophrenia",
      "bpd",
      "bipolar",
    ];

    const mediumRisk = [
      "anxiety",
      "panic",
      "ocd",
      "adhd",
      "burnout",
    ];

    if (highRisk.includes(d.id))
      return "high";

    if (mediumRisk.includes(d.id))
      return "medium";

    return "low";
  };

  const severityColor = (level) => {
    if (level === "high")
      return "#ef4444";

    if (level === "medium")
      return "#f59e0b";

    return "#22c55e";
  };

  const severityLabel = (level) => {
    if (level === "high")
      return "Severe";

    if (level === "medium")
      return "Moderate";

    return "Mild";
  };

  // 🌤 MOTIVATIONAL MESSAGE
  const motivationQuotes = [
    "Small steps still move you forward.",
    "Rest is productive too.",
    "Your mental health matters.",
    "Progress is not always loud.",
    "You are allowed to recharge.",
  ];

  const randomQuote =
    motivationQuotes[
      Math.floor(
        Math.random() *
          motivationQuotes.length
      )
    ];

  return (
    <div style={styles.container}>
      {/* 🌌 HERO */}
      <section style={styles.hero}>
        <div style={styles.heroGlow}></div>

        <div style={styles.overlay}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              🧠 AI Powered Employee Wellness
            </div>

            <h1 style={styles.title}>
              HR Psychosocial Support System
            </h1>

            <p style={styles.subtitle}>
              A modern employee wellness hub
              designed to support emotional
              wellbeing, workplace mental
              health, counselor access, and
              psychosocial recovery.
            </p>

            {/* 🌟 FLOATING TRUST */}
            <div style={styles.trustRow}>
              <div style={styles.trustCard}>
                🔒 Private Support
              </div>

              <div style={styles.trustCard}>
                👨‍⚕️ Licensed Counselors
              </div>

              <div style={styles.trustCard}>
                ⚡ Instant Wellness Tools
              </div>

              <div style={styles.trustCard}>
                📊 HR Wellness Analytics
              </div>
            </div>

            {/* 🚀 CTA */}
            <div style={styles.buttons}>
              <Link
                to="/learn"
                style={styles.primaryBtn}
              >
                🚀 Start Wellness Journey
              </Link>

              <Link
                to="/chatbot"
                style={styles.secondaryBtn}
              >
                🤖 Talk To AI Assistant
              </Link>

              <Link
                to="/counselors"
                style={styles.emergencyBtn}
              >
                🚨 Contact Support Team
              </Link>
            </div>

            {/* 💬 QUOTE */}
            <div style={styles.quoteBox}>
              ✨ "{randomQuote}"
            </div>
          </div>
        </div>
      </section>

      {/* 📊 LIVE ANALYTICS */}
      <section style={styles.statsBar}>
        <div style={styles.statBox}>
          <h3>🟢 {countSeverity("mild")}</h3>
          <p>Mild Cases</p>
        </div>

        <div style={styles.statBox}>
          <h3>
            🟡 {countSeverity("moderate")}
          </h3>
          <p>Moderate Cases</p>
        </div>

        <div style={styles.statBox}>
          <h3>🔴 {countSeverity("severe")}</h3>
          <p>Critical Cases</p>
        </div>

        <div style={styles.statBox}>
          <h3>📅 {bookings.length}</h3>
          <p>Sessions Booked</p>
        </div>

        <div style={styles.statBox}>
          <h3>🎫 {totalTickets}</h3>
          <p>Support Tickets</p>
        </div>

        <div style={styles.statBox}>
          <h3>👨‍⚕️ {counselorCount}</h3>
          <p>Counselors Online</p>
        </div>
      </section>

      {/* 🚨 ALERT */}
      <div style={styles.warningBanner}>
        💙 Mental wellness is part of
        workplace success. Burnout,
        anxiety, emotional fatigue, and
        stress should never be ignored.
      </div>

      {/* 🔥 FEATURED CONDITIONS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2>
              🔥 Trending Workplace Wellness
              Topics
            </h2>

            <p style={styles.sectionSub}>
              Most explored psychosocial
              conditions among employees.
            </p>
          </div>

          <Link
            to="/learn"
            style={styles.viewAll}
          >
            View All →
          </Link>
        </div>

        <div style={styles.grid}>
          {featured.map((d) => {
            const level =
              getSeverity(d);

            return (
              <div
                key={d.id}
                style={styles.card}
              >
                <div
                  style={{
                    ...styles.badge,
                    background:
                      severityColor(level),
                  }}
                >
                  {severityLabel(level)}
                </div>

                <div style={styles.cardTop}>
                  <div style={styles.cardIcon}>
                    🧠
                  </div>
                </div>

                <h3 style={styles.cardTitle}>
                  {d.name}
                </h3>

                <p style={styles.description}>
                  {d.description}
                </p>

                {level === "high" && (
                  <div style={styles.warning}>
                    ⚠ Immediate support
                    recommended
                  </div>
                )}

                <div
                  style={styles.quickInfo}
                >
                  <p>
                    <b>Symptoms:</b>{" "}
                    {d.symptoms
                      .slice(0, 2)
                      .join(", ")}
                  </p>

                  <p>
                    <b>Triggers:</b>{" "}
                    {d.triggers
                      .slice(0, 2)
                      .join(", ")}
                  </p>
                </div>

                <Link
                  to={`/learn/${d.id}`}
                  style={styles.link}
                >
                  Open Wellness Guide →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ⚡ QUICK ACCESS */}
      <section style={styles.quickAccess}>
        <h2>
          ⚡ Employee Wellness Control
          Center
        </h2>

        <div style={styles.quickGrid}>
          <Link
            to="/chatbot"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              🤖
            </div>

            <h3>AI Assistant</h3>

            <p>
              Get guidance and emotional
              wellness recommendations.
            </p>
          </Link>

          <Link
            to="/assessment"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              📊
            </div>

            <h3>Assessment</h3>

            <p>
              Analyze psychosocial
              wellbeing indicators.
            </p>
          </Link>

          <Link
            to="/booking"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              📅
            </div>

            <h3>Book Session</h3>

            <p>
              Request confidential
              counseling support.
            </p>
          </Link>

          <Link
            to="/tickets"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              🎫
            </div>

            <h3>Support Tickets</h3>

            <p>
              Reach the HR wellness team
              quickly.
            </p>
          </Link>

          <Link
            to="/counselors"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              👨‍⚕️
            </div>

            <h3>Counselors</h3>

            <p>
              Connect with specialists
              and therapists.
            </p>
          </Link>

          <Link
            to="/admin"
            style={styles.quickCard}
          >
            <div style={styles.quickIcon}>
              🛡
            </div>

            <h3>HR Dashboard</h3>

            <p>
              Organizational wellness
              monitoring and analytics.
            </p>
          </Link>
        </div>
      </section>

      {/* 🌱 WELLNESS BENEFITS */}
      <section style={styles.infoSection}>
        <h2>
          🌱 How MindSpace Supports
          Employees
        </h2>

        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>
              🧠
            </div>

            <h3>
              Mental Wellness Education
            </h3>

            <p>
              Learn workplace stress
              management, emotional
              resilience, and psychosocial
              recovery techniques.
            </p>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>
              🤖
            </div>

            <h3>AI Emotional Support</h3>

            <p>
              Intelligent wellness
              guidance powered by your AI
              assistant system.
            </p>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>
              👨‍⚕️
            </div>

            <h3>Professional Counseling</h3>

            <p>
              Employees can connect with
              workplace wellness experts
              privately and securely.
            </p>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>
              📈
            </div>

            <h3>Live Wellness Tracking</h3>

            <p>
              Detect psychosocial risks
              early and improve employee
              wellbeing strategies.
            </p>
          </div>
        </div>
      </section>

      {/* 🌌 FOOTER */}
      <footer style={styles.footer}>
        <h2>MindSpace</h2>

        <p>
          Empowering healthier workplaces
          through emotional intelligence,
          support systems, and wellness
          technology.
        </p>

        <div style={styles.footerLinks}>
          <Link to="/">Home</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/booking">
            Booking
          </Link>
          <Link to="/help">Help</Link>
        </div>
      </footer>
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
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a,#0ea5e9)",
    color: "white",
    position: "relative",
    overflow: "hidden",
  },

  heroGlow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background:
      "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    top: "-150px",
    right: "-100px",
    filter: "blur(40px)",
  },

  overlay: {
    padding: "90px 20px",
  },

  heroContent: {
    maxWidth: "1100px",
    margin: "auto",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },

  heroBadge: {
    display: "inline-block",
    background:
      "rgba(255,255,255,0.15)",
    padding: "10px 18px",
    borderRadius: "999px",
    marginBottom: "20px",
    backdropFilter: "blur(8px)",
    border:
      "1px solid rgba(255,255,255,0.2)",
  },

  title: {
    fontSize: "3.4rem",
    fontWeight: "bold",
    marginBottom: "15px",
  },

  subtitle: {
    maxWidth: "800px",
    margin: "auto",
    lineHeight: "1.8",
    fontSize: "1.1rem",
    opacity: 0.92,
  },

  trustRow: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "35px",
  },

  trustCard: {
    background:
      "rgba(255,255,255,0.12)",
    padding: "12px 18px",
    borderRadius: "14px",
    backdropFilter: "blur(8px)",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "35px",
  },

  primaryBtn: {
    background: "white",
    color: "#2563eb",
    padding: "16px 22px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow:
      "0 4px 14px rgba(0,0,0,0.15)",
  },

  secondaryBtn: {
    border: "2px solid white",
    color: "white",
    padding: "16px 22px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  emergencyBtn: {
    background: "#ef4444",
    color: "white",
    padding: "16px 22px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  quoteBox: {
    marginTop: "35px",
    fontStyle: "italic",
    opacity: 0.9,
  },

  statsBar: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(170px,1fr))",
    gap: "18px",
    maxWidth: "1200px",
    margin: "-50px auto 0",
    padding: "20px",
    position: "relative",
    zIndex: 5,
  },

  statBox: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow:
      "0 6px 18px rgba(0,0,0,0.08)",
  },

  warningBanner: {
    background:
      "linear-gradient(90deg,#dbeafe,#eff6ff)",
    color: "#1e3a8a",
    padding: "16px",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "20px",
  },

  section: {
    padding: "60px 20px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  sectionSub: {
    opacity: 0.7,
  },

  viewAll: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "22px",
  },

  card: {
    background: "white",
    padding: "24px",
    borderRadius: "20px",
    boxShadow:
      "0 6px 18px rgba(0,0,0,0.06)",
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: "white",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardIcon: {
    fontSize: "34px",
  },

  cardTitle: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  description: {
    lineHeight: "1.7",
    opacity: 0.82,
  },

  warning: {
    marginTop: "14px",
    color: "#b91c1c",
    fontWeight: "bold",
  },

  quickInfo: {
    marginTop: "14px",
    fontSize: "13px",
    lineHeight: "1.7",
  },

  link: {
    display: "inline-block",
    marginTop: "18px",
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
  },

  quickAccess: {
    padding: "60px 20px",
    background: "#ffffff",
  },

  quickGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px",
    marginTop: "25px",
  },

  quickCard: {
    background: "#f8fafc",
    padding: "24px",
    borderRadius: "18px",
    textDecoration: "none",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.04)",
  },

  quickIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },

  infoSection: {
    padding: "70px 20px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",
    gap: "22px",
    marginTop: "30px",
  },

  infoCard: {
    background: "white",
    padding: "24px",
    borderRadius: "18px",
    boxShadow:
      "0 6px 18px rgba(0,0,0,0.05)",
  },

  infoIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },

  footer: {
    background: "#0f172a",
    color: "white",
    padding: "50px 20px",
    textAlign: "center",
    marginTop: "50px",
  },

  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
};

export default Home;