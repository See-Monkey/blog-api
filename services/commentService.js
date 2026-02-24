import { prisma } from "../config/prisma.js";

// Get comments by post
async function getByPost(postId) {
	return prisma.comment.findMany({
		where: { postId },
		orderBy: { createdAt: "desc" },
		include: {
			author: {
				select: {
					id: true,
					username: true,
					firstname: true,
					lastname: true,
					avatarUrl: true,
				},
			},
		},
	});
}

// Get comments by user
async function getByUser(userId) {
	return prisma.comment.findMany({
		where: { authorId: userId },
		orderBy: { createdAt: "desc" },
		include: {
			post: {
				select: {
					id: true,
					title: true,
					slug: true,
				},
			},
		},
	});
}

// Find comment by ID (internal use)
async function findById(id) {
	return prisma.comment.findUnique({
		where: { id },
	});
}

// Create comment
async function create({ content, authorId, postId }) {
	return prisma.comment.create({
		data: {
			content,
			authorId,
			postId,
		},
	});
}

// Update comment
async function update(id, content) {
	return prisma.comment.update({
		where: { id },
		data: { content },
	});
}

// Delete comment
async function remove(id) {
	return prisma.comment.delete({
		where: { id },
	});
}

export default {
	getByPost,
	getByUser,
	findById,
	create,
	update,
	remove,
};
