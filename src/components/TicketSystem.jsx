import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const TicketSystem = () => {
  const { user } = useAuth(); // 👤 NEW ADDITION

  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    category: "other"
  });

  // 💾 Load from localStorage (USER-SPECIFIC)
  useEffect(() => {
    if (!user) return;

    const allTickets = JSON.parse(localStorage.getItem("tickets")) || {};
    const userTickets = allTickets[user.email] || [];

    setTickets(userTickets);
  }, [user]);

  // 💾 Save to localStorage (USER-SPECIFIC)
  useEffect(() => {
    if (!user) return;

    const allTickets = JSON.parse(localStorage.getItem("tickets")) || {};
    allTickets[user.email] = tickets;

    localStorage.setItem("tickets", JSON.stringify(allTickets));
  }, [tickets, user]);

  // 🧠 Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 📩 Submit or update ticket
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.message) return;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (editingId) {
      // ✏️ UPDATE MODE
      const updated = tickets.map((t) =>
        t.id === editingId ? { ...t, ...form } : t
      );

      setTickets(updated);
      setEditingId(null);
    } else {
      // ➕ CREATE MODE
      const newTicket = {
        id: Date.now(),
        ...form,
        status: "open",
        createdAt: new Date().toLocaleString(),
        owner: user.email // 👤 NEW IMPORTANT FIELD
      };

      setTickets([newTicket, ...tickets]);
    }

    // reset form
    setForm({
      name: "",
      email: "",
      message: "",
      category: "other"
    });
  };

  // 🗑 Delete ticket
  const deleteTicket = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
  };

  // ✏️ Edit ticket
  const editTicket = (ticket) => {
    setForm({
      name: ticket.name,
      email: ticket.email,
      message: ticket.message,
      category: ticket.category
    });
    setEditingId(ticket.id);
  };

  // 🔄 Toggle status
  const toggleStatus = (id) => {
    const updated = tickets.map((t) =>
      t.id === id
        ? { ...t, status: t.status === "open" ? "resolved" : "open" }
        : t
    );
    setTickets(updated);
  };

  // 🎛 Filter logic
  const filteredTickets = tickets.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  // 🔐 BLOCK IF NOT LOGGED IN
  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>🔐 Please login to access tickets</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>🧠 Psychosocial Support Tickets</h1>

      {/* 🎛 FILTERS */}
      <div style={styles.filters}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("open")}>Open</button>
        <button onClick={() => setFilter("resolved")}>Resolved</button>
      </div>

      {/* 🧾 FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="stress">Stress</option>
          <option value="anxiety">Anxiety</option>
          <option value="depression">Depression</option>
          <option value="other">Other</option>
        </select>

        <textarea
          name="message"
          placeholder="Describe your situation..."
          value={form.message}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          {editingId ? "Update Ticket" : "Submit Ticket"}
        </button>
      </form>

      {/* 📋 LIST */}
      <div style={styles.list}>
        {filteredTickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          filteredTickets.map((t) => (
            <div key={t.id} style={styles.card}>
              <h3>{t.name}</h3>
              <p><b>Category:</b> {t.category}</p>
              <p>{t.message}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={{ color: t.status === "open" ? "red" : "green" }}>
                  {t.status}
                </span>
              </p>

              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                {t.createdAt}
              </p>

              <div style={styles.actions}>
                <button onClick={() => editTicket(t)}>Edit</button>
                <button onClick={() => deleteTicket(t.id)}>Delete</button>
                <button onClick={() => toggleStatus(t.id)}>
                  Toggle Status
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px" },
  textarea: { padding: "10px", height: "100px", border: "1px solid #ccc", borderRadius: "6px" },
  button: { padding: "10px", backgroundColor: "#2d6cdf", color: "white", border: "none", borderRadius: "6px" },
  list: { marginTop: "20px" },
  card: { border: "1px solid #ddd", padding: "10px", borderRadius: "6px", marginBottom: "10px" },
  actions: { display: "flex", gap: "10px", marginTop: "10px" },
  filters: { display: "flex", gap: "10px", marginBottom: "15px" }
};

export default TicketSystem;