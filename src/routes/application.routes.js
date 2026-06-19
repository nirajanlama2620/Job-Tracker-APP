import express from "express";

import * as controller from "../controllers/application.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.get( "/", authMiddleware, controller.getApplications );  // ✅

router.get( "/:id", authMiddleware, controller.getApplicationById );  // ✅

router.post( "/",authMiddleware, roleMiddleware("employee"), controller.createApplication );  // ✅

router.patch( "/:id", authMiddleware, roleMiddleware("employer"), controller.updateApplication );  // ✅

router.delete( "/:id", authMiddleware, roleMiddleware("employee"), controller.deleteApplication );  // ✅

export default router;