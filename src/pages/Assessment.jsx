import React, { useState, useEffect } from "react";

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

import questions from "../data/questions";
import { useAuth } from "../context/AuthContext";

function Assessment() {
  const { user } = useAuth(); // 👤 NEW ADDITION

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

  // 🔒 LOAD USER-SPECIFIC RESULT
  useEffect(() => {
    if (!user) return;

    const all = JSON.parse(localStorage.getItem("assessmentResults")) || {};
    if (all[user.email]) {
      setSavedResult(all[user.email]);
    }
  }, [user]);

  const handleAnswer = (id, value) => {
    setAnswers({
      ...answers,
      [id]: parseInt(value),
    });
  };

  // CATEGORY ANALYSIS
  const calculateCategoryScores = () => {
    const categoryScores = {};

    questions.forEach((q) => {
      const value = answers[q.id] || 0;

      if (!categoryScores[q.category]) {
        categoryScores[q.category] = 0;
      }

      categoryScores[q.category] += value;
    });

    return categoryScores;
  };

  const categoryScores = calculateCategoryScores();

  const totalScore = Object.values(categoryScores).reduce(
    (a, b) => a + b,
    0
  );

  const getSeverity = (score) => {
    if (score >= 40) return "Severe";
    if (score >= 20) return "Moderate";
    return "Mild";
  };

  const severity = getSeverity(totalScore);

  const pieData = [
    { name: "Mild", value: severity === "Mild" ? totalScore : 0 },
    { name: "Moderate", value: severity === "Moderate" ? totalScore : 0 },
    { name: "Severe", value: severity === "Severe" ? totalScore : 0 },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  const barData = Object.keys(categoryScores).map((key) => ({
    category: key,
    score: categoryScores[key],
  }));

  const getRecommendations = () => {
    let recommendations = [];

    Object.keys(categoryScores).forEach((key) => {
      const score = categoryScores[key];

      if (score >= 5) {
        recommendations.push(
          `High ${key} indicators detected. Consider professional support and stress management strategies.`
        );
      }
    });

    if (recommendations.length === 0) {
      recommendations.push(
        "Your wellness indicators currently appear stable. Continue maintaining healthy routines."
      );
    }

    return recommendations;
  };

  // 🔒 BLOCK IF NOT LOGGED IN
  if (!user) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>🔐 Please login to access the assessment</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Employee Psychological Assessment
      </h1>

      {/* 👤 SHOW PREVIOUS RESULT IF EXISTS */}
      {savedResult && !submitted && (
        <div style={{ background: "#e0f2fe", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
          <h3>📊 Previous Result Found</h3>
          <p>Total Score: {savedResult.totalScore}</p>
          <p>Severity: {savedResult.severity}</p>
        </div>
      )}

      {!submitted ? (
        <>
          {questions.map((q) => (
            <div key={q.id} style={styles.card}>
              <h3>{q.question}</h3>

              <p style={styles.category}>
                Category: {q.category}
              </p>

              <select
                style={styles.select}
                onChange={(e) =>
                  handleAnswer(q.id, e.target.value)
                }
              >
                <option value="">Select Answer</option>
                <option value="0">Never</option>
                <option value="1">Sometimes</option>
                <option value="2">Often</option>
                <option value="3">Always</option>
              </select>
            </div>
          ))}

          <button
            style={styles.button}
            onClick={() => {
              setSubmitted(true);

              // 💾 USER-SPECIFIC SAVE (NEW)
              const all =
                JSON.parse(localStorage.getItem("assessmentResults")) || {};

              all[user.email] = {
                totalScore,
                severity,
                categoryScores,
              };

              localStorage.setItem(
                "assessmentResults",
                JSON.stringify(all)
              );
            }}
          >
            Generate Psychological Report
          </button>
        </>
      ) : (
        <div style={styles.report}>
          <h2>Psychological Wellness Report</h2>

          <h3>Total Score: {totalScore}</h3>

          <div
            style={{
              ...styles.severity,
              background:
                severity === "Severe"
                  ? "#ef4444"
                  : severity === "Moderate"
                  ? "#f59e0b"
                  : "#22c55e",
            }}
          >
            {severity} Condition
          </div>

          <div style={styles.chartBox}>
            <h3>Severity Overview</h3>
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

          <div style={styles.chartBox}>
            <h3>Category Analysis</h3>
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

          <div style={styles.solutionBox}>
            <h3>Recommended Support</h3>
            <ul>
              {getRecommendations().map((r, index) => (
                <li key={index}>{r}</li>
              ))}
            </ul>
          </div>

          {severity === "Severe" && (
            <div style={styles.alert}>
              ⚠ Severe psychosocial distress indicators detected.
              Counselor support is highly recommended.
            </div>
          )}
        </div>
      )}
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
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  category: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  select: {
    marginTop: "10px",
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#2563eb",
    color: "white",
    padding: "14px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    fontSize: "16px",
  },
  report: {
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  severity: {
    color: "white",
    padding: "14px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
    margin: "20px 0",
    fontSize: "20px",
  },
  chartBox: {
    marginTop: "30px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  solutionBox: {
    marginTop: "30px",
    background: "#eff6ff",
    padding: "20px",
    borderRadius: "12px",
  },
  alert: {
    marginTop: "25px",
    background: "#fee2e2",
    color: "#991b1b",
    padding: "16px",
    borderRadius: "10px",
    fontWeight: "bold",
  },
};

export default Assessment;