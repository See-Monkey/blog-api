import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import commentController from "../controllers/commentController.js";

const router = Router();

export default router;
