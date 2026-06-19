import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const EmployerDashboard = () => {
  const [allJobs, setAllJobs] = useState([]);

  // Fetch all jobs
  const fetchAllJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setAllJobs(res.data.data);
    } catch (error) {
      console.error("Error fetching all jobs:", error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const applyJob = async (jobId) => {
    try {
      await api.post("/applications", {
        job_id: jobId,
        applied_date: new Date().toISOString().split("T")[0],
      });

      alert("Applied Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to apply");
    }
  };

  const JobCard = ({ job, showApply = true }) => (
    <div className="border p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-semibold">{job.job_title}</h2>
      <span className="text-sm bg-gray-200 px-2 py-1 rounded">
        {job.job_type}
      </span>

      <p className="text-gray-600 mt-1">{job.company_name}</p>

      <div className="grid md:grid-cols-2 gap-2 mt-3 text-sm">
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Salary:</strong> NPR {Number(job.salary).toLocaleString()}
        </p>
        <p>
          <strong>Deadline:</strong>{" "}
          {new Date(job.deadline).toLocaleDateString()}
        </p>
      </div>

      <p className="text-gray-700 mt-3 line-clamp-3">
        {job.job_description}
      </p>

      <div className="flex gap-3 mt-4">
        <Link
          to={`/jobs/${job.id}`}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          View Details
        </Link>

        {showApply && (
          <button
            onClick={() => applyJob(job.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* ALL JOBS SECTION */}
      <section className="mb-10">
        <h1 className="text-2xl font-bold mb-4">All Jobs</h1>

        {allJobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          allJobs.map((job) => (
            <JobCard key={job.id} job={job} showApply={true} />
          ))
        )}
      </section>

      {/* MY JOBS LINK SECTION */}
      <section className="mt-10 border-t pt-6">
        <h2 className="text-xl font-bold mb-3">Manage Your Jobs</h2>

        <Link
          to="/jobs"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          Go to My Jobs (Edit / Delete Jobs)
        </Link>
      </section>

    </div>
  );
};

export default EmployerDashboard;