import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h3>Admin Panel</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

const styles = {
  nav: {
    height: "60px",
    background: "#1f2937",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
};
