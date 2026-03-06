import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import analyticsController from "../controllers/analyticsController.js";

const router = Router();

router.get("/", requireAdmin, analyticsController.getAnalytics);

export default router;
