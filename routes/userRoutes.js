import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
	validateUpdateMe,
	validateChangePassword,
	handleValidationErrors,
} from "../middleware/validators.js";
import userController from "../controllers/userController.js";
import commentController from "../controllers/commentController.js";

const router = Router();

// Get account details
router.get("/me", requireAuth, userController.getMe);

// Update account details
router.patch(
	"/me",
	requireAuth,
	validateUpdateMe,
	handleValidationErrors,
	userController.updateMe,
);
router.patch(
	"/me/password",
	requireAuth,
	validateChangePassword,
	handleValidationErrors,
	userController.changeMyPassword,
);

// Admin get all users
router.get("/", requireAdmin, userController.getAllUsers);

// Get public profile
router.get("/:userId", userController.getPublicProfile);

// Admin delete user
router.delete("/:userId", requireAdmin, userController.deleteUser);

// Get comments by user
router.get("/:userId/comments", commentController.getCommentsByUser);

export default router;
