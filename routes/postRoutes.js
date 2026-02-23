import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import postController from "../controllers/postController.js";

const router = Router();

export default router;
