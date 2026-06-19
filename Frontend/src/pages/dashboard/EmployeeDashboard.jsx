import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const EmployeeDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications");
      setApplications(res.data.data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Search Filter
  const filteredJobs = jobs.filter((job) => {
    return (
      job.job_title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviewingCount = applications.filter(
    (app) => app.status === "Interviewing"
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Employee Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        Browse and apply for available jobs
      </p>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs by title, company or location..."
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* APPLICATION STATS */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Applied</h3>
          <p className="text-3xl font-bold text-blue-600">
            {appliedCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Interviewing</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {interviewingCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Offers</h3>
          <p className="text-3xl font-bold text-green-600">
            {offerCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">
            {rejectedCount}
          </p>
        </div>
      </div>

      {/* TOTAL JOBS */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold">
          Total Jobs Available: {filteredJobs.length}
        </h2>
      </div>

      {/* JOB LIST */}
      <div className="grid gap-6">
        {filteredJobs.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-center">
              No jobs found
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {job.job_title}
                  </h2>

                  <p className="text-gray-600">
                    {job.company_name}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm w-fit">
                  {job.job_type}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-5">
                <p>
                  <strong>Employer:</strong>{" "}
                  {job.employer_name || "N/A"}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {job.location}
                </p>

                <p>
                  <strong>Salary:</strong> NPR{" "}
                  {Number(job.salary).toLocaleString()}
                </p>

                <p>
                  <strong>Deadline:</strong>{" "}
                  {job.deadline
                    ? new Date(
                        job.deadline
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="mt-5">
                <h3 className="font-semibold mb-2">
                  Job Description
                </h3>

                <p className="text-gray-700">
                  {job.job_description}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() =>
                    navigate(
                      `/applications/create/${job.id}`
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MY APPLICATIONS */}
<div className="mt-12">
  <h2 className="text-3xl font-bold mb-6">
    My Applications
  </h2>

  <div className="bg-white rounded-xl shadow-md overflow-x-auto">
    <table className="w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-3">ID</th>
          <th className="border p-3">Employee Name</th>
          <th className="border p-3">Job Title</th>
          <th className="border p-3">Company</th>
          <th className="border p-3">Status</th>
          <th className="border p-3">Applied Date</th>
          <th className="border p-3">Notes</th>
        </tr>
      </thead>

      <tbody>
        {applications.length === 0 ? (
          <tr>
            <td
              colSpan="7"
              className="border p-6 text-center text-gray-500"
            >
              No applications found
            </td>
          </tr>
        ) : (
          applications.map((app) => (
            <tr
              key={app.id}
              className="hover:bg-gray-50 text-center"
            >
              <td className="border p-3">
                {app.id}
              </td>

              <td className="border p-3">
                {app.employee_name || "N/A"}
              </td>

              <td className="border p-3">
                {app.job_title}
              </td>

              <td className="border p-3">
                {app.company_name}
              </td>

              <td className="border p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "Applied"
                      ? "bg-blue-100 text-blue-700"
                      : app.status === "Interviewing"
                      ? "bg-yellow-100 text-yellow-700"
                      : app.status === "Offer"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {app.status}
                </span>
              </td>

              <td className="border p-3">
                {app.applied_date
                  ? new Date(
                      app.applied_date
                    ).toLocaleDateString()
                  : "N/A"}
              </td>

              <td className="border p-3">
                {app.notes || "-"}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

export default EmployeeDashboard;