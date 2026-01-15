import { useEffect, useState } from "react";
import API from "../../utils/api";
import AdminLayout from "../../components/AdminLayout";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newTeamName, setNewTeamName] = useState("");
  const [newOrganisation, setNewOrganisation] = useState("");

  // Fetch teams
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Add new team
  const handleAddTeam = async () => {
    if (!newTeamName) return alert("Team name required");
    try {
      const res = await API.post("/admin/teams", {
        name: newTeamName,
        organisation: newOrganisation,
      });
      setTeams([...teams, res.data]);
      setNewTeamName("");
      setNewOrganisation("");
    } catch (err) {
      console.error(err);
      alert("Failed to add team");
    }
  };

  // Delete team
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    try {
      await API.delete(`/admin/teams/${id}`);
      setTeams(teams.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete team");
    }
  };

  // Update team
  const handleUpdate = async (id, name, organisation) => {
    const newName = prompt("Team Name:", name);
    if (newName === null) return; // Cancelled
    const newOrg = prompt("Organisation:", organisation || "");
    if (newOrg === null) return;

    try {
      const res = await API.put(`/admin/teams/${id}`, {
        name: newName,
        organisation: newOrg,
      });
      setTeams(teams.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
      alert("Failed to update team");
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Teams</h2>

      {/* Error */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Add New Team */}
      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Team Name"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="Organisation"
          value={newOrganisation}
          onChange={(e) => setNewOrganisation(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[150px]"
        />
        <button
          onClick={handleAddTeam}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Add Team
        </button>
      </div>

      {/* Teams Table */}
      {loading ? (
        <div>Loading teams...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Team Name</th>
                <th className="py-3 px-4 text-left">Organisation</th>
                <th className="py-3 px-4 text-left">Users</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t) => (
                <tr key={t._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{t.name}</td>
                  <td className="py-2 px-4">{t.organisation || "N/A"}</td>
                  <td className="py-2 px-4">
                    {t.users?.length > 0
                      ? t.users.map((u) => u.name).join(", ")
                      : "No users"}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleUpdate(t._id, t.name, t.organisation)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
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
