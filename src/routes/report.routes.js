import express from "express";

import * as reportController from "../controllers/report.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get( "/dashboard", authMiddleware, reportController.dashboardReport );

export default router;