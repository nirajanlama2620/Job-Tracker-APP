import dotenv from "dotenv";
import app from "./src/app.js";
import pool from "./src/config/db.js";
import config from "./src/config/config.js";

dotenv.config();

const startServer = async () => {
  try {
    const connection = await pool.getConnection();

    console.log(" MySQL Connected");
    
    connection.release();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Database connection failed");
    console.error(error.message);
  }
};

startServer();