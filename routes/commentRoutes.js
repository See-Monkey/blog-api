import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import commentController from "../controllers/commentController.js";

const router = Router();

// Edit comment
router.patch("/:id", requireAuth, commentController.updateComment);

// Delete comment
router.delete(":/id", requireAuth, commentController.deleteComment);

export default router;
