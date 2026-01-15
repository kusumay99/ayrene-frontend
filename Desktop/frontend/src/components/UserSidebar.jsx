import { useNavigate, useLocation } from "react-router-dom";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/user" },
    // Future sprint pages can be added here
    // { name: "Messages", path: "/user/messages" },
    // { name: "Profile", path: "/user/profile" },
  ];

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.link,
                ...(isActive ? styles.active : {}),
              }}
            >
              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#111827",
    color: "white",
    padding: "20px",
    minHeight: "100vh",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: "6px",
    transition: "background 0.2s",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left",
  },
  active: {
    background: "#1F2937",
  },
};
