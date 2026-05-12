import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("logs") || "[]");
    setLogs(data);
  }, []);

  const countSeverity = (type) =>
    logs.filter((l) => l.severity === type).length;

  const trending = (word) =>
    logs.filter((l) =>
      l.message.toLowerCase().includes(word)
    ).length;

  return (
    <div style={{ padding: 20 }}>
      <h1> Admin Dashboard</h1>

      {/* SEVERITY STATS */}
      <div style={{ display: "flex", gap: 20 }}>
        <div>🟢 Mild: {countSeverity("mild")}</div>
        <div>🟡 Moderate: {countSeverity("moderate")}</div>
        <div>🔴 Severe: {countSeverity("severe")}</div>
      </div>

      {/* TRENDING DISORDERS */}
      <h2 style={{ marginTop: 20 }}> Trending Topics</h2>
      <ul>
        <li>Depression: {trending("depression")}</li>
        <li>Anxiety: {trending("anxiety")}</li>
        <li>Trauma: {trending("trauma")}</li>
      </ul>

      {/* EMERGENCY ALERTS */}
      <h2 style={{ marginTop: 20 }}> Emergency Flags</h2>

      {logs.filter(l => l.severity === "severe").length === 0 ? (
        <p>No emergencies detected</p>
      ) : (
        logs
          .filter(l => l.severity === "severe")
          .map((l, i) => (
            <div key={i} style={{ background: "#ffe5e5", padding: 10, margin: 5 }}>
              ⚠️ {l.message}
            </div>
          ))
      )}
    </div>
  );
}

export default AdminDashboard;