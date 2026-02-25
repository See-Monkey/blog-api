import { body, param, validationResult } from "express-validator";

export const validateRegister = [
	body("username")
		.trim()
		.isEmail()
		.withMessage("Must be a valid email address")
		.normalizeEmail(),

	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters"),

	body("confirmPassword")
		.notEmpty()
		.withMessage("Confirm password required")
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords do not match");
			}
			return true;
		}),

	body("firstname")
		.optional()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("First name must be between 1 and 30 characters"),

	body("lastname")
		.optional()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("Last name must be between 1 and 30 characters"),

	body("avatarUrl")
		.optional()
		.isURL()
		.withMessage("Avatar must be a valid URL"),
];

export const validateLogin = [
	body("username")
		.trim()
		.isEmail()
		.withMessage("Must be a valid email address")
		.normalizeEmail(),

	body("password").notEmpty().withMessage("Password required"),
];

export const validateUpdateMe = [
	body("firstname")
		.optional()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("First name must be between 1 and 30 characters"),

	body("lastname")
		.optional()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("Last name must be between 1 and 30 characters"),

	body("avatarUrl")
		.optional()
		.isURL()
		.withMessage("Avatar must be a valid URL"),
];

export const validateChangePassword = [
	body("currentPassword").notEmpty().withMessage("Current password required"),

	body("newPassword")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters"),

	body("confirmPassword")
		.notEmpty()
		.withMessage("Confirm password required")
		.custom((value, { req }) => {
			if (value !== req.body.newPassword) {
				throw new Error("Passwords do not match");
			}
			return true;
		}),
];

export const validateCreatePost = [
	body("title")
		.trim()
		.isLength({ min: 3, max: 200 })
		.withMessage("Title required"),

	body("content").trim().isLength({ min: 1 }).withMessage("Content required"),

	body("published")
		.optional()
		.isBoolean()
		.withMessage("Published must be boolean"),
];

export const validateUpdatePost = [
	body("title")
		.optional()
		.trim()
		.isLength({ min: 3, max: 200 })
		.withMessage("Title required"),

	body("content")
		.optional()
		.trim()
		.isLength({ min: 1 })
		.withMessage("Content required"),

	body("published").optional().isBoolean(),
];

export const validateCreateComment = [
	body("content")
		.trim()
		.isLength({ min: 1, max: 2000 })
		.withMessage("Comment cannot be empty or longer than 2000 characters"),
];

export const validateUpdateComment = [
	body("content")
		.trim()
		.isLength({ min: 1, max: 2000 })
		.withMessage("Comment cannot be empty or longer than 2000 characters"),
];

export const validatePostIdParam = [
	param("postId").isUUID().withMessage("Invalid post ID"),
];

export const validateSlugParam = [
	param("slug")
		.trim()
		.matches(/^[a-z0-9-]+$/)
		.withMessage("Invalid slug"),
];

export const validateCommentIdParam = [
	param("commentId").isUUID().withMessage("Invalid comment ID"),
];

export function handleValidationErrors(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	next();
}
