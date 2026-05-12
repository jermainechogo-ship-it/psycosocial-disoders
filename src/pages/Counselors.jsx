import React from "react";

const counselors = [
  {
    name: "Dr. Sarah Kim",
    specialty: "Anxiety & Depression",
  },
  {
    name: "Dr. James Mwangi",
    specialty: "Trauma & PTSD",
  },
  {
    name: "Dr. Elena Cruz",
    specialty: "Youth Mental Health",
  },
];

function Counselors() {
  return (
    <div style={styles.container}>
      <h1> Available Counselors</h1>

      <div style={styles.grid}>
        {counselors.map((c, i) => (
          <div key={i} style={styles.card}>
            <h3>{c.name}</h3>
            <p>{c.specialty}</p>

            <button style={styles.button}>
              Request Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Counselors;