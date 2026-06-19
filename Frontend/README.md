# Job Portal Frontend

## Overview

The Job Portal Frontend is a responsive web application built with React.js and Tailwind CSS. It provides separate dashboards for Employees and Employers, allowing users to manage job postings and job applications through a modern user interface.

The frontend communicates with a RESTful API backend built using Node.js, Express.js, and MySQL.

---

## Features

### Authentication

* User Registration
* User Login
* Logout Functionality
* Role-based Access Control
* Protected Routes

### Employee Features

* View Available Jobs
* Search Jobs by Title, Company, or Location
* View Job Details
* Apply for Jobs
* View Application History
* Track Application Status
* Dashboard Statistics

### Employer Features

* Create Job Posting
* View My Jobs
* Edit Job Posting
* Delete Job Posting
* View Job Applications
* Update Application Status
* Dashboard Management

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Vite

### Backend Integration

* REST API
* JWT Authentication
* Cookie-Based Authentication

---

## Project Structure

```text
src/
│
├── api/
│   └── axios.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   │
│   ├── employee/
│   │   ├── EmployeeDashboard.jsx
│   │   ├── CreateApplication.jsx
│   │   └── MyApplications.jsx
│   │
│   └── employer/
│       ├── EmployerDashboard.jsx
│       ├── CreateJob.jsx
│       ├── EditJob.jsx
│       └── MyJobs.jsx
│
├── layouts/
│   └── DashboardLayout.jsx
│
├── App.jsx
└── main.jsx
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

---

## Environment Configuration

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Configuration

Axios Instance

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;
```

---

## Application Workflow

### Employee Workflow

1. Register/Login
2. View Available Jobs
3. Search Jobs
4. Apply for Job
5. Track Application Status
6. Receive Employer Updates

### Employer Workflow

1. Register/Login
2. Create Job Posting
3. Manage Posted Jobs
4. Review Applications
5. Update Application Status
6. Hire Candidates

---

## Application Statuses

Applications can have the following statuses:

| Status       | Description                      |
| ------------ | -------------------------------- |
| Applied      | Application submitted            |
| Interviewing | Candidate selected for interview |
| Offer        | Job offer sent                   |
| Rejected     | Application rejected             |

---

## Dashboard Reports

### Employee Dashboard

* Total Jobs Available
* Applied Applications
* Interviewing Applications
* Offered Applications
* Rejected Applications

### Employer Dashboard

* Total Jobs Posted
* Total Applications Received
* Active Jobs
* Application Management

---

## Responsive Design

The application is fully responsive and supports:

* Desktop Devices
* Tablets
* Mobile Phones

Implemented using Tailwind CSS utility classes.

---

## Security Features

* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Secure HTTP Cookies
* Form Validation

---

## Future Enhancements

* Resume Upload
* Email Notifications
* Company Profiles
* Job Bookmarking
* Advanced Search Filters
* Real-time Notifications
* Analytics Dashboard

---

## Author

**Nirajan Lama**

GitHub: https://github.com/nirajanlama2620

---

## License

This project is developed for educational and internship assessment purposes.
