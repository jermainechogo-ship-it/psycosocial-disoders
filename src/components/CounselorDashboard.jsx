import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const CounselorDashboard = () => {
  // ✅ FIXED AUTH SYSTEM
  const { user } = useAuth();

  // ✅ FIXED ROLE DETECTION
  const role = user?.role || "user";

  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);

  // 🔥 NEW STATES
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [motivation, setMotivation] = useState(
    "🌱 Every conversation can change someone's day."
  );

  // 💾 Load data from localStorage
  useEffect(() => {
    const savedTickets = localStorage.getItem("tickets");
    const savedBookings = localStorage.getItem("bookings");

    if (savedTickets) setTickets(JSON.parse(savedTickets));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  // 🔔 AUTO NOTIFICATIONS SYSTEM
  useEffect(() => {
    const newNotifications = [];

    tickets.forEach((t) => {
      if (t.status === "open") {
        newNotifications.push(
          `📩 Open ticket from ${t.name}`
        );
      }
    });

    bookings.forEach((b) => {
      if (b.status === "pending") {
        newNotifications.push(
          `📅 Pending booking from ${b.name}`
        );
      }
    });

    setNotifications(newNotifications);
  }, [tickets, bookings]);

  // 💾 Sync helpers
  const updateTickets = (updated) => {
    setTickets(updated);
    localStorage.setItem(
      "tickets",
      JSON.stringify(updated)
    );
  };

  const updateBookings = (updated) => {
    setBookings(updated);
    localStorage.setItem(
      "bookings",
      JSON.stringify(updated)
    );
  };

  // 🔄 Ticket actions
  const toggleTicketStatus = (id) => {
    const updated = tickets.map((t) =>
      t.id === id
        ? {
            ...t,
            status:
              t.status === "open"
                ? "resolved"
                : "open",
          }
        : t
    );

    updateTickets(updated);
  };

  const deleteTicket = (id) => {
    updateTickets(
      tickets.filter((t) => t.id !== id)
    );
  };

  // 🔄 Booking actions
  const toggleBookingStatus = (id) => {
    const updated = bookings.map((b) =>
      b.id === id
        ? {
            ...b,
            status:
              b.status === "pending"
                ? "confirmed"
                : "pending",
          }
        : b
    );

    updateBookings(updated);
  };

  const deleteBooking = (id) => {
    updateBookings(
      bookings.filter((b) => b.id !== id)
    );
  };

  // 🧠 APPROVAL SYSTEM
  const approveBooking = (id) => {
    const updated = bookings.map((b) =>
      b.id === id
        ? {
            ...b,
            status: "approved",
          }
        : b
    );

    updateBookings(updated);
  };

  const rejectBooking = (id) => {
    const updated = bookings.map((b) =>
      b.id === id
        ? {
            ...b,
            status: "rejected",
          }
        : b
    );

    updateBookings(updated);
  };

  // 🔥 QUICK NOTES SYSTEM
  const saveQuickNote = () => {
    localStorage.setItem(
      "dashboardNote",
      motivation
    );

    alert("📝 Wellness note saved");
  };

  // 🔎 SEARCH FILTER
  const filteredBookings = bookings.filter((b) =>
    b.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🔒 ROLE PROTECTION
  if (role === "user") {
    return (
      <div style={styles.restricted}>
        <h2>🔒 Access Restricted</h2>

        <p>
          This dashboard is only available
          in <b>Counselor</b> or{" "}
          <b>Admin</b> mode.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <div>
          <h1>👨‍⚕️ Counselor Dashboard</h1>

          <p>
            Welcome back,{" "}
            <b>{user?.email}</b>
          </p>
        </div>

        <div style={styles.roleBadge}>
          {role.toUpperCase()}
        </div>
      </div>

      {/* 🔔 NOTIFICATIONS */}
      <div style={styles.notificationPanel}>
        <h3>🔔 Live Notifications</h3>

        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          notifications.map((n, i) => (
            <div key={i} style={styles.notification}>
              {n}
            </div>
          ))
        )}
      </div>

      {/* 📊 STATS */}
      <div style={styles.statsGrid}>
        <div style={styles.cardBox}>
          <h2>{tickets.length}</h2>
          <p>Total Tickets</p>
        </div>

        <div style={styles.cardBox}>
          <h2>
            {
              tickets.filter(
                (t) => t.status === "open"
              ).length
            }
          </h2>

          <p>Open Tickets</p>
        </div>

        <div style={styles.cardBox}>
          <h2>{bookings.length}</h2>
          <p>Total Bookings</p>
        </div>

        <div style={styles.cardBox}>
          <h2>
            {
              bookings.filter(
                (b) =>
                  b.status === "approved"
              ).length
            }
          </h2>

          <p>Approved Sessions</p>
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <div style={styles.searchBox}>
        <input
          placeholder="🔎 Search bookings by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.searchInput}
        />
      </div>

      {/* 🌱 WELLNESS NOTE */}
      <div style={styles.noteCard}>
        <h3>🌱 Counselor Wellness Note</h3>

        <textarea
          value={motivation}
          onChange={(e) =>
            setMotivation(e.target.value)
          }
          style={styles.textarea}
        />

        <button
          onClick={saveQuickNote}
          style={styles.saveBtn}
        >
          Save Note
        </button>
      </div>

      {/* 📩 TICKETS */}
      <h2 style={styles.sectionTitle}>
        📩 Tickets
      </h2>

      {tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        tickets.map((t) => (
          <div
            key={t.id}
            style={styles.itemCard}
          >
            <h3>{t.name}</h3>

            <p>{t.message}</p>

            <p>
              Status:{" "}
              <b
                style={{
                  color:
                    t.status === "open"
                      ? "#ef4444"
                      : "#22c55e",
                }}
              >
                {t.status}
              </b>
            </p>

            <div style={styles.actions}>
              <button
                onClick={() =>
                  toggleTicketStatus(t.id)
                }
              >
                Toggle
              </button>

              <button
                onClick={() =>
                  deleteTicket(t.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* 📅 BOOKINGS */}
      <h2 style={styles.sectionTitle}>
        📅 Bookings
      </h2>

      {filteredBookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        filteredBookings.map((b) => (
          <div
            key={b.id}
            style={styles.itemCard}
          >
            <h3>{b.name}</h3>

            <p>
              {b.date} at {b.time}
            </p>

            <p>
              Counselor:{" "}
              <b>{b.counselor}</b>
            </p>

            <p>
              Status:{" "}
              <b
                style={{
                  color:
                    b.status === "approved"
                      ? "#22c55e"
                      : b.status ===
                        "rejected"
                      ? "#ef4444"
                      : "#f59e0b",
                }}
              >
                {b.status}
              </b>
            </p>

            {/* 🧠 DECISION PANEL */}
            {(role === "counselor" ||
              role === "admin") && (
              <div
                style={styles.decisionPanel}
              >
                <h4>
                  🧠 Decision Panel
                </h4>

                <div style={styles.actions}>
                  <button
                    onClick={() =>
                      approveBooking(b.id)
                    }
                  >
                    ✅ Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectBooking(b.id)
                    }
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            )}

            {/* GENERAL ACTIONS */}
            <div style={styles.actions}>
              <button
                onClick={() =>
                  toggleBookingStatus(b.id)
                }
              >
                Toggle
              </button>

              <button
                onClick={() =>
                  deleteBooking(b.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    maxWidth: "1100px",
    margin: "auto",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a)",
    color: "white",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "20px",
  },

  roleBadge: {
    background: "#22c55e",
    padding: "10px 18px",
    borderRadius: "999px",
    fontWeight: "bold",
  },

  restricted: {
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial",
  },

  notificationPanel: {
    background: "white",
    padding: "18px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
  },

  notification: {
    background: "#eff6ff",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "8px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  cardBox: {
    background: "#0f172a",
    color: "white",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.15)",
  },

  searchBox: {
    marginBottom: "20px",
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  noteCard: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "25px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  saveBtn: {
    marginTop: "10px",
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  sectionTitle: {
    marginTop: "30px",
    marginBottom: "15px",
  },

  itemCard: {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "14px",
    background: "white",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.05)",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap",
  },

  decisionPanel: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "10px",
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
  },
};

export default CounselorDashboard;