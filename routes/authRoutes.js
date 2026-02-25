import { Router } from "express";
import {
	validateRegister,
	validateLogin,
	handleValidationErrors,
} from "../middleware/validators.js";
import authController from "../controllers/authController.js";

const router = Router();

// Register new user
router.post(
	"/register",
	validateRegister,
	handleValidationErrors,
	authController.register,
);

// Login user
router.post(
	"/login",
	validateLogin,
	handleValidationErrors,
	authController.login,
);

export default router;
