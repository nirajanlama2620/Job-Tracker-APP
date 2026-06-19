import pool from "../config/db.js";

export const createJob = async (jobData) => {
  const { employer_id, company_name, job_title, job_description, job_type, location, salary, deadline, } = jobData;

  const [result] = await pool.query(
    `
    INSERT INTO jobs 
    ( employer_id, company_name, job_title, job_description, job_type, location, salary, deadline ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [employer_id, company_name, job_title, job_description, job_type, location, salary, deadline,]
  );

  return result.insertId;
};

export const findAllJobs = async (search) => {
  let query = ` SELECT j.*, u.full_name AS employer_name FROM jobs j JOIN users u ON j.employer_id = u.id WHERE 1=1 `;

  const values = [];

  if (search) {
    query += ` AND ( j.company_name LIKE ? OR j.job_title LIKE ?  ) `;
    values.push(`%${search}%`);
    values.push(`%${search}%`);
  }

  query += " ORDER BY j.created_at DESC";

  const [rows] = await pool.query(
    query,
    values
  );

  return rows;
};

export const findJobById = async (id) => {
  const [rows] = await pool.query(
    ` SELECT j.*, u.full_name AS employer_name FROM jobs j JOIN users u ON j.employer_id = u.id WHERE j.id = ? `, [id]
  );

  return rows[0];
};

export const updateJob = async (id, data) => {
  const fields = [];
  const values = [];

  Object.keys(data).forEach((key) => {
    fields.push(`${key} = ?`);
    values.push(data[key]);
  });

  values.push(id);

  const [result] = await pool.query(
    ` UPDATE jobs SET ${fields.join(", ")} WHERE id = ? `, values
  );

  return result;
};

export const deleteJob = async (id) => {
  const [result] = await pool.query(` DELETE FROM jobs WHERE id = ? `, [id]);

  return result;
};