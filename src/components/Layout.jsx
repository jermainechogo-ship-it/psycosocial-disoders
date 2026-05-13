import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
  const { user, logout } = useAuth();

  // 🔥 REAL ACTIVE ROLE
  const role = user?.role || "user";

  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const [password, setPassword] = useState("");

  const MASTER_PASSWORD = "13052";

  // 🔐 OPEN SWITCH MODAL
  const handleRoleClick = (e) => {
    const newRole = e.target.value;

    // normal user mode
    if (newRole === "user") {
      const updatedUser = {
        ...user,
        role: "user",
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload();
      return;
    }

    setSelectedRole(newRole);
    setShowModal(true);
  };

  // 🔥 REAL ROLE SWITCH
  const handleUnlock = () => {
    if (password !== MASTER_PASSWORD) {
      alert("Wrong password");
      return;
    }

    const updatedUser = {
      ...user,
      role: selectedRole,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert(`Successfully switched to ${selectedRole}`);

    setShowModal(false);
    setPassword("");

    // 🔥 force refresh permissions
    window.location.reload();
  };

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2>MindSpace</h2>

        {/* 🔐 LOGIN STATUS */}
        <div style={styles.userBox}>
          {user ? (
            <>
              <p>
                👤 <b>{user.email}</b>
              </p>

              <p>
                Role: <b>{role}</b>
              </p>

              <button onClick={logout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <p>🔐 Not Logged In</p>
          )}
        </div>

        {/* 🎭 ROLE SWITCHER */}
        {user && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "12px" }}>
              Switch Role:
            </label>

            <select
              value={role}
              onChange={handleRoleClick}
              style={styles.select}
            >
              <option value="user">User</option>
              <option value="counselor">Counselor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        {/* 📌 NAVIGATION */}
        <nav style={styles.nav}>
          <NavLink to="/">Home</NavLink>

          <NavLink to="/learn">Disorders</NavLink>

          <NavLink to="/help">Help</NavLink>

          <NavLink to="/chatbot">Chatbot</NavLink>

          {!user && (
            <NavLink to="/auth">Login</NavLink>
          )}

          {/* 👤 USER ACCESS */}
          {user &&
            ["user", "counselor", "admin"].includes(role) && (
              <>
                <NavLink to="/assessment">
                  Assessment
                </NavLink>

                <NavLink to="/tickets">
                  Tickets
                </NavLink>
              </>
            )}

          {/* 👤 USER + ADMIN */}
           {user &&
             ["user", "admin", "counselor"].includes(role) && (
                 <NavLink to="/booking">
                  Booking System
               </NavLink>
             )}     

          {/* 👨‍⚕️ COUNSELOR + ADMIN */}
          {user &&
            ["counselor", "admin"].includes(role) && (
              <>
                <NavLink to="/dashboard">
                  Counselor Dashboard
                </NavLink>

                <NavLink to="/counselors">
                  Counselors
                </NavLink>
              </>
            )}

          {/* 👑 ADMIN ONLY */}
          {user && role === "admin" && (
            <NavLink to="/admin">
              Admin Dashboard
            </NavLink>
          )}
        </nav>
      </aside>

      <main style={styles.main}>{children}</main>

      {/* 🔐 PASSWORD MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>🔐 Enter Master Password</h3>

            <p>
              Unlock: <b>{selectedRole}</b>
            </p>

            <input
              type="password"
              placeholder="Enter password..."
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
                onClick={() => setShowModal(false)}
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
  },

  sidebar: {
    width: "260px",
    background: "#0f172a",
    color: "white",
    padding: "20px",
  },

  userBox: {
    background: "#1e293b",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
  },

  logoutBtn: {
    width: "100%",
    marginTop: "10px",
    padding: "8px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    marginTop: "5px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "20px",
  },

  main: {
    flex: 1,
    padding: "20px",
    background: "#f9fafb",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  unlockBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Layout;