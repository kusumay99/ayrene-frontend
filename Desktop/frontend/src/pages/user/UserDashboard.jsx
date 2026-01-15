import React, { useEffect, useState } from "react";
import API from "../../utils/api"; // Axios instance
import UserLayout from "../../components/UserLayout";

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ totalMessages: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [adminActivities, setAdminActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Fetch user dashboard info
        const res = await API.get("/user/dashboard");
        setProfile(res.data.profile);
        setStats(res.data.stats || { totalMessages: 0 });
        setRecentMessages(res.data.recentMessages || []);
        setAdminActivities(res.data.adminActivities || []);

        // Fetch all messages separately
        const msgRes = await API.get("/user/messages");
        // Ensure it's always an array
        setAllMessages(Array.isArray(msgRes.data) ? msgRes.data : []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return (
      <UserLayout>
        <h3>Loading dashboard...</h3>
      </UserLayout>
    );

  if (error)
    return (
      <UserLayout>
        <p style={{ color: "red" }}>{error}</p>
      </UserLayout>
    );

  // Helper to safely get a date
  const formatDate = (msg) => {
    const date = msg.timestamp || msg.createdAt;
    return date ? new Date(date).toLocaleString() : "-";
  };

  return (
    <UserLayout>
      <div style={{ padding: "24px" }}>
        <h2>User Dashboard</h2>

        {/* PROFILE */}
        <section style={card}>
          <h3>Profile</h3>
          <p><b>Name:</b> {profile?.name || "N/A"}</p>
          <p><b>Email:</b> {profile?.email || "N/A"}</p>
          <p><b>Role:</b> {profile?.role || "N/A"}</p>
          <p><b>Team:</b> {profile?.team?.name || "N/A"}</p>
        </section>

        {/* STATS */}
        <section style={card}>
          <h3>Statistics</h3>
          <p>Total Messages: <b>{stats.totalMessages}</b></p>
          <p>Recent Messages: <b>{recentMessages.length}</b></p>
        </section>

        {/* RECENT MESSAGES */}
        {recentMessages.length > 0 && (
          <section style={card}>
            <h3>Recent Messages</h3>
            <ul>
              {recentMessages.map((msg) => (
                <li key={msg._id} style={recentMsgStyle}>
                  <b>{msg.ai_mode || "manual"}</b> | {msg.detected_language || "unknown"}<br />
                  {msg.processed_text || "-"}<br />
                  <small>{formatDate(msg)}</small>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ADMIN ACTIVITIES */}
        {adminActivities.length > 0 && (
          <section style={card}>
            <h3>Admin Activities</h3>
            <ul>
              {adminActivities.map((act) => (
                <li key={act._id} style={recentMsgStyle}>
                  <b>{act.performed_by?.name || "Admin"}</b> ({act.performed_by?.role || "admin"})<br />
                  Action: {act.action}<br />
                  <small>{formatDate(act)}</small>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ALL MESSAGES TABLE */}
        <section style={card}>
          <h3>All Messages</h3>
          {allMessages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "scroll" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thTd}>Original Text</th>
                    <th style={thTd}>Processed Text</th>
                    <th style={thTd}>AI Mode</th>
                    <th style={thTd}>Language</th>
                    <th style={thTd}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {allMessages.map((msg, idx) => (
                    <tr key={msg._id} style={idx < 5 ? recentRowStyle : {}}>
                      <td style={thTd}>{msg.original_text || "-"}</td>
                      <td style={thTd}>{msg.processed_text || "-"}</td>
                      <td style={thTd}>{msg.ai_mode || "manual"}</td>
                      <td style={thTd}>{msg.detected_language || "unknown"}</td>
                      <td style={thTd}>{formatDate(msg)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </UserLayout>
  );
}

/* ================= STYLES ================= */
const card = {
  background: "#fff",
  padding: "16px",
  borderRadius: "8px",
  marginBottom: "16px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px",
};

const thTd = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const recentRowStyle = {
  backgroundColor: "#f0f8ff",
};

const recentMsgStyle = {
  padding: "8px",
  marginBottom: "6px",
  backgroundColor: "#f9f9f9",
  borderRadius: "6px",
};
