import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Job Portal</h1>

      <div className="space-y-3">
        <Link to="/">Dashboard</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/applications">Applications</Link>
        <Link to="/jobs/create">Create Job</Link>
      </div>
    </div>
  );
}