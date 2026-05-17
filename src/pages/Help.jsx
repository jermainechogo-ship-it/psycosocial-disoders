import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Help() {
  const { user } = useAuth();

  const [faqOpen, setFaqOpen] = useState(null);
  const [ticketCount, setTicketCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  // 📊 LOAD USER ACTIVITY
  useEffect(() => {
    if (!user) return;

    // 🎫 Tickets
    const allTickets =
      JSON.parse(localStorage.getItem("tickets")) || {};

    const userTickets =
      allTickets[user.email] || [];

    setTicketCount(userTickets.length);

    // 📞 Session Requests
    const requests =
      JSON.parse(
        localStorage.getItem("sessionRequests")
      ) || [];

    const userRequests = requests.filter(
      (r) => r.user === user.email
    );

    setRequestCount(userRequests.length);
  }, [user]);

  // ❓ FAQ TOGGLE
  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      question:
        "How do I request counseling support?",
      answer:
        "Navigate to the Counselors page and click 'Request Session'. A support request will instantly be sent.",
    },
    {
      question:
        "Is my psychosocial assessment private?",
      answer:
        "Yes. Your assessments are stored locally and linked only to your account.",
    },
    {
      question:
        "Can I edit or delete support tickets?",
      answer:
        "Yes. Users can fully manage their own tickets from the Ticket System page.",
    },
    {
      question:
        "What if I feel emotionally overwhelmed?",
      answer:
        "Reach out to a counselor immediately or contact emergency mental health support services in your area.",
    },
    {
      question:
        "Can admins see all activities?",
      answer:
        "Admins and counselors can monitor support activity for system management and employee wellness coordination.",
    },
  ];

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroGlow}></div>

        <h1 style={styles.title}>
          🧠 Help & Employee Support Center
        </h1>

        <p style={styles.subtitle}>
          Your workplace wellness command center.
          Find answers, request support, manage
          psychosocial concerns, and connect with
          professionals when emotional pressure
          starts turning the office into a mental
          boss fight.
        </p>

        <div style={styles.heroStats}>
          <div style={styles.statCard}>
            <h2>24/7</h2>
            <p>Support Access</p>
          </div>

          <div style={styles.statCard}>
            <h2>{ticketCount}</h2>
            <p>Your Tickets</p>
          </div>

          <div style={styles.statCard}>
            <h2>{requestCount}</h2>
            <p>Session Requests</p>
          </div>
        </div>
      </div>

      {/* USER STATUS */}
      <div style={styles.statusSection}>
        {user ? (
          <div style={styles.userCard}>
            <h3>👤 Logged In</h3>

            <p>
              Welcome back,{" "}
              <b>{user.email}</b>
            </p>

            <p>
              Your psychosocial support tools
              are fully unlocked.
            </p>
          </div>
        ) : (
          <div style={styles.warningCard}>
            <h3>🔐 Guest Mode Active</h3>

            <p>
              Login to access assessments,
              counselor sessions, bookings,
              and private support tickets.
            </p>
          </div>
        )}
      </div>

      {/* QUICK SUPPORT */}
      <div style={styles.quickSection}>
        <h2>⚡ Quick Support Access</h2>

        <div style={styles.quickGrid}>
          <div style={styles.quickCard}>
            <h3>📞 Counselor Support</h3>

            <p>
              Reach trained professionals for
              stress, anxiety, burnout, and
              emotional wellness support.
            </p>

            <button style={styles.button}>
              Open Counselors
            </button>
          </div>

          <div style={styles.quickCard}>
            <h3>🎫 Ticket Assistance</h3>

            <p>
              Create private support tickets
              and track psychosocial concerns
              securely.
            </p>

            <button style={styles.button}>
              Open Tickets
            </button>
          </div>

          <div style={styles.quickCard}>
            <h3>🧠 Wellness Assessment</h3>

            <p>
              Generate mental wellness reports
              and monitor emotional health
              indicators.
            </p>

            <button style={styles.button}>
              Start Assessment
            </button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={styles.faqSection}>
        <h2>❓ Frequently Asked Questions</h2>

        <div style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={styles.faqCard}
            >
              <div
                style={styles.faqQuestion}
                onClick={() =>
                  toggleFAQ(index)
                }
              >
                <span>
                  {faq.question}
                </span>

                <span>
                  {faqOpen === index
                    ? "−"
                    : "+"}
                </span>
              </div>

              {faqOpen === index && (
                <div style={styles.faqAnswer}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WELLNESS ALERTS */}
      <div style={styles.alertSection}>
        <h2>
          🚨 Workplace Wellness Alerts
        </h2>

        <div style={styles.alertGrid}>
          <div style={styles.alertCard}>
            <h3>🔥 Burnout Signs</h3>

            <ul>
              <li>Extreme fatigue</li>
              <li>Loss of motivation</li>
              <li>Emotional exhaustion</li>
              <li>Reduced productivity</li>
            </ul>
          </div>

          <div style={styles.alertCard}>
            <h3>⚠ Stress Indicators</h3>

            <ul>
              <li>Sleep problems</li>
              <li>Constant anxiety</li>
              <li>Irritability</li>
              <li>Difficulty concentrating</li>
            </ul>
          </div>

          <div style={styles.alertCard}>
            <h3>🌱 Recovery Tips</h3>

            <ul>
              <li>Take regular breaks</li>
              <li>Talk to support staff</li>
              <li>Maintain sleep routines</li>
              <li>Practice mindfulness</li>
            </ul>
          </div>
        </div>
      </div>

      {/* EMERGENCY */}
      <div style={styles.emergencyBox}>
        <h2>
          🚑 Emergency Mental Health Notice
        </h2>

        <p>
          If you are experiencing severe
          emotional distress, thoughts of
          self-harm, panic attacks, or unsafe
          conditions, contact emergency mental
          health professionals immediately.
        </p>

        <div style={styles.emergencyButtons}>
          <button style={styles.emergencyBtn}>
            📞 Contact Support Team
          </button>

          <button style={styles.secondaryBtn}>
            🧠 Find Counselor
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <h3>
          🌌 Healthy minds create stronger
          workplaces.
        </h3>

        <p>
          MindSpace Psychosocial Support
          System
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  hero: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a,#2563eb)",
    color: "white",
    padding: "60px 25px",
    borderRadius: "24px",
    marginBottom: "30px",
    textAlign: "center",
  },

  heroGlow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    top: "-120px",
    right: "-100px",
  },

  title: {
    fontSize: "2.8rem",
    marginBottom: "12px",
    position: "relative",
    zIndex: 2,
  },

  subtitle: {
    maxWidth: "850px",
    margin: "auto",
    lineHeight: "1.7",
    opacity: 0.9,
    position: "relative",
    zIndex: 2,
  },

  heroStats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    marginTop: "35px",
    position: "relative",
    zIndex: 2,
  },

  statCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
  },

  statusSection: {
    marginBottom: "30px",
  },

  userCard: {
    background: "#dcfce7",
    padding: "20px",
    borderRadius: "16px",
    color: "#166534",
    border: "1px solid #86efac",
  },

  warningCard: {
    background: "#fee2e2",
    padding: "20px",
    borderRadius: "16px",
    color: "#991b1b",
    border: "1px solid #fca5a5",
  },

  quickSection: {
    marginTop: "30px",
  },

  quickGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  quickCard: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    boxShadow:
      "0 6px 14px rgba(0,0,0,0.08)",
  },

  button: {
    marginTop: "15px",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  faqSection: {
    marginTop: "50px",
  },

  faqContainer: {
    marginTop: "20px",
  },

  faqCard: {
    background: "white",
    marginBottom: "15px",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.06)",
  },

  faqQuestion: {
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    fontWeight: "bold",
  },

  faqAnswer: {
    padding: "18px",
    borderTop: "1px solid #e5e7eb",
    color: "#475569",
    lineHeight: "1.6",
  },

  alertSection: {
    marginTop: "50px",
  },

  alertGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  alertCard: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    boxShadow:
      "0 6px 14px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #2563eb",
  },

  emergencyBox: {
    marginTop: "60px",
    background:
      "linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)",
    color: "white",
    padding: "35px",
    borderRadius: "22px",
    textAlign: "center",
  },

  emergencyButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "25px",
  },

  emergencyBtn: {
    padding: "14px 18px",
    border: "none",
    borderRadius: "12px",
    background: "white",
    color: "#991b1b",
    fontWeight: "bold",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "14px 18px",
    border: "2px solid white",
    borderRadius: "12px",
    background: "transparent",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  footer: {
    marginTop: "50px",
    background: "#0f172a",
    color: "white",
    textAlign: "center",
    padding: "30px",
    borderRadius: "18px",
  },
};

export default Help;