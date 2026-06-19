import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyJob = async () => {
    try {
      await api.post("/applications", {
        job_id: id,
        applied_date: new Date().toISOString().split("T")[0],
        notes: "",
      });

      alert("Applied Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">
          {job.job_title}
        </h1>

        <h2 className="text-lg text-gray-600 mb-4">
          {job.company_name}
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <span className="font-semibold">Location:</span>{" "}
            {job.location}
          </div>

          <div>
            <span className="font-semibold">Job Type:</span>{" "}
            {job.job_type}
          </div>

          <div>
            <span className="font-semibold">Salary:</span>{" "}
            {job.salary}
          </div>

          <div>
            <span className="font-semibold">Deadline:</span>{" "}
            {job.deadline}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">
          Job Description
        </h3>

        <p className="text-gray-700 mb-6">
          {job.job_description}
        </p>

        <button
          onClick={applyJob}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}