import { useState } from "react";
import api from "../../api/axios";

const CreateJob = () => {
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/jobs", formData);

      alert("Job created successfully!");

      setFormData({
        company_name: "",
        job_title: "",
        job_description: "",
        job_type: "",
        location: "",
        salary: "",
        deadline: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Job
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Fill in job details below
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Company Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Enter company name"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Job Title
            </label>
            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Job Description
            </label>
            <textarea
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows="4"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Job Type */}
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
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Creating Job..." : "Create Job"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateJob;