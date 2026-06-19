import { useEffect, useState } from "react";
import api from "../../api/axios";

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // GET ALL APPLICATIONS
  // =========================
  const fetchApplications = async () => {
    try {
      let url = "/applications";

      if (status) {
        url += `?status=${status}`;
      }

      const res = await api.get(url, { withCredentials: true });

      setApplications(res.data.data || res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [status]);

  // =========================
  // DELETE APPLICATION
  // =========================
  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await api.delete(`/applications/${id}`, {
        withCredentials: true,
      });

      setApplications((prev) =>
        prev.filter((app) => app.id !== id)
      );
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(
        `/applications/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id
            ? { ...app, status: newStatus }
            : app
        )
      );
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredApps = applications.filter((app) =>
    app.notes?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        All Applications
      </h1>

      {/* FILTER */}
      <div className="flex gap-3 mb-4">

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2"
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Applied Date</th>
              <th className="border p-2">Notes</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredApps.map((app) => (
              <tr key={app.id} className="text-center">

                <td className="border p-2">{app.id}</td>

                {/* STATUS */}
                <td className="border p-2">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(app.id, e.target.value)
                    }
                    className="border p-1"
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </td>

                <td className="border p-2">
                  {app.applied_date}
                </td>

                <td className="border p-2">
                  {app.notes}
                </td>

                {/* ACTIONS */}
                <td className="border p-2 space-x-2">

                  <button
                    onClick={() =>
                      updateStatus(app.id, "Offer")
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Mark Offer
                  </button>

                  <button
                    onClick={() =>
                      deleteApplication(app.id)
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {filteredApps.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            No applications found
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;