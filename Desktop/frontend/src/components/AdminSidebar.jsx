import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div style={styles.sidebar}>

      <NavLink
        to="/admin"
        style={({ isActive }) =>
          isActive ? { ...styles.link, ...styles.active } : styles.link
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/users"
        style={({ isActive }) =>
          isActive ? { ...styles.link, ...styles.active } : styles.link
        }
      >
        Users
      </NavLink>

      {/* ✅ Create User */}
      <NavLink
        to="/admin/users/create"
        style={({ isActive }) =>
          isActive ? { ...styles.link, ...styles.active } : styles.link
        }
      >
        Create User
      </NavLink>

      <NavLink
        to="/admin/teams"
        style={({ isActive }) =>
          isActive ? { ...styles.link, ...styles.active } : styles.link
        }
      >
        Teams
      </NavLink>

      <NavLink
        to="/admin/messages"
        style={({ isActive }) =>
          isActive ? { ...styles.link, ...styles.active } : styles.link
        }
      >
        Messages
      </NavLink>

      <NavLink
        to="/admin/audit"
        style={({ isActive }) =>
          isActive ? { ...styles.link, ...styles.active } : styles.link
        }
      >
        Audit Logs
      </NavLink>

      <NavLink
        to="/admin/analytics"
        style={({ isActive }) =>
          isActive ? { ...styles.link, ...styles.active } : styles.link
        }
      >
        Analytics
      </NavLink>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#111827",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#FBBF24",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "background 0.2s",
  },
  active: {
    background: "#1F2937",
  },
};
