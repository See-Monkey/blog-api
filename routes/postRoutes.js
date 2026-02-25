import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import postController from "../controllers/postController.js";
import commentController from "../controllers/commentController.js";

const router = Router();

// Get all public posts
router.get("/", postController.getAllPublicPosts);

// Get all posts (admin)
router.get("/admin", requireAdmin, postController.getAllPosts);

// Get any post by ID (admin)
router.get("/admin/:postId", requireAdmin, postController.getPostById);

// Submit new post
router.post("/", requireAdmin, postController.createPost);

// Edit post (admin)
router.patch("/:postId", requireAdmin, postController.updatePost);

// Delete post (admin)
router.delete("/:postId", requireAdmin, postController.deletePost);

// Get comments by post
router.get("/:slug/comments", commentController.getCommentsByPost);

// Submit comment on post
router.post("/:slug/comments", requireAuth, commentController.createComment);

// Get public post by slug
router.get("/:slug", postController.getPublicPostBySlug);

export default router;
