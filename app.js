import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import { configurePassport } from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Cross origin resource sharing
app.use(
	cors({
		origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : "*",
	}),
);

// Parse JSON payload into req.body
app.use(express.json());

// Setup passport
configurePassport();
app.use(passport.initialize());

// Health check
app.get("/", (req, res) => {
	res.json({
		name: "Blog API",
		version: "1.0.0",
		status: "OK",
	});
});

// Custom routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// 404 for no routes found
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Catch middleware errors
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
