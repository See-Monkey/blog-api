import { prisma } from "../config/prisma.js";

beforeEach(async () => {
	// Clean all tables before every test
	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();
});

afterAll(async () => {
	await prisma.$disconnect();
});
