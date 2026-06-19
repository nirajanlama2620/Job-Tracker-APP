import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // ======================
  // GET EMPLOYER JOBS
  // ======================
  const fetchMyJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/jobs/my-jobs",
        { withCredentials: true }
      );

      setJobs(res.data.data || res.data);
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };

  // ======================
  // GET APPLICATIONS (EMPLOYER)
  // ======================
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications",
        { withCredentials: true }
      );

      setApplications(res.data.data || []);
    } catch (error) {
      console.log("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchMyJobs();
    fetchApplications();
  }, []);

  // ======================
  // DELETE JOB
  // ======================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        { withCredentials: true }
      );

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // ======================
  // EDIT JOB
  // ======================
  const handleEdit = (job) => {
    navigate(`/jobs/edit/${job.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* ================= JOBS ================= */}
      <h1 className="text-2xl font-bold mb-4">
        My Jobs
      </h1>

      <div className="overflow-x-auto mb-10">
        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="text-center">

                <td className="border p-2">{job.id}</td>
                <td className="border p-2">{job.company_name}</td>
                <td className="border p-2">{job.job_title}</td>
                <td className="border p-2">{job.job_type}</td>
                <td className="border p-2">{job.location}</td>
                <td className="border p-2">{job.salary}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= APPLICATIONS ================= */}
   <h1 className="text-2xl font-bold mb-4">
  Applications for My Jobs
</h1>

<div className="overflow-x-auto">
  <table className="w-full border border-gray-300">

    <thead className="bg-gray-100">
      <tr>
        <th className="border p-2">ID</th>
        <th className="border p-2">Employer</th>
        <th className="border p-2">Employee</th>
        <th className="border p-2">Job Title</th>
        <th className="border p-2">Company</th>

        {/* READ ONLY STATUS */}
        <th className="border p-2">Status</th>

        <th className="border p-2">Applied Date</th>
        <th className="border p-2">Notes</th>

        {/* NEW RIGHT SIDE COLUMN */}
        <th className="border p-2">Status Update</th>
      </tr>
    </thead>

    <tbody>
      {applications.map((app) => (
        <tr key={app.id} className="text-center">

          <td className="border p-2">{app.id}</td>

          <td className="border p-2">
            {app.employer_name || "N/A"}
          </td>

          <td className="border p-2">
            {app.employee_name}
          </td>

          <td className="border p-2">
            {app.job_title}
          </td>

          <td className="border p-2">
            {app.company_name}
          </td>

          {/* READ ONLY STATUS */}
          <td className="border p-2 font-semibold">
            {app.status}
          </td>

          <td className="border p-2">
            {new Date(app.applied_date).toLocaleDateString()}
          </td>

          <td className="border p-2">
            {app.notes || "-"}
          </td>

          {/* STATUS UPDATE DROPDOWN */}
          <td className="border p-2">
            <select
              value={app.status}
              onChange={async (e) => {
                const newStatus = e.target.value;

                try {
                  await axios.patch(
                    `http://localhost:5000/api/applications/${app.id}`,
                    { status: newStatus },
                    { withCredentials: true }
                  );

                  setApplications((prev) =>
                    prev.map((a) =>
                      a.id === app.id
                        ? { ...a, status: newStatus }
                        : a
                    )
                  );
                } catch (error) {
                  console.log("Status update error:", error);
                }
              }}
              className="border p-1"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </td>

        </tr>
      ))}
    </tbody>

  </table>
</div>

    </div>
  );
};

export default Jobs;