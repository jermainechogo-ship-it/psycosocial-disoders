import React from "react";
import { NavLink } from "react-router-dom";

function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2>MindSpace</h2>

        <nav style={styles.nav}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/learn">Disorders</NavLink>
          <NavLink to="/help">Help</NavLink>
          <NavLink to="/chatbot">Chatbot</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/counselors">Counselors</NavLink>
          <NavLink to="/auth">Sign Up / Login</NavLink>
        </nav>
      </aside>

      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "240px",
    background: "#0f172a",
    color: "white",
    padding: "20px",
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
};

export default Layout;