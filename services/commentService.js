import { prisma } from "../config/prisma.js";

async function getPostIdFromSlug(slug) {
	const post = await prisma.post.findFirst({
		where: {
			slug,
			published: true,
		},
		select: { id: true },
	});

	return post?.id || null;
}

// Get comments by post
async function getByPostSlug(slug) {
	const postId = await getPostIdFromSlug(slug);

	if (!postId) return null;

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
		where: {
			authorId: userId,
			post: {
				published: true,
			},
		},
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
async function createForPostSlug({ content, authorId, slug }) {
	const postId = await getPostIdFromSlug(slug);

	if (!postId) return null;

	return prisma.comment.create({
		data: {
			content,
			authorId,
			postId,
		},
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
	getByPostSlug,
	getByUser,
	findById,
	createForPostSlug,
	update,
	remove,
};
