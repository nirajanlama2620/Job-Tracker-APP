import express from "express";

import * as controller from "../controllers/job.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.get( "/", controller.getAllJobs ); // ✅

/*
|--------------------------------------------------------------------------
| Employer Dashboard
|--------------------------------------------------------------------------
*/
router.get(  "/my-jobs",  authMiddleware,  roleMiddleware("employer"),  controller.getMyJobs);

router.get( "/:id", controller.getJobById ); // ✅

router.post( "/", authMiddleware, roleMiddleware("employer"), controller.createJob );  // ✅

router.patch( "/:id", authMiddleware, roleMiddleware("employer"), controller.updateJob );  // ✅

router.delete( "/:id", authMiddleware, roleMiddleware("employer"), controller.deleteJob );  // ✅

export default router;