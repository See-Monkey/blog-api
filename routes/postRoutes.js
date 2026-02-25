import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import postController from "../controllers/postController.js";
import commentController from "../controllers/commentController.js";

const router = Router();

// Get all public posts
router.get("/", postController.getAllPublicPosts);

// Get all posts (admin)
router.get("/admin", requireAdmin, postController.getAllPosts);

// Get public post by ID
router.get("/:postId", postController.getPublicPostById);

// Get any post by ID (admin)
router.get("/admin/:postId", requireAdmin, postController.getPostById);

// Submit new post
router.post("/", requireAdmin, postController.createPost);

// Edit post
router.patch("/:postId", requireAdmin, postController.updatePost);

// Delete post
router.delete("/:postId", requireAdmin, postController.deletePost);

// Get comments by post
router.get("/:postId/comments", commentController.getCommentsByPost);

// Submit comment on post
router.post("/:postId/comments", requireAuth, commentController.createComment);

export default router;
