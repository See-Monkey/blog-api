import postService from "../services/postService.js";

// Get all public posts
async function getAllPublicPosts(req, res, next) {
	try {
		const page = Math.max(1, Number(req.query.page) || 1);
		const limit = Math.min(60, Number(req.query.limit) || 20);

		const posts = await postService.getAllPublic({ page, limit });
		res.json(posts);
	} catch (err) {
		next(err);
	}
}

// Get all posts (admin)
async function getAllPosts(req, res, next) {
	try {
		const page = Math.max(1, Number(req.query.page) || 1);
		const limit = Math.min(60, Number(req.query.limit) || 20);

		const posts = await postService.getAll({ page, limit });
		res.json(posts);
	} catch (err) {
		next(err);
	}
}

// Get public post by slug
async function getPublicPostBySlug(req, res, next) {
	try {
		const post = await postService.findPublicBySlug(req.params.slug);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.json(post);
	} catch (err) {
		next(err);
	}
}

// Get post by ID
async function getPostById(req, res, next) {
	try {
		const post = await postService.findById(req.params.postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.json(post);
	} catch (err) {
		next(err);
	}
}

// Submit new post (admin)
async function createPost(req, res, next) {
	try {
		const post = await postService.create({
			...req.body,
			authorId: req.user.id,
		});
		res.status(201).json(post);
	} catch (err) {
		next(err);
	}
}

// Edit post (admin)
async function updatePost(req, res, next) {
	try {
		const updated = await postService.update(req.params.postId, req.body);
		res.json(updated);
	} catch (err) {
		next(err);
	}
}

// Delete post (admin)
async function deletePost(req, res, next) {
	try {
		await postService.remove(req.params.postId);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
}

export default {
	getAllPublicPosts,
	getAllPosts,
	getPublicPostBySlug,
	getPostById,
	createPost,
	updatePost,
	deletePost,
};
