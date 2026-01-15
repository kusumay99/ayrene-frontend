import { useEffect, useState } from "react";
import API from "../../utils/api";
import AdminLayout from "../../components/AdminLayout";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ userId: "", text: "" });

  /* ================= FETCH ================= */

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/messages");
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch messages error:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

  /* ================= SEND ================= */

  const handleSend = async (e) => {
    e.preventDefault();

    if (!form.userId || !form.text.trim()) {
      alert("Select user and type message");
      return;
    }

    try {
      setSending(true);
      await API.post("/admin/messages", {
        userId: form.userId,
        text: form.text,
      });

      setForm({ userId: "", text: "" });
      await fetchMessages(); // ✅ ensure refresh
    } catch (err) {
      console.error("Send message error:", err);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Messages</h2>

      {/* SEND FORM */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Send Message</h3>

        <form onSubmit={handleSend} className="flex flex-col gap-2">
          <select
            className="border p-2 rounded"
            value={form.userId}
            onChange={(e) =>
              setForm({ ...form, userId: e.target.value })
            }
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          <textarea
            className="border p-2 rounded"
            placeholder="Type your message"
            rows={3}
            value={form.text}
            onChange={(e) =>
              setForm({ ...form, text: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={sending}
            className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Original</th>
                <th className="p-2 text-left">Processed</th>
                <th className="p-2 text-left">Language</th>
                <th className="p-2 text-left">AI Mode</th>
                <th className="p-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m._id} className="border-b">
                  <td className="p-2">
                    {m.user?.name || "Unknown"}
                  </td>
                  <td className="p-2">
                    {m.original_text || "-"}
                  </td>
                  <td className="p-2">
                    {m.processed_text || "-"}
                  </td>
                  <td className="p-2">
                    {m.detected_language || "unknown"}
                  </td>
                  <td className="p-2">
                    {m.ai_mode || "manual"}
                  </td>
                  <td className="p-2">
                    {m.timestamp
                      ? new Date(m.timestamp).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
