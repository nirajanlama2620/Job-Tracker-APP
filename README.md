Postman Collection Structure

Job Tracker API
│
├── Auth
│   ├── Signup
│   └── Login
│
├── Jobs
│   ├── Create Job
│   ├── Get All Jobs
│   ├── Search Jobs
│   ├── Get Job By Id
│   ├── Update Job
│   └── Delete Job
│
├── Applications
│   ├── Create Application
│   ├── Get All Applications
│   ├── Get Application By Id
│   ├── Filter By Status
│   ├── Search Application
│   ├── Update Application
│   └── Delete Application
│
└── Reports
    └── Dashboard Report

Final Routes Summary

POST   /api/auth/signup
POST   /api/auth/login

GET    /api/jobs
GET    /api/jobs/:id
GET    /api/jobs?search=Google
POST   /api/jobs
PATCH  /api/jobs/:id
DELETE /api/jobs/:id

GET    /api/applications
GET    /api/applications/:id
GET    /api/applications?status=Applied
GET    /api/applications?search=Google
POST   /api/applications
PATCH  /api/applications/:id
DELETE /api/applications/:id

GET    /api/reports/dashboard

Recommended Testing Order

1. Signup Employer
2. Login Employer
3. Create Job
4. Get All Jobs

5. Signup Employee
6. Login Employee
7. Search Job
8. Apply Job

9. Get All Applications
10. Update Application Status
11. Filter Applications
12. Dashboard Report


APIs required for:

Employee signup/login
Employer signup/login
Job posting and management
Job application tracking
Application status updates
Dashboard reporting


job-tracker/
│
├── src/
│   ├── config/
│   │   └── db.js
|   |   └── config.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── job.controller.js
│   │   ├── application.controller.js
│   │   └── report.controller.js
│   │
|   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
|   |
│   ├── repositories/
│   │   ├── auth.repository.js
│   │   ├── job.repository.js
│   │   ├── application.repository.js
│   │   └── report.repository.js
|   |
|   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── job.routes.js
│   │   ├── application.routes.js
│   │   └── report.routes.js
|   |
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── job.service.js
│   │   ├── application.service.js
│   │   └── report.service.js
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── server.js


# Job Tracker API

A RESTful Job Tracker API built with Node.js, Express.js, MySQL, JWT Authentication, and Layered Architecture.

## Features

### Authentication

* Employee Signup
* Employee Login
* Employer Signup
* Employer Login
* JWT Authentication
* Role-Based Authorization

### Job Management

* Create Job
* Get All Jobs
* Search Jobs
* Get Job By ID
* Update Job
* Delete Job

### Application Management

* Apply for Job
* Get All Applications
* Get Application By ID
* Filter Applications by Status
* Search Applications
* Update Application Status
* Delete Application

### Dashboard Reporting

* Total Applications
* Applied Count
* Interviewing Count
* Offer Count
* Rejected Count

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* JWT
* bcryptjs
* dotenv
* Layered Architecture

---

## Project Structure

```text
job-tracker/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── config.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── job.controller.js
│   │   ├── application.controller.js
│   │   └── report.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── repositories/
│   │   ├── auth.repository.js
│   │   ├── job.repository.js
│   │   ├── application.repository.js
│   │   └── report.repository.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── job.routes.js
│   │   ├── application.routes.js
│   │   └── report.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── job.service.js
│   │   ├── application.service.js
│   │   └── report.service.js
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── server.js
```

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('employee','employer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);
```

### Jobs Table

```sql
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employer_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    job_type ENUM('Internship','Full-time','Part-time') NOT NULL,
    location VARCHAR(255),
    salary VARCHAR(100),
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employer_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

### Applications Table

```sql
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    job_id INT NOT NULL,
    status ENUM(
        'Applied',
        'Interviewing',
        'Offer',
        'Rejected'
    ) DEFAULT 'Applied',
    applied_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (employee_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (job_id)
    REFERENCES jobs(id)
    ON DELETE CASCADE
);
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd job-tracker
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=job_tracker

JWT_SECRET=your_secret_key
```

### Start Server

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

---

## API Endpoints

### Auth

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/auth/signup |
| POST   | /api/auth/login  |

---

### Jobs

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /api/jobs               |
| GET    | /api/jobs/:id           |
| GET    | /api/jobs?search=Google |
| POST   | /api/jobs               |
| PATCH  | /api/jobs/:id           |
| DELETE | /api/jobs/:id           |

---

### Applications

| Method | Endpoint                         |
| ------ | -------------------------------- |
| GET    | /api/applications                |
| GET    | /api/applications/:id            |
| GET    | /api/applications?status=Applied |
| GET    | /api/applications?search=Google  |
| POST   | /api/applications                |
| PATCH  | /api/applications/:id            |
| DELETE | /api/applications/:id            |

---

### Reports

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | /api/reports/dashboard |

---

## Business Rules

### Employee

* Signup/Login
* View Jobs
* Search Jobs
* Apply for Jobs
* Track Applications
* Delete Own Applications

### Employer

* Signup/Login
* Create Jobs
* Update Own Jobs
* Delete Own Jobs
* Review Applications
* Update Application Status

---

## Application Workflow

```text
Employer
   ↓
Create Job
   ↓
Job Published

Employee
   ↓
View Job
   ↓
Apply Job
   ↓
Application Created

Employer
   ↓
Review Application
   ↓
Interviewing
   ↓
Offer / Rejected
```

---

## Authorization Rules

| Action                    | Employee | Employer |
| ------------------------- | -------- | -------- |
| Signup/Login              | ✅        | ✅        |
| View Jobs                 | ✅        | ✅        |
| Create Job                | ❌        | ✅        |
| Update Job                | ❌        | ✅        |
| Delete Job                | ❌        | ✅        |
| Apply Job                 | ✅        | ❌        |
| Delete Own Application    | ✅        | ❌        |
| Update Application Status | ❌        | ✅        |
| Dashboard Report          | ✅        | ✅        |

---

## Author

Nirajan Lama

Backend Developer

Skills:

* Node.js
* Express.js
* MySQL
* MongoDB
* REST API
* JWT Authentication
* Git & GitHub
* Layered Architecture

