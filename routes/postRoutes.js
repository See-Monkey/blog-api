import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
	validateCreatePost,
	validateUpdatePost,
	validateCreateComment,
	validatePostIdParam,
	validateSlugParam,
	handleValidationErrors,
} from "../middleware/validators.js";
import postController from "../controllers/postController.js";
import commentController from "../controllers/commentController.js";

const router = Router();

// Get all public posts
router.get("/", postController.getAllPublicPosts);

// Get all posts (admin)
router.get("/admin", requireAdmin, postController.getAllPosts);

// Get any post by ID (admin)
router.get(
	"/admin/:postId",
	requireAdmin,
	validatePostIdParam,
	handleValidationErrors,
	postController.getPostById,
);

// Submit new post
router.post(
	"/",
	requireAdmin,
	validateCreatePost,
	handleValidationErrors,
	postController.createPost,
);

// Edit post (admin)
router.patch(
	"/:postId",
	requireAdmin,
	validatePostIdParam,
	validateUpdatePost,
	handleValidationErrors,
	postController.updatePost,
);

// Delete post (admin)
router.delete(
	"/:postId",
	requireAdmin,
	validatePostIdParam,
	handleValidationErrors,
	postController.deletePost,
);

// Get comments by post
router.get(
	"/:slug/comments",
	validateSlugParam,
	handleValidationErrors,
	commentController.getCommentsByPost,
);

// Submit comment on post
router.post(
	"/:slug/comments",
	requireAuth,
	validateSlugParam,
	validateCreateComment,
	handleValidationErrors,
	commentController.createComment,
);

// Get public post by slug
router.get(
	"/:slug",
	validateSlugParam,
	handleValidationErrors,
	postController.getPublicPostBySlug,
);

export default router;
