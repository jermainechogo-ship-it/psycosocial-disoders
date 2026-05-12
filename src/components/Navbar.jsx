import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MindSpace</h2>

     <div style={styles.links}>
  <NavLink to="/" style={({ isActive }) => isActive ? styles.active : styles.link}>
    Home
  </NavLink>

  <div style={styles.dropdown}>
    <NavLink to="/learn" style={({ isActive }) => isActive ? styles.active : styles.link}>
      Learn
    </NavLink>

    <div style={styles.dropdownMenu}>
      <a href="/learn/depression">Depression</a>
      <a href="/learn/anxiety">Anxiety</a>
      <a href="/learn/ptsd">PTSD</a>
    </div>
  </div>

  <NavLink to="/help" style={({ isActive }) => isActive ? styles.active : styles.link}>
    Help
  </NavLink>
</div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 25px",
    background: "#ffffff",
    borderBottom: "1px solid #ddd",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
  },
  active: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
    borderBottom: "2px solid #2563eb",
    paddingBottom: "2px",
  },
  logo: {
    margin: 0,
  },
};


export default Navbar;