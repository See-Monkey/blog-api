import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import userController from "../controllers/userController.js";
import commentController from "../controllers/commentController.js";

const router = Router();

// Get account details
router.get("/me", requireAuth, userController.getMe);

// Update account details
router.patch("/me", requireAuth, userController.updateMe);
router.patch("/me/password", requireAuth, userController.changeMyPassword);

// Admin get all users
router.get("/", requireAdmin, userController.getAllUsers);

// Get public profile
router.get("/:id", userController.getPublicProfile);

// Admin delete user
router.delete("/:id", requireAdmin, userController.deleteUser);

// Get comments by user
router.get("/:id/comments", commentController.getCommentsByUser);

export default router;
