import React, { useState, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello. I am your psychosocial support assistant. How are you feeling today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [moodLevel, setMoodLevel] = useState("stable");

  // 🧠 MEMORY LOAD (NEW)
  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");

    const severeCount = logs.filter((l) => l.severity === "severe").length;
    const moderateCount = logs.filter((l) => l.severity === "moderate").length;

    if (severeCount >= 3) setMoodLevel("critical");
    else if (moderateCount >= 5) setMoodLevel("unstable");
    else setMoodLevel("stable");
  }, []);

  // SEVERITY DETECTION (ENHANCED)
  const detectSeverity = (text) => {
    const lower = text.toLowerCase();

    const severeWords = [
      "suicide",
      "kill myself",
      "hopeless",
      "self harm",
      "die",
      "worthless",
      "can't continue",
      "end it all",
    ];

    const moderateWords = [
      "anxiety",
      "stress",
      "panic",
      "depressed",
      "fear",
      "burnout",
      "lonely",
      "sad",
      "overwhelmed",
    ];

    if (severeWords.some((w) => lower.includes(w))) return "severe";
    if (moderateWords.some((w) => lower.includes(w))) return "moderate";
    return "mild";
  };

  // 🧠 ADAPTIVE RESPONSE ENGINE (NEW UPGRADE)
  const generateResponse = (severity) => {
    if (moodLevel === "critical") {
      return `
⚠ SYSTEM ALERT: Repeated high-risk emotional patterns detected.

I strongly recommend immediate human support.

You are not alone. Please consider speaking to a counselor right now.
      `;
    }

    if (severity === "severe") {
      return `
🚨 High emotional distress detected.

I want you to pause for a moment.

You are safe in this space.

Immediate support options are recommended.
      `;
    }

    if (severity === "moderate") {
      return `
I’m noticing emotional strain patterns.

Try this:
• slow breathing (4–4–6)
• short walk or break
• talk to someone you trust
• reduce workload pressure if possible
      `;
    }

    return `
You appear relatively stable right now.

Keep reinforcing:
• rest cycles
• social connection
• emotional awareness
• healthy workload balance
    `;
  };

  // 📊 EMOTION SCORING (NEW)
  const calculateEmotionScore = (severity) => {
    const map = { mild: 1, moderate: 2, severe: 3 };
    return map[severity] || 1;
  };

  // SEND MESSAGE (UPGRADED ENGINE)
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const severity = detectSeverity(input);
    const score = calculateEmotionScore(severity);

    // 💾 LOGGING SYSTEM (ENHANCED)
    const existingLogs = JSON.parse(localStorage.getItem("logs") || "[]");

    const updatedLogs = [
      ...existingLogs,
      {
        message: input,
        severity,
        score,
        date: new Date().toLocaleString(),
      },
    ];

    localStorage.setItem("logs", JSON.stringify(updatedLogs));

    // 🔁 RECALCULATE MOOD STATE
    const severeCount = updatedLogs.filter((l) => l.severity === "severe").length;
    const moderateCount = updatedLogs.filter((l) => l.severity === "moderate").length;

    if (severeCount >= 3) setMoodLevel("critical");
    else if (moderateCount >= 5) setMoodLevel("unstable");

    const botMessage = {
      sender: "bot",
      text: generateResponse(severity),
      severity,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div style={styles.container}>
      {/* 🧠 SYSTEM STATUS BAR (NEW) */}
      <div style={styles.statusBar}>
        System Mood: <b>{moodLevel.toUpperCase()}</b>
      </div>

      <h1 style={styles.title}>
        AI Psychosocial Support Assistant
      </h1>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf:
                msg.sender === "user" ? "flex-end" : "flex-start",
              background:
                msg.sender === "user" ? "#2563eb" : "#ffffff",
              color: msg.sender === "user" ? "white" : "#111827",
            }}
          >
            <p>{msg.text}</p>

            {msg.severity && (
              <div
                style={{
                  ...styles.badge,
                  background:
                    msg.severity === "severe"
                      ? "#ef4444"
                      : msg.severity === "moderate"
                      ? "#f59e0b"
                      : "#22c55e",
                }}
              >
                {msg.severity.toUpperCase()}
              </div>
            )}

            {/* 🚨 AUTO ESCALATION BUTTON */}
            {msg.severity === "severe" && (
              <button
                style={styles.counselorBtn}
                onClick={() => (window.location.href = "/counselors")}
              >
                🚨 Immediate Counselor Access
              </button>
            )}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Describe how you feel..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  statusBar: {
    background: "#0f172a",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "14px",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e3a8a",
  },

  chatBox: {
    flex: 1,
    background: "white",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    overflowY: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  message: {
    maxWidth: "75%",
    padding: "16px",
    borderRadius: "14px",
    position: "relative",
    lineHeight: 1.6,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  badge: {
    marginTop: "12px",
    color: "white",
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  counselorBtn: {
    marginTop: "15px",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  inputArea: {
    display: "flex",
    marginTop: "20px",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  sendBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Chatbot;