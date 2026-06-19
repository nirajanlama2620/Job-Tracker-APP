import pool from "../config/db.js";

export const getDashboardReport = async () => {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS totalApplications, 
      SUM(status = 'Applied') AS applied,
      SUM(status = 'Interviewing') AS interviewing,
      SUM(status = 'Offer') AS offerCount,
      SUM(status = 'Rejected') AS rejected
    FROM applications
  `);

  return rows[0];
};