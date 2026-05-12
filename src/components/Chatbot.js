import React, { useState, useRef } from "react";
import "../css/chatbot.css";
import disorders from "../data/disorders";
import { Link } from "react-router-dom";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text:
        "SYSTEM ONLINE... Mental Health Assistant activated. I can help you explore psychosocial disorders, symptoms, and coping strategies.",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [typing, setTyping] = useState(false);

  // 🧲 DRAG STATE
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const options = ["Depression", "Anxiety", "Trauma", "Help"];
  const detectSeverity = (msg) => {
  msg = msg.toLowerCase();

  const severeWords = ["suicide", "kill myself", "end my life", "can’t go on"];
  const moderateWords = ["hopeless", "breaking down", "overwhelmed", "crying all the time"];
  const mildWords = ["sad", "tired", "stressed", "low mood"];

  if (severeWords.some(w => msg.includes(w))) return "severe";
  if (moderateWords.some(w => msg.includes(w))) return "moderate";
  if (mildWords.some(w => msg.includes(w))) return "mild";

  return "normal";
};

  const symptomMap = {
    depression: ["sad", "hopeless", "tired", "low mood", "empty"],
    anxiety: ["worry", "panic", "nervous", "restless", "overthinking"],
    trauma: ["flashback", "trauma", "nightmare", "ptsd", "fear"],
  };

  // 🧠 BOT LOGIC (NOW INCLUDES COPING STRATEGIES)
  const botReply = (msg) => {
    msg = msg.toLowerCase();

    const found = disorders.find((d) =>
      d.name.toLowerCase().includes(msg)
    );

    if (found) {
      return {
        text:
`${found.name}

${found.description}

Category: ${found.category}

Symptoms:
- ${found.symptoms.join("\n- ")}

Coping Strategies:
- ${found.coping.join("\n- ")}`,
        link: found.id,
      };
    }

    for (let key in symptomMap) {
      if (symptomMap[key].some((word) => msg.includes(word))) {
        const match = disorders.find((d) => d.id === key);

        if (match) {
          return {
            text:
`Your symptoms may be linked to ${match.name}.

Symptoms:
- ${match.symptoms.join("\n- ")}

Coping Strategies:
- ${match.coping.join("\n- ")}

Click below for full article.`,
            link: match.id,
          };
        }
      }
    }

    return {
      text:
        "Try describing symptoms like sadness, worry, or trauma. I’ll guide you.",
    };
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = botReply(text);

      setMessages((prev) => [
        ...prev,
        {
          text: response.text,
          sender: "bot",
          link: response.link || null,
        },
      ]);

      setTyping(false);
    }, 600);
    const severity = detectSeverity(text);

if (severity === "severe") {
  return setMessages(prev => [
    ...prev,
    {
      text:
        " It sounds like you're going through something very serious.\nWe strongly recommend speaking to a counselor immediately.",
      sender: "bot",
      link: "counselor"
    }
  ]);
}
const logs = JSON.parse(localStorage.getItem("logs") || "[]");

  logs.push({
    message: text,
    severity: detectSeverity(text),
    time: new Date().toISOString()
   });

   localStorage.setItem("logs", JSON.stringify(logs));
  };

  // 🧲 DRAG FUNCTIONS
  const startDrag = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const onDrag = (e) => {
    if (!dragging.current) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Chat
      </button>

      {isOpen && (
        <div
          className="chat-window"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {/* DRAG HEADER */}
          <div className="chat-header" onMouseDown={startDrag}>
            Mental Health Assistant (drag me)
          </div>

          {/* BODY */}
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                <div style={{ whiteSpace: "pre-line" }}>
                  {msg.text}
                </div>

                {msg.link && (
                  <Link
                    to={`/learn/${msg.link}`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      color: "#2563eb",
                      fontWeight: "bold",
                      display: "block",
                      marginTop: "8px",
                    }}
                  >
                    Open Full Article →
                  </Link>
                )}
              </div>
            ))}

            {typing && (
              <div className="typing">assistant is typing...</div>
            )}
          </div>

          {/* QUICK BUTTONS */}
          <div className="chat-buttons">
            {options.map((opt) => (
              <button key={opt} onClick={() => sendMessage(opt)}>
                {opt}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about symptoms..."
            />
            <button onClick={() => sendMessage(input)}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;