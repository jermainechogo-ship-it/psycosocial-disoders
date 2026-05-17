import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

const BookingSystem = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);

  const [form, setForm] = useState({
    name: "",
    counselor: "Counselor A",
    date: "",
    time: "",
  });

  // ✨ NEW STATES
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  // 🌱 Wellness quotes
  const quotes = [
    "Small progress is still progress.",
    "Rest is productive too.",
    "Your mental health matters.",
    "A healthy mind builds healthy work.",
    "Healing is not linear.",
  ];

  // 💾 Load saved bookings
  useEffect(() => {
    const saved = localStorage.getItem("bookings");

    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  // 💾 Save bookings
  useEffect(() => {
    localStorage.setItem(
      "bookings",
      JSON.stringify(bookings)
    );
  }, [bookings]);

  // ✨ AUTO QUOTE ROTATOR
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) =>
        prev === quotes.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 📅 CREATE BOOKING
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.date ||
      !form.time
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...form,
      status: "pending",
      priority: "normal",
      createdAt:
        new Date().toLocaleString(),
      createdBy:
        user?.email || "anonymous",
    };

    setBookings([
      newBooking,
      ...bookings,
    ]);

    // ✨ SUCCESS POPUP
    setSuccessMessage(
      "✅ Session request successfully sent!"
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    setForm({
      name: "",
      counselor: "Counselor A",
      date: "",
      time: "",
    });
  };

  // 🗑 DELETE OWN BOOKINGS
  const deleteBooking = (id) => {
    const updated = bookings.filter(
      (b) => {
        const target = b.id === id;
        const isOwner =
          b.createdBy === user?.email;

        return !(target && isOwner);
      }
    );

    setBookings(updated);
  };

  // ✨ FILTERED BOOKINGS
  const filteredBookings =
    bookings.filter((b) =>
      b.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // ✨ LIVE STATS
  const stats = useMemo(() => {
    return {
      total: bookings.length,
      approved: bookings.filter(
        (b) => b.status === "approved"
      ).length,
      pending: bookings.filter(
        (b) => b.status === "pending"
      ).length,
      rejected: bookings.filter(
        (b) => b.status === "rejected"
      ).length,
    };
  }, [bookings]);

  return (
    <div style={styles.page}>
      {/* 🌌 HERO */}
      <div style={styles.hero}>
        <div>
          <h1 style={styles.heroTitle}>
            📅 Employee Wellness Booking Hub
          </h1>

          <p style={styles.heroText}>
            Secure counseling support for
            stress, burnout, anxiety,
            workplace pressure, and
            emotional wellbeing.
          </p>
        </div>

        <div style={styles.quoteCard}>
          <h3>🌱 Wellness Reminder</h3>

          <p>{quotes[quoteIndex]}</p>
        </div>
      </div>

      {/* ✨ SUCCESS MESSAGE */}
      {successMessage && (
        <div style={styles.successBox}>
          {successMessage}
        </div>
      )}

      {/* 📊 LIVE STATS */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2>{stats.total}</h2>
          <p>Total Requests</p>
        </div>

        <div style={styles.statCard}>
          <h2>{stats.pending}</h2>
          <p>Pending</p>
        </div>

        <div style={styles.statCard}>
          <h2>{stats.approved}</h2>
          <p>Approved</p>
        </div>

        <div style={styles.statCard}>
          <h2>{stats.rejected}</h2>
          <p>Rejected</p>
        </div>
      </div>

      {/* 🧾 FORM SECTION */}
      <div style={styles.formWrapper}>
        <h2>🧠 Book Counseling Session</h2>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="counselor"
            value={form.counselor}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Counselor A">
              Counselor A
            </option>

            <option value="Counselor B">
              Counselor B
            </option>

            <option value="Counselor C">
              Counselor C
            </option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            style={styles.input}
          />

          {/* ✨ PRIORITY */}
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="normal">
              🟢 Normal Priority
            </option>

            <option value="urgent">
              🔴 Urgent Support
            </option>
          </select>

          <button
            type="submit"
            style={styles.button}
          >
            🚀 Book Session
          </button>
        </form>
      </div>

      {/* 🔎 SEARCH */}
      <div style={styles.searchBox}>
        <input
          placeholder="Search bookings by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.searchInput}
        />
      </div>

      {/* 📋 BOOKINGS */}
      <div style={styles.list}>
        <h2 style={styles.sectionTitle}>
          📋 Session Requests
        </h2>

        {filteredBookings.length === 0 ? (
          <div style={styles.emptyState}>
            <h3>
              🌙 No bookings found
            </h3>

            <p>
              The booking galaxy is quiet
              right now.
            </p>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              style={styles.card}
            >
              <div style={styles.cardHeader}>
                <h3>{b.name}</h3>

                <span
                  style={{
                    ...styles.priorityBadge,
                    background:
                      b.priority ===
                      "urgent"
                        ? "#ef4444"
                        : "#22c55e",
                  }}
                >
                  {b.priority || "normal"}
                </span>
              </div>

              <p>
                <b>👨‍⚕️ Counselor:</b>{" "}
                {b.counselor}
              </p>

              <p>
                <b>📅 Date:</b>{" "}
                {b.date}
              </p>

              <p>
                <b>⏰ Time:</b>{" "}
                {b.time}
              </p>

              <p>
                <b>📌 Status:</b>{" "}
                <span
                  style={{
                    color:
                      b.status ===
                      "approved"
                        ? "#22c55e"
                        : b.status ===
                          "rejected"
                        ? "#ef4444"
                        : "#f59e0b",
                    fontWeight: "bold",
                  }}
                >
                  {b.status}
                </span>
              </p>

              <p
                style={
                  styles.createdText
                }
              >
                Created: {b.createdAt}
              </p>

              {/* ✨ OWNER ACTIONS */}
              {b.createdBy ===
                user?.email && (
                <div
                  style={styles.actions}
                >
                  <button
                    onClick={() =>
                      deleteBooking(
                        b.id
                      )
                    }
                    style={
                      styles.deleteBtn
                    }
                  >
                    🗑 Cancel Request
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ✨ SUPPORT FOOTER */}
      <div style={styles.footerBox}>
        <h3>
          💙 Employee Support Reminder
        </h3>

        <p>
          Seeking support early can help
          reduce burnout, improve focus,
          and strengthen emotional
          resilience in the workplace.
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

  hero: {
    background:
      "linear-gradient(135deg,#1e293b,#2563eb,#38bdf8)",
    color: "white",
    padding: "30px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)",
  },

  heroTitle: {
    fontSize: "2.3rem",
    marginBottom: "10px",
  },

  heroText: {
    maxWidth: "650px",
    opacity: 0.9,
  },

  quoteCard: {
    background:
      "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "14px",
    backdropFilter: "blur(8px)",
    minWidth: "220px",
  },

  successBox: {
    background: "#dcfce7",
    color: "#166534",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "20px",
    fontWeight: "bold",
    textAlign: "center",
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

  formWrapper: {
    marginTop: "30px",
    background: "white",
    padding: "25px",
    borderRadius: "18px",
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
    border: "1px solid #cbd5e1",
    fontSize: "15px",
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
    fontSize: "15px",
  },

  searchBox: {
    marginTop: "30px",
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
  },

  sectionTitle: {
    marginBottom: "20px",
  },

  list: {
    marginTop: "30px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "16px",
    boxShadow:
      "0 6px 15px rgba(0,0,0,0.08)",
    borderLeft:
      "5px solid #2563eb",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
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

  createdText: {
    marginTop: "10px",
    fontSize: "12px",
    opacity: 0.7,
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  deleteBtn: {
    background: "#ef4444",
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

  footerBox: {
    marginTop: "40px",
    background: "#0f172a",
    color: "white",
    padding: "25px",
    borderRadius: "18px",
    textAlign: "center",
  },
};

export default BookingSystem;