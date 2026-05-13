import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const CounselorDashboard = () => {
  // ✅ FIXED AUTH SYSTEM
  const { user } = useAuth();

  // ✅ FIXED ROLE DETECTION
  const role = user?.role || "user";

  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);

  // 💾 Load data from localStorage
  useEffect(() => {
    const savedTickets = localStorage.getItem("tickets");
    const savedBookings = localStorage.getItem("bookings");

    if (savedTickets) setTickets(JSON.parse(savedTickets));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  // 💾 Sync helpers
  const updateTickets = (updated) => {
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  };

  const updateBookings = (updated) => {
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
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
      <h1>👨‍⚕️ Counselor Dashboard</h1>

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

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        bookings.map((b) => (
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
                <h4>🧠 Decision Panel</h4>

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
    maxWidth: "1000px",
    margin: "auto",
  },

  restricted: {
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },

  cardBox: {
    background: "#0f172a",
    color: "white",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
  },

  sectionTitle: {
    marginTop: "30px",
  },

  itemCard: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    background: "white",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  decisionPanel: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
  },
};

export default CounselorDashboard;