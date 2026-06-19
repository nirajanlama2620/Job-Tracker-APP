import pool from "../config/db.js";

/* =========================
   GET ALL APPLICATIONS
========================= */
export const findAll = async (status, search) => {
  let query = `
    SELECT
      a.id,
      a.job_id,
      a.status,
      a.applied_date,
      a.notes,
      a.created_at,
      a.updated_at,
      u.full_name AS employee_name,
      e.full_name AS employer_name,
      j.job_title,
      j.company_name
    FROM applications a
    JOIN users u ON a.employee_id = u.id
    JOIN jobs j ON a.job_id = j.id
    JOIN users e ON j.employer_id = e.id
    WHERE 1=1
  `;

  const values = [];

  // FILTER BY STATUS
  if (status) {
    query += ` AND a.status = ?`;
    values.push(status);
  }

  // SEARCH FILTER
  if (search) {
    query += ` AND (j.company_name LIKE ? OR j.job_title LIKE ?)`;
    values.push(`%${search}%`, `%${search}%`);
  }

  query += ` ORDER BY a.created_at DESC`;

  const [rows] = await pool.query(query, values);
  return rows;
};

/* =========================
   GET BY ID
========================= */
export const findById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      a.*,
      u.full_name AS employee_name,
      e.full_name AS employer_name,
      j.job_title,
      j.company_name
    FROM applications a
    JOIN users u ON a.employee_id = u.id
    JOIN jobs j ON a.job_id = j.id
    JOIN users e ON j.employer_id = e.id
    WHERE a.id = ?
    `,
    [id]
  );

  return rows[0];
};

/* =========================
   CREATE APPLICATION
========================= */
export const create = async (data) => {
  const {
    employee_id,
    job_id,
    status,
    applied_date,
    notes,
  } = data;

  const [result] = await pool.query(
    `
    INSERT INTO applications
      (employee_id, job_id, status, applied_date, notes)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      employee_id,
      job_id,
      status || "Applied",
      applied_date,
      notes,
    ]
  );

  return result.insertId;
};

/* =========================
   UPDATE APPLICATION
========================= */
export const update = async (id, data) => {
  const fields = [];
  const values = [];

  Object.keys(data).forEach((key) => {
    fields.push(`${key} = ?`);
    values.push(data[key]);
  });

  values.push(id);

  const [result] = await pool.query(
    `
    UPDATE applications
    SET ${fields.join(", ")}
    WHERE id = ?
    `,
    values
  );

  return result;
};

/* =========================
   GET APPLICATION + EMPLOYER CHECK
========================= */
export const findApplicationWithEmployer = async (applicationId) => {
  const [rows] = await pool.query(
    `
    SELECT
      a.id,
      a.status,
      a.employee_id,
      a.job_id,
      j.employer_id
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.id = ?
    `,
    [applicationId]
  );

  return rows[0];
};

/* =========================
   DELETE APPLICATION
========================= */
export const remove = async (applicationId, employeeId) => {
  const [result] = await pool.query(
    `
    DELETE FROM applications
    WHERE id = ? AND employee_id = ?
    `,
    [applicationId, employeeId]
  );

  return result;
};