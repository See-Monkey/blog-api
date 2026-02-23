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

// cross origin resource sharing
app.use(
	cors({
		origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : "*",
	}),
);

// parse JSON payload into req.body
app.use(express.json());

// setup passport
configurePassport();
app.use(passport.initialize());

// custom routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// 404 for no routes found
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// catch middleware errors
app.use(errorHandler);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
