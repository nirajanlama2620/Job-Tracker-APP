import pool from "../config/db.js";

/* =========================
   CREATE JOB
========================= */
export const createJob = async (jobData) => {
  const {
    employer_id,
    company_name,
    job_title,
    job_description,
    job_type,
    location,
    salary,
    deadline,
  } = jobData;

  const [result] = await pool.query(
    `INSERT INTO jobs 
    (employer_id, company_name, job_title, job_description, job_type, location, salary, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      employer_id,
      company_name,
      job_title,
      job_description,
      job_type,
      location,
      salary,
      deadline,
    ]
  );

  return result.insertId;
};

/* =========================
   GET ALL JOBS (PUBLIC)
========================= */
export const findAllJobs = async (search) => {
  let query = `
    SELECT j.*, u.full_name AS employer_name
    FROM jobs j
    JOIN users u ON j.employer_id = u.id
    WHERE 1=1
  `;

  const values = [];

  if (search) {
    query += ` AND (j.company_name LIKE ? OR j.job_title LIKE ?)`;
    values.push(`%${search}%`, `%${search}%`);
  }

  query += ` ORDER BY j.created_at DESC`;

  const [rows] = await pool.query(query, values);
  return rows;
};

/* =========================
   GET JOB BY ID
========================= */
export const findJobById = async (id) => {
  const [rows] = await pool.query(
    `SELECT j.*, u.full_name AS employer_name
     FROM jobs j
     JOIN users u ON j.employer_id = u.id
     WHERE j.id = ?`,
    [id]
  );

  return rows[0];
};

/* =========================
   EMPLOYER JOBS ONLY
========================= */
export const findJobsByEmployerId = async (employerId) => {
  const [rows] = await pool.query(
    `SELECT 
      j.*,
      u.full_name AS employer_name
     FROM jobs j
     JOIN users u ON j.employer_id = u.id
     WHERE j.employer_id = ?
     ORDER BY j.created_at DESC`,
    [employerId]
  );

  return rows;
};

/* =========================
   UPDATE JOB (OWNER ONLY)
========================= */
export const updateJobByEmployer = async (jobId, employerId, data) => {
  const allowedFields = [
    "company_name",
    "job_title",
    "job_description",
    "job_type",
    "location",
    "salary",
    "deadline",
  ];

  const fields = [];
  const values = [];

  allowedFields.forEach((key) => {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  });

  if (fields.length === 0) {
    throw new Error("No valid fields to update");
  }

  values.push(jobId, employerId);

  const [result] = await pool.query(
    `UPDATE jobs
     SET ${fields.join(", ")}
     WHERE id = ? AND employer_id = ?`,
    values
  );

  return result;
};

/* =========================
   DELETE JOB (OWNER ONLY)
========================= */
export const deleteJobByEmployer = async (
  jobId,
  employerId
) => {
  const [result] = await pool.query(
    `DELETE FROM jobs WHERE id = ? AND employer_id = ?`,
    [jobId, employerId]
  );

  return result;
};