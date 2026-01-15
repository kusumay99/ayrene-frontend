import { useEffect, useState } from "react";
import API from "../../utils/api";
import AdminLayout from "../../components/AdminLayout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeams: 0,
    totalMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Admin dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h4>Total Users</h4>
          <p>{stats.totalUsers}</p>
        </div>

        <div style={cardStyle}>
          <h4>Total Teams</h4>
          <p>{stats.totalTeams}</p>
        </div>

        <div style={cardStyle}>
          <h4>Total Messages</h4>
          <p>{stats.totalMessages}</p>
        </div>
      </div>
    </AdminLayout>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  width: "180px",
  textAlign: "center",
};
