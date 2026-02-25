import generateBaseSlug from "../utils/slug.js";
import { prisma } from "../config/prisma.js";

async function generateUniqueSlug(title) {
	const baseSlug = generateBaseSlug(title);

	let slug = baseSlug;
	let counter = 1;

	while (true) {
		const existing = await prisma.post.findUnique({
			where: { slug },
		});

		if (!existing) break;

		counter++;
		slug = `${baseSlug}-${counter}`;
	}

	return slug;
}

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
			comments: {
				orderBy: { createdAt: "desc" },
				take: 3,
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
			_count: {
				select: { comments: true },
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
			_count: {
				select: { comments: true },
			},
		},
	});
}

// Get public post by ID
async function findPublicBySlug(slug) {
	return prisma.post.findFirst({
		where: {
			slug,
			published: true,
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
			_count: {
				select: { comments: true },
			},
		},
	});
}

// Get post by ID (admin)
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
			_count: {
				select: { comments: true },
			},
		},
	});
}

// Create new post (admin)
async function create({ title, content, published, authorId }) {
	const slug = await generateUniqueSlug(title);

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
	const existing = await prisma.post.findUnique({
		where: { id },
	});

	if (!existing) {
		throw new Error("Post not found");
	}

	const updateData = {};

	if (typeof data.title === "string" && data.title !== existing.title) {
		updateData.title = data.title;
		updateData.slug = await generateUniqueSlug(data.title);
	}

	if (typeof data.content === "string") {
		updateData.content = data.content;
	}

	if (typeof data.published === "boolean") {
		updateData.published = data.published;
	}

	return prisma.post.update({
		where: { id },
		data: updateData,
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
	findPublicBySlug,
	findById,
	create,
	update,
	remove,
};
