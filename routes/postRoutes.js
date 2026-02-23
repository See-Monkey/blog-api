import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import postController from "../controllers/postController.js";
import commentController from "../controllers/commentController.js";

const router = Router();

// Get all posts
router.get("/", postController.getAllPosts);

// Get post by ID
router.get("/:id", postController.getPostById);

// Submit new post
router.post("/", requireAdmin, postController.createPost);

// Edit post
router.patch("/:id", requireAdmin, postController.updatePost);

// Delete post
router.delete("/:id", requireAdmin, postController.deletePost);

// Get comments by post
router.get("/:id/comments", commentController.getCommentsByPost);

// Submit comment on post
router.post("/:id/comments", requireAuth, commentController.createComment);

export default router;
