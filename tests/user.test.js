import request from "supertest";
import app from "../app.js";
import { registerUser, loginUser } from "./helpers/authHelper.js";

describe("User Routes", () => {
	describe("GET /api/users/me", () => {
		it("should return current user when authenticated", async () => {
			await registerUser({ username: "me@example.com" });
			const loginRes = await loginUser({ username: "me@example.com" });

			const res = await request(app)
				.get("/api/users/me")
				.set("Authorization", `Bearer ${loginRes.body.token}`);

			expect(res.status).toBe(200);
			expect(res.body.username).toBe("me@example.com");
			expect(res.body).not.toHaveProperty("password");
		});

		it("should reject when unauthenticated", async () => {
			const res = await request(app).get("/api/users/me");
			expect(res.status).toBe(401);
		});
	});

	describe("PATCH /api/users/me", () => {
		it("should update own profile", async () => {
			await registerUser({ username: "update@example.com" });
			const loginRes = await loginUser({ username: "update@example.com" });

			const res = await request(app)
				.patch("/api/users/me")
				.set("Authorization", `Bearer ${loginRes.body.token}`)
				.send({ firstname: "Updated" });

			expect(res.status).toBe(200);
			expect(res.body.firstname).toBe("Updated");
		});
	});

	describe("GET /api/users/:userId", () => {
		it("should return public profile", async () => {
			const reg = await registerUser({ username: "public@example.com" });
			const userId = reg.body.user.id;

			const res = await request(app).get(`/api/users/${userId}`);

			expect(res.status).toBe(200);
			expect(res.body.username).toBe("public@example.com");
			expect(res.body).not.toHaveProperty("password");
		});
	});
});
