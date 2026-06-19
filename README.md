# 🚀 Job Tracker API

A RESTful Job Tracker API built using **Node.js**, **Express.js**, **MySQL**, **JWT Authentication**, and **Layered Architecture**.

This application allows employers to post jobs, employees to apply for jobs, employers to review applications, and both users to track application progress through a dashboard.

---

# 📌 Features

## Authentication

* Employee Signup
* Employee Login
* Employer Signup
* Employer Login
* JWT Authentication
* Password Hashing using bcryptjs
* Role-Based Authorization

## Job Management

* Create Job
* Get All Jobs
* Search Jobs
* Get Job By ID
* Update Job
* Delete Job

## Application Management

* Apply for Job
* Get All Applications
* Get Application By ID
* Filter Applications by Status
* Search Applications
* Update Application Status
* Delete Application

## Dashboard Reporting

* Total Applications
* Applied Applications
* Interviewing Applications
* Offered Applications
* Rejected Applications

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* bcryptjs
* dotenv
* REST API
* Layered Architecture

---

# 📂 Project Structure

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

# 🗄️ Database Schema

## Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('employee','employer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);
```

## Jobs Table

```sql
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employer_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    job_type ENUM(
        'Internship',
        'Full-time',
        'Part-time'
    ) NOT NULL,
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

## Applications Table

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

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
cd job-tracker
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=job_tracker

JWT_SECRET=your_secret_key
```

## Run Application

```bash
npm run dev
```

Server URL:

```text
http://localhost:5000
```

---

# 📬 Postman Collection Structure

```text
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
```

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/auth/signup |
| POST   | /api/auth/login  |

---

## Jobs

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /api/jobs               |
| GET    | /api/jobs/:id           |
| GET    | /api/jobs?search=Google |
| POST   | /api/jobs               |
| PATCH  | /api/jobs/:id           |
| DELETE | /api/jobs/:id           |

---

## Applications

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

## Reports

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | /api/reports/dashboard |

---

# 🔄 Application Workflow

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

# 🔐 Authorization Rules

| Action                    | Employee | Employer               |
| ------------------------- | -------- | ---------------------- |
| Signup/Login              | ✅        | ✅                      |
| View Jobs                 | ✅        | ✅                      |
| Create Job                | ❌        | ✅                      |
| Update Job                | ❌        | ✅ Own Job              |
| Delete Job                | ❌        | ✅ Own Job              |
| Apply Job                 | ✅        | ❌                      |
| Delete Own Application    | ✅        | ❌                      |
| Update Application Status | ❌        | ✅ Own Job Applications |
| Dashboard Report          | ✅        | ✅                      |

---

# 🧪 Recommended Testing Order

### Employer Flow

1. Signup Employer
2. Login Employer
3. Create Job
4. Get All Jobs
5. Update Job

### Employee Flow

6. Signup Employee
7. Login Employee
8. Search Jobs
9. Get Job By ID
10. Apply Job
11. Get All Applications
12. Delete Own Application

### Employer Review Flow

13. Login Employer
14. Update Application Status
15. Filter Applications
16. Dashboard Report

---

# 📈 Business Flow

```text
Employer → Post Job
         ↓
Employee → View Job
         ↓
Employee → Apply Job
         ↓
Application Created
         ↓
Employer Reviews
         ↓
Interviewing
         ↓
Offer / Rejected
```

---

# 👨‍💻 Author

**Nirajan Lama**

Backend Developer

### Skills

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* MySQL
* MongoDB
* REST API Development
* JWT Authentication
* Git & GitHub
* Layered Architecture
