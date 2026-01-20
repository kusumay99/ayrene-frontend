import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // ✅ USE AXIOS INSTANCE

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email: email.trim(),
        password,
        role,
      });

      const data = res.data;

      // ✅ Store auth info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role || role);
      localStorage.setItem("userId", data.userId);

      // ✅ Redirect based on role
      if ((data.role || role) === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      // ✅ Centralized Axios error handling
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.title}>Login</h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        {/* PASSWORD */}
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.passwordInput}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleBtn}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    background: "#f3f4f6",
  },
  card: {
    width: 400,
    padding: 30,
    borderRadius: 14,
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: "#111827",
    fontSize: 22,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 15,
  },
  passwordWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    border: "none",
    fontSize: 15,
    outline: "none",
  },
  toggleBtn: {
    padding: "0 12px",
    height: "100%",
    border: "none",
    background: "#e5e7eb",
    cursor: "pointer",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#1f2937",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
};
