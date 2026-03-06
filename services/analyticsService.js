import { prisma } from "../config/prisma.js";

async function getAnalytics() {
	const [users, totalPosts, publishedPosts, comments] = await Promise.all([
		prisma.user.count(),
		prisma.post.count(),
		prisma.post.count({
			where: { published: true },
		}),
		prisma.comment.count(),
	]);

	return {
		users,
		totalPosts,
		publishedPosts,
		comments,
	};
}

export default {
	getAnalytics,
};
