import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const [showResources, setShowResources] = useState(false);

  const role = user?.role || "Guest";

  return (
    <nav style={styles.nav}>
      {/* 🌌 LOGO AREA */}
      <div style={styles.logoSection}>
        <h2 style={styles.logo}>MindSpace</h2>

        <div style={styles.logoSub}>
          Employee Wellness & Psychosocial Care
        </div>
      </div>

      {/* 🔗 LINKS */}
      <div style={styles.links}>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          🏠 Home
        </NavLink>

        {/* 📚 LEARN DROPDOWN */}
        <div
          style={styles.dropdown}
          onMouseEnter={() => setShowResources(true)}
          onMouseLeave={() => setShowResources(false)}
        >
          <NavLink
            to="/learn"
            style={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            📚 Learn
          </NavLink>

          {showResources && (
            <div style={styles.dropdownMenu}>
              <a href="/learn/depression" style={styles.dropdownItem}>
                Depression
              </a>

              <a href="/learn/anxiety" style={styles.dropdownItem}>
                Anxiety
              </a>

              <a href="/learn/ptsd" style={styles.dropdownItem}>
                PTSD
              </a>

              <a href="/learn/burnout" style={styles.dropdownItem}>
                Workplace Burnout
              </a>

              <a href="/learn/imposter-syndrome" style={styles.dropdownItem}>
                Imposter Syndrome
              </a>

              <a href="/learn/workplace-anxiety" style={styles.dropdownItem}>
                Workplace Anxiety
              </a>
            </div>
          )}
        </div>

        <NavLink
          to="/tickets"
          style={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          🎫 Tickets
        </NavLink>

        <NavLink
          to="/booking"
          style={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          📅 Booking
        </NavLink>

        <NavLink
          to="/counselors"
          style={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          👨‍⚕️ Counselors
        </NavLink>

        <NavLink
          to="/chatbot"
          style={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          🤖 Assistant
        </NavLink>

        <NavLink
          to="/help"
          style={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          🆘 Help
        </NavLink>

        {/* 🔐 DASHBOARD */}
        {(role === "admin" || role === "counselor") && (
          <NavLink
            to="/dashboard"
            style={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            📊 Dashboard
          </NavLink>
        )}
      </div>

      {/* 👤 USER AREA */}
      <div style={styles.userPanel}>
        {user ? (
          <>
            <div style={styles.userCard}>
              <span style={styles.userEmail}>
                {user.email}
              </span>

              <span
                style={{
                  ...styles.roleBadge,
                  background:
                    role === "admin"
                      ? "#dc2626"
                      : role === "counselor"
                      ? "#2563eb"
                      : "#16a34a",
                }}
              >
                {role.toUpperCase()}
              </span>
            </div>

            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/auth"
            style={({ isActive }) =>
              isActive ? styles.active : styles.loginBtn
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    background:
      "linear-gradient(90deg,#0f172a,#1e293b,#334155)",
    borderBottom: "1px solid #1e293b",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    flexWrap: "wrap",
    gap: "15px",
  },

  logoSection: {
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    margin: 0,
    color: "white",
    fontSize: "1.7rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  logoSub: {
    color: "#cbd5e1",
    fontSize: "12px",
    marginTop: "2px",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },

  link: {
    textDecoration: "none",
    color: "#e2e8f0",
    fontWeight: "500",
    transition: "0.3s",
  },

  active: {
    textDecoration: "none",
    color: "#38bdf8",
    fontWeight: "bold",
    borderBottom: "2px solid #38bdf8",
    paddingBottom: "3px",
  },

  dropdown: {
    position: "relative",
  },

  dropdownMenu: {
    position: "absolute",
    top: "35px",
    left: 0,
    background: "white",
    borderRadius: "12px",
    minWidth: "220px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },

  dropdownItem: {
    textDecoration: "none",
    color: "#1e293b",
    padding: "8px",
    borderRadius: "8px",
    transition: "0.2s",
    background: "#f8fafc",
  },

  userPanel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.08)",
    padding: "8px 12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  userEmail: {
    color: "white",
    fontSize: "13px",
  },

  roleBadge: {
    color: "white",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  loginBtn: {
    textDecoration: "none",
    background: "#2563eb",
    color: "white",
    padding: "10px 14px",
    borderRadius: "10px",
    fontWeight: "bold",
  },
};

export default Navbar;