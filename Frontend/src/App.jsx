import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Jobs from "./pages/jobs/Jobs";
import CreateJob from "./pages/jobs/CreateJob";
import Applications from "./pages/applications/Applications";
import ApplicationsList from "./pages/applications/ApplicationList";
import CreateApplication from "./pages/applications/CreateApplication";

import JobDetails from "./pages/jobs/JobDetails";

import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import EmployerDashboard from "./pages/dashboard/EmployerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import UpdateJob from "./pages/jobs/UpdateJob";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer-dashboard"
        element={
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/create"
        element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/edit/:id"
        element={
          <ProtectedRoute>
            <UpdateJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications/list"
        element={
          <ProtectedRoute>
            <ApplicationsList />
          </ProtectedRoute>
        }
      />

      {/* ADD THIS ROUTE */}
      <Route
        path="/applications/create/:jobId"
        element={
          <ProtectedRoute>
            <CreateApplication />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}