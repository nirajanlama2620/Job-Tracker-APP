import pool from "../config/db.js";

export const createUser = async ( user ) => {
  const { full_name, email, password, role, } = user;

  const [result] = await pool.query(
    ` INSERT INTO users ( full_name, email, password, role ) VALUES (?, ?, ?, ?) `,
     [ full_name, email, password, role, ]
  );

   return {
    id: result.insertId,
    full_name: user.full_name,
    email: user.email,
    role: user.role
  };
};

export const findByEmail = async ( email ) => {
  console.log("Searching email:", email);
  const [rows] = await pool.query( ` SELECT * FROM users WHERE email = ? `,
    [email]
  );

  console.log("Database result:", rows);
  return rows[0];
};