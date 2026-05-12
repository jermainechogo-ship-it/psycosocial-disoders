import React from "react";
import { useParams, Link } from "react-router-dom";
import disorders from "../data/disorders";

function DisorderPage() {
  const { id } = useParams();

  // find disorder safely
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

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1>{disorder.name}</h1>
        <p style={styles.category}>{disorder.category}</p>
        <p style={styles.description}>{disorder.description}</p>
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
  },

  category: {
    opacity: 0.9,
    fontWeight: "bold",
  },

  description: {
    marginTop: "10px",
    fontSize: "1.1rem",
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