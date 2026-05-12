import React, { useState } from "react";
import { Link } from "react-router-dom";
import disorders from "../data/disorders";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Learn() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Mood", "Anxiety", "Trauma"];

  // FILTER DISORDERS
  const filtered = disorders.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || d.category === category;

    return matchesSearch && matchesCategory;
  });

  // DASHBOARD STATS
  const stats = disorders.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});

  // PIE CHART DATA
  const chartData = Object.entries(stats).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  // CHART COLORS
  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="page" style={styles.container}>
      <h1>Disorders Explorer</h1>

      {/* DASHBOARD STATS */}
      <div style={styles.stats}>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} style={styles.statCard}>
            <h3>{key}</h3>
            <p>{value} disorders</p>
          </div>
        ))}
      </div>

      {/* PIE CHART */}
      <div style={styles.chartContainer}>
        <h3>Category Distribution</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* SEARCH BAR */}
      <input
        placeholder="Search disorders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* FILTER BUTTONS */}
      <div style={styles.filters}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              ...styles.button,
              background: category === c ? "#2563eb" : "#eee",
              color: category === c ? "white" : "black",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* RESULTS */}
      <div style={styles.grid}>
        {filtered.map((d) => (
          <Link
            key={d.id}
            to={`/learn/${d.id}`}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.1)";
            }}
          >
            <div>
              <h3>{d.name}</h3>
              <p>{d.description}</p>
            </div>

            <small>{d.category}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },

  search: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
  },

  statCard: {
    padding: "15px",
    background: "#f3f4f6",
    borderRadius: "10px",
    textAlign: "center",
  },

  chartContainer: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    textDecoration: "none",
    padding: "15px",
    borderRadius: "10px",
    background: "#fff",
    color: "#333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "0.3s",

    transform: "translateY(0)",
    cursor: "pointer",
    minHeight: "160px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

export default Learn;