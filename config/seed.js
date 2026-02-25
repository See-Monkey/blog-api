import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";

async function main() {
	// Wipe database
	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();

	// Create admin
	const hashedPassword = await bcrypt.hash("MyPassword123!", 10);

	const user = await prisma.user.create({
		data: {
			username: "admin@example.com",
			password: hashedPassword,
			firstname: "Admin",
			lastname: "User",
			role: "ADMIN",
		},
	});

	const post = await prisma.post.create({
		data: {
			title: "Welcome to the Blog",
			slug: "welcome-to-the-blog",
			content: "This is the first seeded post in the system.",
			published: true,
			authorId: user.id,
		},
	});

	// Create regular user
	const userPassword = await bcrypt.hash("UserPassword123!", 10);

	const regularUser = await prisma.user.create({
		data: {
			username: "user@example.com",
			password: userPassword,
			firstname: "Regular",
			lastname: "User",
			role: "USER",
		},
	});

	// Create comment
	await prisma.comment.create({
		data: {
			content: "This is a seeded comment from a regular user.",
			authorId: regularUser.id,
			postId: post.id,
		},
	});

	console.log("Database successfully seeded.");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
