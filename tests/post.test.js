import request from "supertest";
import app from "../app.js";
import {
	registerUser,
	loginUser,
	createAdminUser,
} from "./helpers/authHelper.js";

describe("Post Routes", () => {
	describe("POST /api/posts", () => {
		it("should allow admin to create a post", async () => {
			const { token } = await createAdminUser({
				username: "admin@example.com",
			});

			const res = await request(app)
				.post("/api/posts")
				.set("Authorization", `Bearer ${token}`)
				.send({
					title: "Admin Post",
					content: "Post content",
					published: true,
				});

			expect(res.status).toBe(201);
			expect(res.body.title).toBe("Admin Post");
			expect(res.body).toHaveProperty("slug");
		});

		it("should reject non-admin user", async () => {
			await registerUser({ username: "user@example.com" });
			const loginRes = await loginUser({ username: "user@example.com" });

			const res = await request(app)
				.post("/api/posts")
				.set("Authorization", `Bearer ${loginRes.body.token}`)
				.send({
					title: "Unauthorized Post",
					content: "Content",
					published: true,
				});

			expect(res.status).toBe(403);
		});
	});

	describe("GET /api/posts", () => {
		it("should return public posts", async () => {
			const res = await request(app).get("/api/posts");

			expect(res.status).toBe(200);
			expect(Array.isArray(res.body)).toBe(true);
		});
	});

	describe("GET /api/posts/:slug", () => {
		it("should return a post by slug", async () => {
			const { token } = await createAdminUser({
				username: "slugadmin@example.com",
			});

			const createRes = await request(app)
				.post("/api/posts")
				.set("Authorization", `Bearer ${token}`)
				.send({
					title: "Slug Post",
					content: "Content",
					published: true,
				});

			const slug = createRes.body.slug;

			const res = await request(app).get(`/api/posts/${slug}`);

			expect(res.status).toBe(200);
			expect(res.body.slug).toBe(slug);
		});
	});
});
