import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import postController from "../controllers/postController.js";

const router = Router();

// Get all posts
router.get("/", postController.getAllPosts);

// Get post by ID
router.get("/:id", postController.getPostById);

// Submit new post
router.post("/", requireAdmin, postController.newPost);

// Edit post
router.patch("/:id", requireAdmin, postController.editPost);

// Delete post
router.delete("/:id", requireAdmin, postController.deletePost);

export default router;
