import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const BookingSystem = () => {
  const { user } = useAuth(); // 🔐 ADDED

  const [bookings, setBookings] = useState([]);

  const [form, setForm] = useState({
    name: "",
    counselor: "Counselor A",
    date: "",
    time: ""
  });

  // 💾 Load saved bookings
  useEffect(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  // 💾 Save bookings
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 📅 CREATE BOOKING (USER ONLY)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.date || !form.time) return;

    const newBooking = {
      id: Date.now(),
      ...form,
      status: "pending",
      createdAt: new Date().toLocaleString(),
      createdBy: user?.email || "anonymous" // 🔐 ADDED
    };

    setBookings([newBooking, ...bookings]);

    setForm({
      name: "",
      counselor: "Counselor A",
      date: "",
      time: ""
    });
  };

  // 🗑 Delete booking (USER CAN DELETE ONLY THEIR OWN)
  const deleteBooking = (id) => {
    const updated = bookings.filter((b) => {
      const target = b.id === id;
      const isOwner = b.createdBy === user?.email;
      return !(target && isOwner);
    });

    setBookings(updated);
  };

  // 🚫 REMOVED USER STATUS TOGGLE (IMPORTANT FIX)
  // Only counselors can approve now → handled in CounselorDashboard

  return (
    <div style={styles.container}>
      <h1>📅 Counseling Booking System</h1>

      {/* 🧾 FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
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
          <option value="Counselor A">Counselor A</option>
          <option value="Counselor B">Counselor B</option>
          <option value="Counselor C">Counselor C</option>
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

        <button type="submit" style={styles.button}>
          Book Session
        </button>
      </form>

      {/* 📋 BOOKINGS LIST */}
      <div style={styles.list}>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} style={styles.card}>
              <h3>{b.name}</h3>
              <p><b>Counselor:</b> {b.counselor}</p>
              <p><b>Date:</b> {b.date}</p>
              <p><b>Time:</b> {b.time}</p>

              {/* 🔐 SAFE STATUS DISPLAY ONLY */}
              <p>
                <b>Status:</b>{" "}
                <span style={{
                  color:
                    b.status === "confirmed"
                      ? "green"
                      : b.status === "rejected"
                      ? "red"
                      : "orange"
                }}>
                  {b.status}
                </span>
              </p>

              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                {b.createdAt}
              </p>

              {/* 🗑 ONLY OWNER CAN DELETE */}
              {b.createdBy === user?.email && (
                <div style={styles.actions}>
                  <button onClick={() => deleteBooking(b.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    maxWidth: "800px",
    margin: "auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px"
  },
  list: {
    marginTop: "20px"
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px"
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  }
};

export default BookingSystem;