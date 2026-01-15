import { useEffect, useState } from "react";
import API from "../../utils/api";
import AdminLayout from "../../components/AdminLayout";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff"); // default role
  const [teamId, setTeamId] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch teams for dropdown
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await API.get("/admin/teams");
        setTeams(res.data);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
      }
    };
    fetchTeams();
  }, []);

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      return alert("All fields except team are required");
    }

    setLoading(true);
    try {
      const res = await API.post("/admin/register-staff", {
        name,
        email,
        password,
        role,
        team: teamId || null,
      });

      setMessage(`User "${res.data.user.name}" registered successfully!`);
      setName("");
      setEmail("");
      setPassword("");
      setRole("staff");
      setTeamId("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Register Staff / Managers</h2>

      {message && <div className="mb-4 text-green-600">{message}</div>}

      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white p-6 rounded shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
          <option value="support">Support</option>
          <option value="sales">Sales</option>
          <option value="neutral">Neutral</option>
        </select>

        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Team (Optional)</option>
          {teams.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name} ({t.organisation || "N/A"})
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Registering..." : "Register User"}
        </button>
      </form>
    </AdminLayout>
  );
}
