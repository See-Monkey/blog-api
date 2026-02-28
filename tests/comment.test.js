import request from "supertest";
import app from "../app.js";
import {
	registerUser,
	loginUser,
	createAdminUser,
} from "./helpers/authHelper.js";

describe("Comment Routes", () => {
	let slug;

	beforeEach(async () => {
		const { token } = await createAdminUser({
			username: "postadmin@example.com",
		});

		const postRes = await request(app)
			.post("/api/posts")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Comment Post",
				content: "Post content",
				published: true,
			});

		slug = postRes.body.slug;
	});

	describe("POST /api/posts/:slug/comments", () => {
		it("should allow authenticated user to comment", async () => {
			await registerUser({ username: "commenter@example.com" });
			const loginRes = await loginUser({
				username: "commenter@example.com",
			});

			const res = await request(app)
				.post(`/api/posts/${slug}/comments`)
				.set("Authorization", `Bearer ${loginRes.body.token}`)
				.send({ content: "Nice post!" });

			expect(res.status).toBe(201);
			expect(res.body.content).toBe("Nice post!");
			expect(res.body).toHaveProperty("author");
		});

		it("should reject unauthenticated comment", async () => {
			const res = await request(app)
				.post(`/api/posts/${slug}/comments`)
				.send({ content: "Fail comment" });

			expect(res.status).toBe(401);
		});
	});

	describe("GET /api/posts/:slug/comments", () => {
		it("should return comments for a post", async () => {
			const res = await request(app).get(`/api/posts/${slug}/comments`);

			expect(res.status).toBe(200);
			expect(Array.isArray(res.body)).toBe(true);
		});
	});
});
