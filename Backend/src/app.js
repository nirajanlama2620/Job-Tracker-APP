import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import reportRoutes from "./routes/report.routes.js";
import jobRoutes from "./routes/job.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use( "/api/auth", authRoutes );     //  ✅
app.use( "/api/jobs", jobRoutes );      // ✅
app.use( "/api/applications", applicationRoutes );    // ✅
app.use( "/api/reports", reportRoutes );  // ✅

export default app;