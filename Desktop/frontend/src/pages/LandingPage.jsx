import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* ================= HEADER ================= */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Ayrene</h1>
      </header>

      {/* ================= HERO ================= */}
      <section style={styles.hero}>
        <h2 style={styles.heroTitle}>
          Secure AI Messaging Platform for Teams & Enterprises
        </h2>
        <p style={styles.heroSubtitle}>
          Monitor conversations, manage teams, and analyze AI interactions —
          all from one powerful dashboard.
        </p>

        <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
          Get Started
        </button>
      </section>

      {/* ================= FEATURES ================= */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Core Features</h3>

        <div style={styles.grid}>
          <Feature
            title="AI Message Processing"
            text="Store original & processed messages with language detection and AI mode."
          />
          <Feature
            title="Audit & Activity Logs"
            text="Track logins, message activity, and admin actions securely."
          />
          <Feature
            title="Role-Based Access"
            text="Admin, Manager, and Staff roles with strict permission control."
          />
          <Feature
            title="Team Management"
            text="Organize users into teams and manage access efficiently."
          />
          <Feature
            title="Admin Dashboard"
            text="Monitor users, messages, teams, and system health."
          />
          <Feature
            title="Analytics & Insights"
            text="Understand usage trends and AI activity across teams."
          />
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section style={styles.sectionAlt}>
        <h3 style={styles.sectionTitle}>Built for Every Role</h3>

        <div style={styles.roles}>
          <Role
            title="Admin"
            points={[
              "User & team management",
              "Audit logs & analytics",
              "System configuration",
            ]}
          />
          <Role
            title="Manager"
            points={[
              "Team monitoring",
              "Conversation insights",
              "Performance overview",
            ]}
          />
          <Role
            title="Staff"
            points={[
              "AI messaging",
              "Secure sessions",
              "Team-based access",
            ]}
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section style={styles.cta}>
        <h3 style={styles.ctaTitle}>
          Ready to manage AI conversations the smart way?
        </h3>
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} Ayrene. All rights reserved.
      </footer>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const Feature = ({ title, text }) => (
  <div style={styles.card}>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

const Role = ({ title, points }) => (
  <div style={styles.roleCard}>
    <h4>{title}</h4>
    <ul>
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

/* ================= STYLES ================= */

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    color: "#111827",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #e5e7eb",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  loginBtn: {
    background: "#111827",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  hero: {
    textAlign: "center",
    padding: "80px 20px",
    background: "linear-gradient(135deg, #111827, #1f2937)",
    color: "white",
  },

  heroTitle: {
    fontSize: "36px",
    maxWidth: "800px",
    margin: "0 auto 20px",
  },

  heroSubtitle: {
    fontSize: "18px",
    maxWidth: "700px",
    margin: "0 auto 30px",
    opacity: 0.9,
  },

  primaryBtn: {
    background: "white",
    color: "#111827",
    padding: "14px 28px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  section: {
    padding: "70px 40px",
    background: "#ffffff",
  },

  sectionAlt: {
    padding: "70px 40px",
    background: "#f9fafb",
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
  },

  card: {
    padding: "25px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#fff",
  },

  roles: {
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  roleCard: {
    width: "280px",
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },

  cta: {
    textAlign: "center",
    padding: "80px 20px",
    background: "#111827",
    color: "white",
  },

  ctaTitle: {
    fontSize: "26px",
    marginBottom: "25px",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#0f172a",
    color: "#9ca3af",
    fontSize: "14px",
  },
};
