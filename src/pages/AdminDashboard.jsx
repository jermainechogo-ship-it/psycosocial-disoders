import React, { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts";

function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    const chatbotLogs = JSON.parse(
      localStorage.getItem("logs") || "[]"
    );

    const assessmentData = JSON.parse(
      localStorage.getItem("assessmentResults") || "null"
    );

    setLogs(chatbotLogs);
    setAssessment(assessmentData);
  }, []);

  const countSeverity = (type) =>
    logs.filter((l) => l.severity === type).length;

  const trending = (word) =>
    logs.filter((l) =>
      l.message.toLowerCase().includes(word)
    ).length;

  // PIE CHART DATA
  const pieData = [
    {
      name: "Mild",
      value:
        assessment?.severity === "Mild" ? 1 : 0,
    },

    {
      name: "Moderate",
      value:
        assessment?.severity === "Moderate" ? 1 : 0,
    },

    {
      name: "Severe",
      value:
        assessment?.severity === "Severe" ? 1 : 0,
    },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  // BAR GRAPH DATA
  const barData = assessment
    ? Object.keys(assessment.categoryScores).map(
        (key) => ({
          category: key,
          score: assessment.categoryScores[key],
        })
      )
    : [];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Employee Wellness Dashboard
      </h1>

      {/* TOP STATS */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2>🟢 Mild</h2>
          <h1>{countSeverity("mild")}</h1>
        </div>

        <div style={styles.statCard}>
          <h2>🟡 Moderate</h2>
          <h1>{countSeverity("moderate")}</h1>
        </div>

        <div style={styles.statCard}>
          <h2>🔴 Severe</h2>
          <h1>{countSeverity("severe")}</h1>
        </div>
      </div>

      {/* TRENDING */}
      <div style={styles.section}>
        <h2>Trending Psychological Concerns</h2>

        <ul>
          <li>Depression: {trending("depression")}</li>
          <li>Anxiety: {trending("anxiety")}</li>
          <li>Stress: {trending("stress")}</li>
          <li>Trauma: {trending("trauma")}</li>
        </ul>
      </div>

      {/* ASSESSMENT RESULTS */}
      {assessment && (
        <>
          <div style={styles.reportBox}>
            <h2>Latest Assessment Overview</h2>

            <h3>
              Total Score: {assessment.totalScore}
            </h3>

            <div
              style={{
                ...styles.severity,
                background:
                  assessment.severity === "Severe"
                    ? "#ef4444"
                    : assessment.severity === "Moderate"
                    ? "#f59e0b"
                    : "#22c55e",
              }}
            >
              {assessment.severity}
            </div>
          </div>

          {/* PIE CHART */}
          <div style={styles.chartBox}>
            <h2>Severity Distribution</h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
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

          {/* BAR CHART */}
          <div style={styles.chartBox}>
            <h2>Category Risk Analysis</h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="category" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="score" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* EMERGENCY ALERTS */}
      <div style={styles.section}>
        <h2>Emergency Flags</h2>

        {logs.filter((l) => l.severity === "severe")
          .length === 0 ? (
          <p>No emergencies detected</p>
        ) : (
          logs
            .filter((l) => l.severity === "severe")
            .map((l, i) => (
              <div key={i} style={styles.alert}>
                ⚠️ {l.message}
              </div>
            ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1e3a8a",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  section: {
    marginTop: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  reportBox: {
    marginTop: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  severity: {
    marginTop: "20px",
    padding: "14px",
    borderRadius: "10px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
  },

  chartBox: {
    marginTop: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  alert: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "14px",
    borderRadius: "10px",
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default AdminDashboard;