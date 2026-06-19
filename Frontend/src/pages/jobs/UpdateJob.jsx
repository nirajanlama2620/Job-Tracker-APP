import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const JOB_TYPES = ["Full-time", "Part-time", "Internship"];

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    job_description: "",
    job_type: "",
    location: "",
    salary: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // GET SINGLE JOB
  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`, {
        withCredentials: true,
      });

      setFormData(res.data.data || res.data);
    } catch (error) {
      console.log("Error fetching job:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // UPDATE JOB (PATCH)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.patch(`/jobs/${id}`, formData, {
        withCredentials: true,
      });

      alert("Job updated successfully!");
      navigate("/jobs");
    } catch (error) {
      console.log("Update error:", error);
      alert(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">

      <h2 className="text-3xl font-bold text-center mb-2">
        Update Job
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Edit job details below
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Company Name */}
        <input
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full border p-3 rounded"
        />

        {/* Job Title */}
        <input
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-3 rounded"
        />

        {/* Job Description */}
        <textarea
          name="job_description"
          value={formData.job_description}
          onChange={handleChange}
          placeholder="Job Description"
          rows="4"
          className="w-full border p-3 rounded"
        />

        {/* Job Type (IMPROVED SELECT) */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Job Type
          </label>

          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Job Type</option>

            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3 rounded"
        />

        {/* Salary */}
        <input
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-3 rounded"
        />

        {/* Deadline */}
        <input
          type="date"
          name="deadline"
          value={formData.deadline?.slice(0, 10)}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium"
        >
          {loading ? "Updating..." : "Update Job"}
        </button>

      </form>
    </div>
  );
};

export default UpdateJob;