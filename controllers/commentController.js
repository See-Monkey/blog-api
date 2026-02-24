import commentService from "../services/commentService.js";

// Get comments by post
async function getCommentsByPost(req, res, next) {
	try {
		const comments = await commentService.getByPost(req.params.postId);
		res.json(comments);
	} catch (err) {
		next(err);
	}
}

// Get comments by user
async function getCommentsByUser(req, res, next) {
	try {
		const comments = await commentService.getByUser(req.params.userId);
		res.json(comments);
	} catch (err) {
		next(err);
	}
}

// Submit new comment
async function createComment(req, res, next) {
	try {
		const comment = await commentService.create({
			content: req.body.content,
			authorId: req.user.id,
			postId: req.params.postId,
		});
		res.status(201).json(comment);
	} catch (err) {
		next(err);
	}
}

// Edit comment
async function updateComment(req, res, next) {
	try {
		const comment = await commentService.findById(req.params.commentId);
		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		if (req.user.role !== "ADMIN" && comment.authorId !== req.user.id) {
			return res.status(403).json({ message: "Forbidden" });
		}

		const updated = await commentService.update(
			req.params.commentId,
			req.body.content,
		);

		res.json(updated);
	} catch (err) {
		next(err);
	}
}

// Delete comment
async function deleteComment(req, res, next) {
	try {
		const comment = await commentService.findById(req.params.commentId);
		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		if (req.user.role !== "ADMIN" && comment.authorId !== req.user.id) {
			return res.status(403).json({ message: "Forbidden" });
		}

		await commentService.remove(req.params.commentId);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
}

export default {
	getCommentsByPost,
	getCommentsByUser,
	createComment,
	updateComment,
	deleteComment,
};
