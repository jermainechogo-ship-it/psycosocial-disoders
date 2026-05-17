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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";

import questions from "../data/questions";
import { useAuth } from "../context/AuthContext";

function Assessment() {
  const { user } = useAuth();

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

  // ✨ NEW
  const [progress, setProgress] = useState(0);
  const [wellnessTip, setWellnessTip] = useState("");

  // 🌿 Dynamic wellness tips
  const wellnessTips = [
    "Take a 5-minute breathing break between work tasks.",
    "Hydration and sleep strongly affect emotional balance.",
    "Small daily walks can reduce stress hormones.",
    "Avoid carrying workplace stress into personal time.",
    "Speaking to someone early prevents emotional buildup.",
    "Burnout grows silently. Rest is productivity too.",
  ];

  // 🔒 LOAD USER-SPECIFIC RESULT
  useEffect(() => {
    if (!user) return;

    const all =
      JSON.parse(
        localStorage.getItem("assessmentResults")
      ) || {};

    if (all[user.email]) {
      setSavedResult(all[user.email]);
    }

    // ✨ random tip
    const random =
      wellnessTips[
        Math.floor(
          Math.random() * wellnessTips.length
        )
      ];

    setWellnessTip(random);
  }, [user]);

  // ✨ LIVE PROGRESS TRACKER
  useEffect(() => {
    const totalQuestions = questions.length;
    const answered =
      Object.keys(answers).length;

    setProgress(
      Math.round(
        (answered / totalQuestions) * 100
      )
    );
  }, [answers]);

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

  const categoryScores =
    calculateCategoryScores();

  const totalScore = Object.values(
    categoryScores
  ).reduce((a, b) => a + b, 0);

  const getSeverity = (score) => {
    if (score >= 40) return "Severe";
    if (score >= 20) return "Moderate";
    return "Mild";
  };

  const severity = getSeverity(totalScore);

  const pieData = [
    {
      name: "Mild",
      value:
        severity === "Mild"
          ? totalScore
          : 0,
    },
    {
      name: "Moderate",
      value:
        severity === "Moderate"
          ? totalScore
          : 0,
    },
    {
      name: "Severe",
      value:
        severity === "Severe"
          ? totalScore
          : 0,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  const barData = Object.keys(
    categoryScores
  ).map((key) => ({
    category: key,
    score: categoryScores[key],
  }));

  // ✨ RADAR DATA
  const radarData = Object.keys(
    categoryScores
  ).map((key) => ({
    category: key,
    value: categoryScores[key],
  }));

  // ✨ STRESS TREND MOCK DATA
  const trendData = [
    { day: "Mon", score: 10 },
    { day: "Tue", score: 15 },
    { day: "Wed", score: 18 },
    { day: "Thu", score: 12 },
    { day: "Fri", score: totalScore },
  ];

  const getRecommendations = () => {
    let recommendations = [];

    Object.keys(categoryScores).forEach(
      (key) => {
        const score =
          categoryScores[key];

        if (score >= 5) {
          recommendations.push(
            `High ${key} indicators detected. Consider professional support and stress management strategies.`
          );
        }
      }
    );

    if (recommendations.length === 0) {
      recommendations.push(
        "Your wellness indicators currently appear stable. Continue maintaining healthy routines."
      );
    }

    return recommendations;
  };

  // ✨ WELLNESS STATUS
  const getEnergyLevel = () => {
    if (severity === "Severe")
      return "Critical Energy Drain";
    if (severity === "Moderate")
      return "Stress Accumulation";
    return "Healthy Stability";
  };

  // ✨ AI-LIKE INSIGHT
  const getInsight = () => {
    if (severity === "Severe") {
      return "Patterns suggest significant workplace emotional strain and possible burnout accumulation.";
    }

    if (severity === "Moderate") {
      return "Indicators show manageable stress levels, but preventative care is recommended.";
    }

    return "Current indicators reflect relatively healthy psychosocial balance.";
  };

  // 🔒 BLOCK IF NOT LOGGED IN
  if (!user) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>
          🔐 Please login to access the
          assessment
        </h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* ✨ HERO */}
      <div style={styles.hero}>
        <div>
          <h1 style={styles.title}>
            🧠 Employee Psychological
            Assessment
          </h1>

          <p style={styles.subtitle}>
            Monitor emotional wellness,
            workplace stress, burnout
            signals, and psychosocial
            stability.
          </p>
        </div>

        <div style={styles.heroBadge}>
          👤 {user.email}
        </div>
      </div>

      {/* ✨ LIVE TIP */}
      <div style={styles.tipBox}>
        🌿 Wellness Tip: {wellnessTip}
      </div>

      {/* 👤 PREVIOUS RESULT */}
      {savedResult && !submitted && (
        <div style={styles.savedBox}>
          <h3>
            📊 Previous Result Found
          </h3>

          <p>
            Total Score:{" "}
            {savedResult.totalScore}
          </p>

          <p>
            Severity:{" "}
            {savedResult.severity}
          </p>
        </div>
      )}

      {!submitted ? (
        <>
          {/* ✨ PROGRESS BAR */}
          <div style={styles.progressContainer}>
            <div style={styles.progressTop}>
              <span>
                Assessment Progress
              </span>

              <span>{progress}%</span>
            </div>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* QUESTIONS */}
          {questions.map((q, index) => (
            <div
              key={q.id}
              style={styles.card}
            >
              <div style={styles.questionTop}>
                <span style={styles.qNumber}>
                  Q{index + 1}
                </span>

                <span style={styles.categoryTag}>
                  {q.category}
                </span>
              </div>

              <h3>{q.question}</h3>

              <select
                style={styles.select}
                onChange={(e) =>
                  handleAnswer(
                    q.id,
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Answer
                </option>

                <option value="0">
                  Never
                </option>

                <option value="1">
                  Sometimes
                </option>

                <option value="2">
                  Often
                </option>

                <option value="3">
                  Always
                </option>
              </select>
            </div>
          ))}

          <button
            style={styles.button}
            onClick={() => {
              setSubmitted(true);

              const all =
                JSON.parse(
                  localStorage.getItem(
                    "assessmentResults"
                  )
                ) || {};

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
            🚀 Generate Psychological
            Report
          </button>
        </>
      ) : (
        <div style={styles.report}>
          {/* ✨ HEADER */}
          <div style={styles.reportHeader}>
            <div>
              <h2>
                Psychological Wellness
                Report
              </h2>

              <p>
                Generated for{" "}
                <b>{user.email}</b>
              </p>
            </div>

            <div style={styles.scoreCircle}>
              {totalScore}
            </div>
          </div>

          {/* ✨ INSIGHT PANEL */}
          <div style={styles.insightBox}>
            <h3>
              🧠 AI Wellness Insight
            </h3>

            <p>{getInsight()}</p>

            <p>
              <b>Energy Status:</b>{" "}
              {getEnergyLevel()}
            </p>
          </div>

          <div
            style={{
              ...styles.severity,
              background:
                severity === "Severe"
                  ? "#ef4444"
                  : severity ===
                    "Moderate"
                  ? "#f59e0b"
                  : "#22c55e",
            }}
          >
            {severity} Condition
          </div>

          {/* ✨ QUICK STATS */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h2>{totalScore}</h2>
              <p>Total Score</p>
            </div>

            <div style={styles.statCard}>
              <h2>
                {
                  Object.keys(
                    categoryScores
                  ).length
                }
              </h2>
              <p>Categories</p>
            </div>

            <div style={styles.statCard}>
              <h2>{severity}</h2>
              <p>Risk Level</p>
            </div>

            <div style={styles.statCard}>
              <h2>{progress}%</h2>
              <p>Completion</p>
            </div>
          </div>

          {/* PIE */}
          <div style={styles.chartBox}>
            <h3>
              📊 Severity Overview
            </h3>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {pieData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* BAR */}
          <div style={styles.chartBox}>
            <h3>
              📈 Category Analysis
            </h3>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="category" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="score"
                  fill="#2563eb"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ✨ RADAR */}
          <div style={styles.chartBox}>
            <h3>
              🕸 Emotional Pattern Map
            </h3>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <RadarChart
                data={radarData}
              >
                <PolarGrid />

                <PolarAngleAxis dataKey="category" />

                <PolarRadiusAxis />

                <Radar
                  name="Stress"
                  dataKey="value"
                  stroke="#7c3aed"
                  fill="#7c3aed"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* ✨ TREND CHART */}
          <div style={styles.chartBox}>
            <h3>
              📉 Stress Trend
              Simulation
            </h3>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={trendData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#ef4444"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* RECOMMENDATIONS */}
          <div style={styles.solutionBox}>
            <h3>
              🛡 Recommended Support
            </h3>

            <ul>
              {getRecommendations().map(
                (r, index) => (
                  <li key={index}>
                    {r}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ✨ SELF CARE */}
          <div style={styles.selfCare}>
            <h3>
              🌱 Suggested Recovery
              Actions
            </h3>

            <div style={styles.careGrid}>
              <div style={styles.careCard}>
                😴 Sleep Recovery
              </div>

              <div style={styles.careCard}>
                🧘 Mindfulness
              </div>

              <div style={styles.careCard}>
                🚶 Walking Breaks
              </div>

              <div style={styles.careCard}>
                💬 Counselor Support
              </div>
            </div>
          </div>

          {severity === "Severe" && (
            <div style={styles.alert}>
              ⚠ Severe psychosocial
              distress indicators
              detected. Counselor
              support is highly
              recommended.
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
    background:
      "linear-gradient(to bottom,#eef4ff,#f8fbff)",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  hero: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#1e3a8a,#2563eb,#38bdf8)",
    color: "white",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "20px",
  },

  heroBadge: {
    background:
      "rgba(255,255,255,0.2)",
    padding: "12px 18px",
    borderRadius: "12px",
    fontWeight: "bold",
  },

  title: {
    margin: 0,
    fontSize: "2.4rem",
  },

  subtitle: {
    marginTop: "10px",
    opacity: 0.9,
    maxWidth: "700px",
  },

  tipBox: {
    background: "#ecfeff",
    border: "1px solid #a5f3fc",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "20px",
    color: "#155e75",
    fontWeight: "bold",
  },

  savedBox: {
    background: "#e0f2fe",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  progressContainer: {
    background: "white",
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "25px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
  },

  progressTop: {
    display: "flex",
    justifyContent:
      "space-between",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  progressBar: {
    height: "12px",
    background: "#e5e7eb",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background:
      "linear-gradient(90deg,#2563eb,#38bdf8)",
    transition: "0.3s",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "20px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  questionTop: {
    display: "flex",
    justifyContent:
      "space-between",
    marginBottom: "10px",
  },

  qNumber: {
    background: "#2563eb",
    color: "white",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px",
  },

  categoryTag: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  select: {
    marginTop: "10px",
    padding: "12px",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  button: {
    background:
      "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow:
      "0 6px 14px rgba(37,99,235,0.3)",
  },

  report: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
  },

  reportHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },

  scoreCircle: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    fontWeight: "bold",
  },

  insightBox: {
    marginTop: "20px",
    background: "#f5f3ff",
    border: "1px solid #ddd6fe",
    padding: "18px",
    borderRadius: "14px",
  },

  severity: {
    color: "white",
    padding: "14px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "bold",
    margin: "25px 0",
    fontSize: "20px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    marginBottom: "30px",
  },

  statCard: {
    background: "#0f172a",
    color: "white",
    padding: "20px",
    borderRadius: "16px",
    textAlign: "center",
  },

  chartBox: {
    marginTop: "30px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  solutionBox: {
    marginTop: "30px",
    background: "#eff6ff",
    padding: "20px",
    borderRadius: "16px",
  },

  selfCare: {
    marginTop: "30px",
    background: "#f0fdf4",
    padding: "20px",
    borderRadius: "16px",
  },

  careGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    marginTop: "15px",
  },

  careCard: {
    background: "white",
    padding: "16px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "bold",
    boxShadow:
      "0 4px 8px rgba(0,0,0,0.05)",
  },

  alert: {
    marginTop: "25px",
    background: "#fee2e2",
    color: "#991b1b",
    padding: "18px",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default Assessment;