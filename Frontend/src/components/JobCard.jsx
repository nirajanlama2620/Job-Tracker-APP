import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold">
        {job.job_title}
      </h2>

      <p className="text-gray-600">
        {job.company_name}
      </p>

      <p className="text-sm text-gray-500">
        {job.location}
      </p>

      <Link
        to={`/jobs/${job.id}`}
        className="inline-block mt-4 text-blue-600"
      >
        View Details
      </Link>
    </div>
  );
}