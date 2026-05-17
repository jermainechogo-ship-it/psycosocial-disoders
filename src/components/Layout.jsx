import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
  const { user, logout } = useAuth();

  // 🔥 ACTIVE ROLE
  const role = user?.role || "user";

  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const [password, setPassword] = useState("");

  const MASTER_PASSWORD = "13052";

  // 🌙 NEW SIDEBAR TOGGLE
  const [collapsed, setCollapsed] = useState(false);

  // 🔐 ROLE SWITCH
  const handleRoleClick = (e) => {
    const newRole = e.target.value;

    if (newRole === "user") {
      const updatedUser = {
        ...user,
        role: "user",
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      window.location.reload();
      return;
    }

    setSelectedRole(newRole);
    setShowModal(true);
  };

  // 🔥 PASSWORD UNLOCK
  const handleUnlock = () => {
    if (password !== MASTER_PASSWORD) {
      alert("Wrong password");
      return;
    }

    const updatedUser = {
      ...user,
      role: selectedRole,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert(
      `🚀 Successfully switched to ${selectedRole}`
    );

    setShowModal(false);
    setPassword("");

    window.location.reload();
  };

  // 🧠 DYNAMIC GREETING
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "🌅 Good Morning";
    if (hour < 18) return "☀️ Good Afternoon";

    return "🌙 Good Evening";
  };

  return (
    <div style={styles.wrapper}>
      {/* 🌌 SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,
          width: collapsed ? "90px" : "280px",
        }}
      >
        {/* 🧠 LOGO */}
        <div style={styles.logoArea}>
          <h2 style={styles.logo}>
            {collapsed ? "🧠" : "MindSpace"}
          </h2>

          {!collapsed && (
            <p style={styles.logoSub}>
              Employee Psychosocial Care
            </p>
          )}
        </div>

        {/* 🍔 COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={styles.collapseBtn}
        >
          {collapsed ? "➡" : "⬅"}
        </button>

        {/* 👤 USER BOX */}
        <div style={styles.userBox}>
          {user ? (
            <>
              {!collapsed && (
                <>
                  <p style={styles.greeting}>
                    {getGreeting()}
                  </p>

                  <p>
                    👤 <b>{user.email}</b>
                  </p>

                  <div
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
                  </div>

                  {/* 📈 QUICK STATUS */}
                  <div style={styles.statusBox}>
                    <p>🟢 System Online</p>
                    <p>💬 AI Assistant Active</p>
                  </div>

                  <button
                    onClick={logout}
                    style={styles.logoutBtn}
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          ) : (
            <p>🔐 Not Logged In</p>
          )}
        </div>

        {/* 🎭 ROLE SWITCHER */}
        {user && !collapsed && (
          <div style={styles.roleSwitchBox}>
            <label style={styles.switchLabel}>
              Switch Role
            </label>

            <select
              value={role}
              onChange={handleRoleClick}
              style={styles.select}
            >
              <option value="user">User</option>
              <option value="counselor">
                Counselor
              </option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        {/* 📌 NAVIGATION */}
        <nav style={styles.nav}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive
                ? styles.activeLink
                : styles.link
            }
          >
            🏠 {!collapsed && "Home"}
          </NavLink>

          <NavLink
            to="/learn"
            style={({ isActive }) =>
              isActive
                ? styles.activeLink
                : styles.link
            }
          >
            📚 {!collapsed && "Disorders"}
          </NavLink>

          <NavLink
            to="/help"
            style={({ isActive }) =>
              isActive
                ? styles.activeLink
                : styles.link
            }
          >
            🆘 {!collapsed && "Help"}
          </NavLink>

          <NavLink
            to="/chatbot"
            style={({ isActive }) =>
              isActive
                ? styles.activeLink
                : styles.link
            }
          >
            🤖 {!collapsed && "AI Assistant"}
          </NavLink>

          {!user && (
            <NavLink
              to="/auth"
              style={({ isActive }) =>
                isActive
                  ? styles.activeLink
                  : styles.link
              }
            >
              🔐 {!collapsed && "Login"}
            </NavLink>
          )}

          {/* 👥 USER ACCESS */}
          {user &&
            [
              "user",
              "counselor",
              "admin",
            ].includes(role) && (
              <>
                <NavLink
                  to="/assessment"
                  style={({ isActive }) =>
                    isActive
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  🧠 {!collapsed && "Assessment"}
                </NavLink>

                <NavLink
                  to="/tickets"
                  style={({ isActive }) =>
                    isActive
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  🎫 {!collapsed && "Tickets"}
                </NavLink>

                <NavLink
                  to="/booking"
                  style={({ isActive }) =>
                    isActive
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  📅 {!collapsed && "Booking"}
                </NavLink>

                <NavLink
                  to="/counselors"
                  style={({ isActive }) =>
                    isActive
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  👨‍⚕️ {!collapsed && "Counselors"}
                </NavLink>
              </>
            )}

          {/* 👨‍⚕️ COUNSELOR + ADMIN */}
          {user &&
            ["counselor", "admin"].includes(
              role
            ) && (
              <>
                <NavLink
                  to="/dashboard"
                  style={({ isActive }) =>
                    isActive
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  📊 {!collapsed && "Dashboard"}
                </NavLink>
              </>
            )}

          {/* 👑 ADMIN */}
          {user && role === "admin" && (
            <NavLink
              to="/admin"
              style={({ isActive }) =>
                isActive
                  ? styles.activeLink
                  : styles.link
              }
            >
              👑 {!collapsed && "Admin"}
            </NavLink>
          )}
        </nav>

        {/* 🧠 WELLNESS FOOTER */}
        {!collapsed && (
          <div style={styles.footerBox}>
            <h4>Daily Wellness Tip</h4>

            <p style={styles.tip}>
              “Take short mental resets during work.
              Even a 5 minute pause can reduce
              stress overload.”
            </p>
          </div>
        )}
      </aside>

      {/* 🌍 MAIN CONTENT */}
      <main style={styles.main}>
        {/* 🔥 TOP HEADER */}
        <div style={styles.topBar}>
          <div>
            <h2 style={{ margin: 0 }}>
              Workplace Wellness Portal
            </h2>

            <p style={styles.topSubtitle}>
              Supporting employee wellbeing &
              psychosocial balance
            </p>
          </div>

          <div style={styles.liveBadge}>
            🟢 Live Support Active
          </div>
        </div>

        {/* 🌟 PAGE CONTENT */}
        <div style={styles.contentArea}>
          {children}
        </div>
      </main>

      {/* 🔐 MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              🔐 Secure Role Access
            </div>

            <p>
              Unlock:{" "}
              <b>{selectedRole.toUpperCase()}</b>
            </p>

            <input
              type="password"
              placeholder="Enter master password..."
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={styles.input}
            />

            <div style={styles.modalActions}>
              <button
                onClick={handleUnlock}
                style={styles.unlockBtn}
              >
                Unlock
              </button>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f1f5f9",
  },

  sidebar: {
    background:
      "linear-gradient(180deg,#020617,#0f172a,#1e293b)",
    color: "white",
    padding: "20px",
    transition: "0.3s",
    boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
    position: "relative",
  },

  logoArea: {
    marginBottom: "20px",
  },

  logo: {
    margin: 0,
    fontSize: "2rem",
    letterSpacing: "1px",
  },

  logoSub: {
    color: "#94a3b8",
    fontSize: "12px",
    marginTop: "5px",
  },

  collapseBtn: {
    position: "absolute",
    top: "20px",
    right: "-12px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  userBox: {
    background: "rgba(255,255,255,0.05)",
    padding: "14px",
    borderRadius: "14px",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  greeting: {
    color: "#38bdf8",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  roleBadge: {
    marginTop: "10px",
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  statusBox: {
    marginTop: "15px",
    background: "#0f172a",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "12px",
    lineHeight: "1.7",
  },

  logoutBtn: {
    width: "100%",
    marginTop: "15px",
    padding: "10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  roleSwitchBox: {
    marginBottom: "20px",
  },

  switchLabel: {
    fontSize: "13px",
    color: "#cbd5e1",
  },

  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "8px",
    border: "none",
    background: "#f8fafc",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  link: {
    textDecoration: "none",
    color: "#cbd5e1",
    padding: "12px",
    borderRadius: "10px",
    transition: "0.3s",
  },

  activeLink: {
    textDecoration: "none",
    background: "#2563eb",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(37,99,235,0.4)",
  },

  footerBox: {
    marginTop: "30px",
    background: "rgba(255,255,255,0.05)",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  tip: {
    fontSize: "13px",
    color: "#cbd5e1",
    lineHeight: "1.6",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  topBar: {
    background: "white",
    padding: "18px",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    marginBottom: "20px",
  },

  topSubtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  liveBadge: {
    background: "#dcfce7",
    color: "#166534",
    padding: "10px 14px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "13px",
  },

  contentArea: {
    background: "transparent",
    borderRadius: "14px",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(5px)",
  },

  modal: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  modalHeader: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "18px",
    gap: "10px",
  },

  unlockBtn: {
    flex: 1,
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  cancelBtn: {
    flex: 1,
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Layout;