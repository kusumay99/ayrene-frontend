import { useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h3 style={styles.title}>User Panel</h3>
      <button style={styles.logout} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  nav: {
    height: "60px",
    background: "#111827", // matches the user sidebar
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "white", // matches sidebar title accent
  },
  logout: {
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};
