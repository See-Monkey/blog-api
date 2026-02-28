import request from "supertest";
import app from "../app.js";
import { prisma } from "../config/prisma.js";

describe("Auth Routes", () => {
	beforeAll(async () => {
		// ensure clean slate
		await prisma.user.deleteMany();
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
		await prisma.$disconnect();
	});

	describe("POST /api/auth/register", () => {
		it("should register a new user and return token", async () => {
			const res = await request(app).post("/api/auth/register").send({
				username: "testuser@example.com",
				password: "password123",
				confirmPassword: "password123",
				firstname: "Test",
				lastname: "User",
			});

			expect(res.status).toBe(201);

			expect(res.body).toHaveProperty("user");
			expect(res.body).toHaveProperty("token");

			expect(res.body.user.username).toBe("testuser@example.com");
			expect(res.body.user).not.toHaveProperty("password");
		});

		it("should not allow duplicate usernames", async () => {
			await request(app).post("/api/auth/register").send({
				username: "duplicate@example.com",
				password: "password123",
				firstname: "Test",
				lastname: "User",
			});

			const res = await request(app).post("/api/auth/register").send({
				username: "duplicate@example.com",
				password: "password123",
				firstname: "Test",
				lastname: "User",
			});

			expect(res.status).toBeGreaterThanOrEqual(400);
		});
	});

	describe("POST /api/auth/login", () => {
		beforeEach(async () => {
			await prisma.user.deleteMany();

			await request(app).post("/api/auth/register").send({
				username: "loginuser@example.com",
				password: "password123",
				confirmPassword: "password123",
				firstname: "Login",
				lastname: "User",
			});
		});

		it("should login with correct credentials", async () => {
			const res = await request(app).post("/api/auth/login").send({
				username: "loginuser@example.com",
				password: "password123",
			});

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("user");
			expect(res.body).toHaveProperty("token");
			expect(res.body.user.username).toBe("loginuser@example.com");
		});

		it("should reject invalid password", async () => {
			const res = await request(app).post("/api/auth/login").send({
				username: "loginuser@example.com",
				password: "wrongpassword",
			});

			expect(res.status).toBe(401);
			expect(res.body.message).toBe("Invalid credentials");
		});

		it("should reject non-existent user", async () => {
			const res = await request(app).post("/api/auth/login").send({
				username: "doesnotexist@example.com",
				password: "password123",
			});

			expect(res.status).toBe(401);
			expect(res.body.message).toBe("Invalid credentials");
		});
	});
});
