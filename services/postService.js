import { prisma } from "../config/prisma.js";

// Get all published posts (public)
async function getAllPublic() {
	return prisma.post.findMany({
		where: { published: true },
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

// Get all posts (admin)
async function getAll() {
	return prisma.post.findMany({
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

// Get public post by ID
async function findPublicById(id) {
	return prisma.post.findFirst({
		where: { id, published: true },
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
			comments: {
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
			},
		},
	});
}

// Get post by ID
async function findById(id) {
	return prisma.post.findUnique({
		where: { id },
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
			comments: {
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
			},
		},
	});
}

// Create new post (admin)
async function create({ title, slug, content, published, authorId }) {
	return prisma.post.create({
		data: {
			title,
			slug,
			content,
			published: !!published,
			authorId,
		},
	});
}

// Update post (admin)
async function update(id, data) {
	const allowedFields = ["title", "slug", "content", "published"];

	const filteredData = Object.fromEntries(
		Object.entries(data).filter(([key]) => allowedFields.includes(key)),
	);

	return prisma.post.update({
		where: { id },
		data: filteredData,
	});
}

// Delete post (admin)
async function remove(id) {
	return prisma.post.delete({
		where: { id },
	});
}

export default {
	getAllPublic,
	getAll,
	findPublicById,
	findById,
	create,
	update,
	remove,
};
