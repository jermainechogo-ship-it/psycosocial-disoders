import React, { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello. I am your psychosocial support assistant. How are you feeling today?",
    },
  ]);

  const [input, setInput] = useState("");

  // SEVERITY DETECTION
  const detectSeverity = (text) => {
    const lower = text.toLowerCase();

    const severeWords = [
      "suicide",
      "kill myself",
      "hopeless",
      "self harm",
      "die",
      "worthless",
      "severe depression",
      "can't continue",
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
    ];

    for (let word of severeWords) {
      if (lower.includes(word)) {
        return "severe";
      }
    }

    for (let word of moderateWords) {
      if (lower.includes(word)) {
        return "moderate";
      }
    }

    return "mild";
  };

  // BOT RESPONSE SYSTEM
  const generateResponse = (severity) => {
    if (severity === "severe") {
      return `
⚠ I detect severe emotional distress.

I strongly recommend speaking with a counselor immediately.

Please remember:
• You are not alone
• Professional help is available
• Support can make a difference

A counselor support option is available below.
      `;
    }

    if (severity === "moderate") {
      return `
I notice signs of emotional stress or anxiety.

Here are some recommendations:
• Take short mental breaks
• Practice breathing exercises
• Talk to someone you trust
• Consider counseling support if stress continues
      `;
    }

    return `
Your current emotional indicators appear relatively stable.

Continue maintaining:
• healthy rest
• work-life balance
• social connection
• stress management habits
    `;
  };

  // SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const severity = detectSeverity(input);

    // STORE LOGS
    const existingLogs = JSON.parse(
      localStorage.getItem("logs") || "[]"
    );

    existingLogs.push({
      message: input,
      severity,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "logs",
      JSON.stringify(existingLogs)
    );

    const botMessage = {
      sender: "bot",
      text: generateResponse(severity),
      severity,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  return (
    <div style={styles.container}>
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
                msg.sender === "user"
                  ? "flex-end"
                  : "flex-start",

              background:
                msg.sender === "user"
                  ? "#2563eb"
                  : "#ffffff",

              color:
                msg.sender === "user"
                  ? "white"
                  : "#111827",
            }}
          >
            <p>{msg.text}</p>

            {/* SEVERITY BADGE */}
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

            {/* COUNSELOR CTA */}
            {msg.severity === "severe" && (
              <button
                style={styles.counselorBtn}
                onClick={() =>
                  window.location.href = "/counselors"
                }
              >
                Speak to Counselor
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
          onChange={(e) =>
            setInput(e.target.value)
          }
          style={styles.input}
        />

        <button
          onClick={sendMessage}
          style={styles.sendBtn}
        >
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