import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
	validateUpdateComment,
	validateCommentIdParam,
	handleValidationErrors,
} from "../middleware/validators.js";
import commentController from "../controllers/commentController.js";

const router = Router();

// Edit comment
router.patch(
	"/:commentId",
	requireAuth,
	validateCommentIdParam,
	validateUpdateComment,
	handleValidationErrors,
	commentController.updateComment,
);

// Delete comment
router.delete(
	"/:commentId",
	validateCommentIdParam,
	handleValidationErrors,
	requireAuth,
	commentController.deleteComment,
);

export default router;
