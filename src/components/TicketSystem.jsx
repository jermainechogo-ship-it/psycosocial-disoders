import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

const TicketSystem = () => {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  // ✨ NEW STATES
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [moodTip, setMoodTip] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    category: "other",
    urgency: "normal",
  });

  // 🌱 WELLNESS TIPS
  const wellnessTips = [
    "Take short breathing breaks during stressful tasks.",
    "Rest is part of productivity.",
    "Talking about stress early prevents burnout.",
    "Small wins matter more than perfect days.",
    "Mental wellbeing fuels workplace performance.",
  ];

  // 💾 LOAD TICKETS
  useEffect(() => {
    if (!user) return;

    const allTickets =
      JSON.parse(
        localStorage.getItem("tickets")
      ) || {};

    const userTickets =
      allTickets[user.email] || [];

    setTickets(userTickets);

    // ✨ RANDOM TIP
    const randomTip =
      wellnessTips[
        Math.floor(
          Math.random() *
            wellnessTips.length
        )
      ];

    setMoodTip(randomTip);
  }, [user]);

  // 💾 SAVE TICKETS
  useEffect(() => {
    if (!user) return;

    const allTickets =
      JSON.parse(
        localStorage.getItem("tickets")
      ) || {};

    allTickets[user.email] = tickets;

    localStorage.setItem(
      "tickets",
      JSON.stringify(allTickets)
    );
  }, [tickets, user]);

  // 🧠 INPUT HANDLER
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // 📩 SUBMIT / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.message
    ) {
      alert(
        "Please complete the form."
      );
      return;
    }

    if (!user) {
      alert(
        "Please login first"
      );
      return;
    }

    if (editingId) {
      // ✏️ UPDATE MODE
      const updated =
        tickets.map((t) =>
          t.id === editingId
            ? {
                ...t,
                ...form,
              }
            : t
        );

      setTickets(updated);

      setEditingId(null);

      setSuccessMessage(
        "✏️ Ticket updated successfully!"
      );
    } else {
      // ➕ CREATE MODE
      const newTicket = {
        id: Date.now(),
        ...form,
        status: "open",
        priority:
          form.urgency,
        createdAt:
          new Date().toLocaleString(),
        owner: user.email,
      };

      setTickets([
        newTicket,
        ...tickets,
      ]);

      setSuccessMessage(
        "✅ Support ticket submitted!"
      );
    }

    // ✨ CLEAR MESSAGE
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    // RESET FORM
    setForm({
      name: "",
      email: "",
      message: "",
      category: "other",
      urgency: "normal",
    });
  };

  // 🗑 DELETE
  const deleteTicket = (id) => {
    const updated =
      tickets.filter(
        (t) => t.id !== id
      );

    setTickets(updated);
  };

  // ✏️ EDIT
  const editTicket = (ticket) => {
    setForm({
      name: ticket.name,
      email: ticket.email,
      message:
        ticket.message,
      category:
        ticket.category,
      urgency:
        ticket.priority ||
        "normal",
    });

    setEditingId(ticket.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 🔄 TOGGLE STATUS
  const toggleStatus = (id) => {
    const updated =
      tickets.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                t.status ===
                "open"
                  ? "resolved"
                  : "open",
            }
          : t
      );

    setTickets(updated);
  };

  // 🔍 FILTER + SEARCH
  const filteredTickets =
    tickets.filter((t) => {
      const matchesFilter =
        filter === "all"
          ? true
          : t.status === filter;

      const matchesSearch =
        t.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        t.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );
    });

  // 📊 LIVE STATS
  const stats = useMemo(() => {
    return {
      total: tickets.length,

      open: tickets.filter(
        (t) =>
          t.status === "open"
      ).length,

      resolved:
        tickets.filter(
          (t) =>
            t.status ===
            "resolved"
        ).length,

      urgent: tickets.filter(
        (t) =>
          t.priority ===
          "urgent"
      ).length,
    };
  }, [tickets]);

  // 🔐 LOGIN PROTECTION
  if (!user) {
    return (
      <div style={styles.locked}>
        <h2>
          🔐 Please login to
          access support
          tickets
        </h2>

        <p>
          The support portal
          awakens only for
          authenticated users.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* 🌌 HERO */}
      <div style={styles.hero}>
        <div>
          <h1 style={styles.heroTitle}>
            🧠 Employee Support
            Ticket Center
          </h1>

          <p style={styles.heroText}>
            Submit workplace
            wellbeing concerns,
            emotional stress,
            burnout alerts, or
            psychosocial support
            requests securely.
          </p>
        </div>

        <div style={styles.tipCard}>
          <h3>
            🌱 Wellness Tip
          </h3>

          <p>{moodTip}</p>
        </div>
      </div>

      {/* ✨ SUCCESS BOX */}
      {successMessage && (
        <div
          style={styles.successBox}
        >
          {successMessage}
        </div>
      )}

      {/* 📊 STATS */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2>{stats.total}</h2>
          <p>Total Tickets</p>
        </div>

        <div style={styles.statCard}>
          <h2>{stats.open}</h2>
          <p>Open Cases</p>
        </div>

        <div style={styles.statCard}>
          <h2>
            {stats.resolved}
          </h2>
          <p>Resolved</p>
        </div>

        <div style={styles.statCard}>
          <h2>{stats.urgent}</h2>
          <p>Urgent Cases</p>
        </div>
      </div>

      {/* 🎛 FILTERS */}
      <div style={styles.filterBar}>
        <div style={styles.filters}>
          <button
            style={styles.filterBtn}
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </button>

          <button
            style={styles.filterBtn}
            onClick={() =>
              setFilter("open")
            }
          >
            Open
          </button>

          <button
            style={styles.filterBtn}
            onClick={() =>
              setFilter(
                "resolved"
              )
            }
          >
            Resolved
          </button>
        </div>

        {/* 🔎 SEARCH */}
        <input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={styles.search}
        />
      </div>

      {/* 🧾 FORM */}
      <div style={styles.formCard}>
        <h2>
          {editingId
            ? "✏️ Edit Support Ticket"
            : "📩 Submit Support Ticket"}
        </h2>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={
              handleChange
            }
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={
              handleChange
            }
            style={styles.input}
          />

          <select
            name="category"
            value={
              form.category
            }
            onChange={
              handleChange
            }
            style={styles.input}
          >
            <option value="stress">
              Stress
            </option>

            <option value="anxiety">
              Anxiety
            </option>

            <option value="depression">
              Depression
            </option>

            <option value="burnout">
              Burnout
            </option>

            <option value="harassment">
              Workplace
              Harassment
            </option>

            <option value="fatigue">
              Fatigue
            </option>

            <option value="other">
              Other
            </option>
          </select>

          {/* ✨ NEW PRIORITY */}
          <select
            name="urgency"
            value={
              form.urgency
            }
            onChange={
              handleChange
            }
            style={styles.input}
          >
            <option value="low">
              🟢 Low Priority
            </option>

            <option value="normal">
              🟡 Normal Priority
            </option>

            <option value="urgent">
              🔴 Urgent Priority
            </option>
          </select>

          <textarea
            name="message"
            placeholder="Describe your situation..."
            value={
              form.message
            }
            onChange={
              handleChange
            }
            style={styles.textarea}
          />

          <button
            type="submit"
            style={styles.button}
          >
            {editingId
              ? "Update Ticket"
              : "Submit Ticket"}
          </button>
        </form>
      </div>

      {/* 📋 TICKET LIST */}
      <div style={styles.list}>
        {filteredTickets.length ===
        0 ? (
          <div
            style={
              styles.emptyState
            }
          >
            <h3>
              🌙 No tickets found
            </h3>

            <p>
              The support queue
              is currently calm.
            </p>
          </div>
        ) : (
          filteredTickets.map(
            (t) => (
              <div
                key={t.id}
                style={
                  styles.card
                }
              >
                <div
                  style={
                    styles.cardTop
                  }
                >
                  <h3>
                    {t.name}
                  </h3>

                  <span
                    style={{
                      ...styles.priorityBadge,
                      background:
                        t.priority ===
                        "urgent"
                          ? "#ef4444"
                          : t.priority ===
                            "low"
                          ? "#22c55e"
                          : "#f59e0b",
                    }}
                  >
                    {t.priority ||
                      "normal"}
                  </span>
                </div>

                <p>
                  <b>
                    📂 Category:
                  </b>{" "}
                  {
                    t.category
                  }
                </p>

                <p>
                  {
                    t.message
                  }
                </p>

                <p>
                  <b>
                    📌 Status:
                  </b>{" "}
                  <span
                    style={{
                      color:
                        t.status ===
                        "open"
                          ? "#ef4444"
                          : "#22c55e",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {t.status}
                  </span>
                </p>

                <p
                  style={
                    styles.date
                  }
                >
                  {
                    t.createdAt
                  }
                </p>

                {/* ✨ ACTIONS */}
                <div
                  style={
                    styles.actions
                  }
                >
                  <button
                    onClick={() =>
                      editTicket(
                        t
                      )
                    }
                    style={
                      styles.editBtn
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTicket(
                        t.id
                      )
                    }
                    style={
                      styles.deleteBtn
                    }
                  >
                    🗑 Delete
                  </button>

                  <button
                    onClick={() =>
                      toggleStatus(
                        t.id
                      )
                    }
                    style={
                      styles.toggleBtn
                    }
                  >
                    🔄 Toggle
                    Status
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* 🌌 FOOTER */}
      <div style={styles.footer}>
        <h3>
          💙 Confidential Support
          Environment
        </h3>

        <p>
          All psychosocial
          support tickets are
          intended to help
          employees feel heard,
          supported, and safe in
          the workplace.
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial",
    background:
      "linear-gradient(to bottom,#f8fafc,#eef2ff)",
    minHeight: "100vh",
  },

  locked: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial",
  },

  hero: {
    background:
      "linear-gradient(135deg,#0f172a,#2563eb,#38bdf8)",
    color: "white",
    padding: "30px",
    borderRadius: "20px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)",
  },

  heroTitle: {
    fontSize: "2.2rem",
    marginBottom: "10px",
  },

  heroText: {
    maxWidth: "650px",
    opacity: 0.9,
  },

  tipCard: {
    background:
      "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "16px",
    backdropFilter:
      "blur(8px)",
    maxWidth: "250px",
  },

  successBox: {
    background: "#dcfce7",
    color: "#166534",
    padding: "14px",
    borderRadius: "12px",
    marginTop: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    marginTop: "25px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow:
      "0 6px 15px rgba(0,0,0,0.08)",
  },

  filterBar: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "25px",
  },

  filters: {
    display: "flex",
    gap: "10px",
  },

  filterBtn: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  search: {
    padding: "10px",
    borderRadius: "10px",
    border:
      "1px solid #cbd5e1",
    minWidth: "220px",
  },

  formCard: {
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    marginTop: "25px",
    boxShadow:
      "0 6px 15px rgba(0,0,0,0.08)",
  },

  form: {
    display: "grid",
    gap: "12px",
    marginTop: "20px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border:
      "1px solid #cbd5e1",
  },

  textarea: {
    padding: "12px",
    height: "120px",
    borderRadius: "10px",
    border:
      "1px solid #cbd5e1",
    resize: "none",
  },

  button: {
    padding: "14px",
    background:
      "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  list: {
    marginTop: "30px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "15px",
    boxShadow:
      "0 6px 15px rgba(0,0,0,0.08)",
    borderLeft:
      "5px solid #2563eb",
  },

  cardTop: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  priorityBadge: {
    color: "white",
    padding: "6px 12px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  date: {
    marginTop: "10px",
    fontSize: "12px",
    opacity: 0.7,
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  },

  editBtn: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  toggleBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  emptyState: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow:
      "0 6px 15px rgba(0,0,0,0.08)",
  },

  footer: {
    marginTop: "40px",
    background: "#0f172a",
    color: "white",
    padding: "25px",
    borderRadius: "18px",
    textAlign: "center",
  },
};

export default TicketSystem;