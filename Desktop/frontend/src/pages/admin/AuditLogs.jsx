import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import API from "../../utils/api";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [filterUser, setFilterUser] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterAction) params.action = filterAction;
      if (filterUser) params.user = filterUser;

      const res = await API.get("/admin/audit", {
        headers: { "Cache-Control": "no-cache" },
        params,
      });
      setLogs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filterAction, filterUser]);

  return (
    <AdminLayout>
      <h2>Audit Logs</h2>
      <p>All user and system activity tracked</p>

      {/* Filters (Sprint 2) */}
      <div style={styles.filters}>
        <input
          placeholder="Filter by action"
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Filter by user ID"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchLogs} style={styles.btn}>
          Apply Filters
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && logs.length === 0 && <p>No audit logs found.</p>}

      <div style={styles.container}>
        {logs.map((log) => (
          <div key={log._id} style={styles.log}>
            <p><b>User:</b> {log.user || "System"}</p>
            <p><b>Action:</b> {log.action}</p>
            {log.details && <p><b>Details:</b> {log.details}</p>}
            {log.ai_mode && <p><b>AI Mode:</b> {log.ai_mode}</p>}
            <small>{new Date(log.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

const styles = {
  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    flex: 1,
  },
  btn: {
    background: "#111827",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  log: {
    background: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
  },
};
