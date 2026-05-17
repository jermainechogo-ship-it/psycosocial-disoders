import React from "react";
import { useParams, Link } from "react-router-dom";
import disorders from "../data/disorders";

function DisorderPage() {
  const { id } = useParams();

  const disorder = disorders.find((d) => d.id === id);

  if (!disorder) {
    return (
      <div style={styles.container}>
        <h2>Disorder not found</h2>
        <Link to="/learn" style={styles.backBtn}>
          ← Back to Learn
        </Link>
      </div>
    );
  }

  // 🧠 NEW: severity classification engine
  const highRisk = ["ptsd", "schizophrenia", "bpd", "bipolar"];
  const mediumRisk = ["anxiety", "panic", "ocd", "adhd"];

  const level = highRisk.includes(disorder.id)
    ? "high"
    : mediumRisk.includes(disorder.id)
    ? "medium"
    : "low";

  const severityColor = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e",
  };

  const severityLabel = {
    high: "Severe",
    medium: "Moderate",
    low: "Mild",
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1>{disorder.name}</h1>

        <p style={styles.category}>{disorder.category}</p>

        <p style={styles.description}>{disorder.description}</p>

        {/* 🧠 NEW: severity badge */}
        <div
          style={{
            ...styles.badge,
            background: severityColor[level],
          }}
        >
          {severityLabel[level]} Condition
        </div>
      </div>

      {/* ⚠ NEW: workplace impact warning */}
      {level === "high" && (
        <div style={styles.alertBox}>
          ⚠ High-impact psychosocial condition detected. Workplace support or
          counseling intervention may be required.
        </div>
      )}

      {/* 🧠 NEW: impact panel */}
      <div style={styles.impactBox}>
        <h3>🏢 Workplace Impact Snapshot</h3>
        <p>
          Employees experiencing <b>{disorder.name}</b> may show reduced focus,
          emotional fatigue, communication difficulty, or productivity decline.
        </p>
      </div>

      {/* GRID SECTIONS */}
      <div style={styles.grid}>
        {/* SYMPTOMS */}
        <div style={styles.card}>
          <h3>Symptoms</h3>
          <ul>
            {disorder.symptoms?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* TRIGGERS */}
        <div style={styles.card}>
          <h3>Triggers</h3>
          <ul>
            {disorder.triggers?.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>

        {/* COPING */}
        <div style={styles.card}>
          <h3>Coping Strategies</h3>
          <ul>
            {disorder.coping?.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🧠 NEW: quick action panel */}
      <div style={styles.actionPanel}>
        <h3>⚡ Recommended Actions</h3>

        <div style={styles.actionButtons}>
          <Link to="/assessment" style={styles.actionBtn}>
            Take Assessment
          </Link>

          <Link to="/counselors" style={styles.actionBtnAlt}>
            Contact Counselor
          </Link>

          <Link to="/chatbot" style={styles.actionBtnGhost}>
            Talk to Assistant
          </Link>
        </div>
      </div>

      {/* ARTICLE SECTION */}
      <div style={styles.articleBox}>
        <h2>Detailed Guidance</h2>

        {Array.isArray(disorder.article) ? (
          disorder.article.map((para, i) => (
            <p key={i} style={styles.paragraph}>
              {para}
            </p>
          ))
        ) : (
          <p style={styles.paragraph}>{disorder.article}</p>
        )}
      </div>

      {/* BACK BUTTON */}
      <div style={styles.footer}>
        <Link to="/learn" style={styles.backBtn}>
          ← Back to Disorders
        </Link>
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

  header: {
    background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
    color: "white",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "20px",
    position: "relative",
  },

  category: {
    opacity: 0.9,
    fontWeight: "bold",
  },

  description: {
    marginTop: "10px",
    fontSize: "1.1rem",
  },

  badge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  alertBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "15px",
    fontWeight: "bold",
  },

  impactBox: {
    background: "#e0f2fe",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
  },

  actionPanel: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    textAlign: "center",
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "10px",
  },

  actionBtn: {
    background: "#2563eb",
    color: "white",
    padding: "10px 14px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  actionBtnAlt: {
    background: "#10b981",
    color: "white",
    padding: "10px 14px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  actionBtnGhost: {
    border: "2px solid #2563eb",
    color: "#2563eb",
    padding: "10px 14px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  articleBox: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
  },

  paragraph: {
    lineHeight: "1.7",
    marginBottom: "12px",
  },

  footer: {
    marginTop: "20px",
    textAlign: "center",
  },

  backBtn: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
  },
};

export default DisorderPage;