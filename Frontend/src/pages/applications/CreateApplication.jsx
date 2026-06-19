import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const CreateApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [form, setForm] = useState({
    status: "Applied",
    applied_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  // ======================
  // GET JOB DETAILS
  // ======================
  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${jobId}`, {
        withCredentials: true,
      });

      setJob(res.data.data || res.data);
    } catch (error) {
      console.log("Error fetching job:", error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  // ======================
  // HANDLE CHANGE
  // ======================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================
  // SUBMIT APPLICATION
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/applications",
        {
          job_id: jobId,
          status: "Applied", // 🔥 FORCE APPLIED
          applied_date: form.applied_date,
          notes: form.notes,
        },
        { withCredentials: true }
      );

      alert("Application submitted successfully!");
      navigate("/employee-dashboard");
    } catch (error) {
      console.log("Submit error:", error);
      alert("Failed to submit application");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        Create Application
      </h1>

      {/* ================= JOB DETAILS ================= */}
      {job && (
        <div className="bg-white shadow p-4 rounded mb-6">

          <h2 className="text-xl font-bold">
            {job.job_title}
          </h2>

          <p className="text-gray-600">
            {job.company_name}
          </p>

          <p className="mt-2 text-gray-700">
            {job.job_description}
          </p>

          <div className="grid grid-cols-2 mt-3 text-sm">
            <p><strong>Type:</strong> {job.job_type}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(job.deadline).toLocaleDateString()}
            </p>
          </div>

        </div>
      )}

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded space-y-4"
      >

        {/* STATUS (FIXED) */}
        <div>
          <label className="block mb-1 font-medium">
            Status
          </label>

          <input
            type="text"
            value="Applied"
            disabled
            className="w-full border p-2 bg-gray-100"
          />
        </div>

        {/* APPLIED DATE */}
        <div>
          <label className="block mb-1 font-medium">
            Applied Date
          </label>

          <input
            type="date"
            name="applied_date"
            value={form.applied_date}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="block mb-1 font-medium">
            Notes
          </label>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Write your notes..."
            className="w-full border p-2"
            rows="4"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Application
        </button>

      </form>

    </div>
  );
};

export default CreateApplication;