import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import UserModel from "../models/user";
import validate from "../utils/validate";

const router = Router();

// List all users
router.get('/', async (req: Request, res: Response) => {
	const users = await UserModel.index();
	return res.json({
		status: 200,
		message: "Get users success",
		data: users,
	});
});

// Create new user
router.post('/', async (req: Request, res: Response) => {

	// Validate request body
	const validation = validate(req.body, {
		email: "required",
		password: "required",
		role: "required",
		name: "required",
	});

	// Invalid request
	if (validation.invalid) return res.json({
		status: 400,
		errors: validation.errors,
		message: "Invalid request",
	});

	// Get request body
	const { email, password, role, name } = req.body;

	// Create new user
	const user = await UserModel.store({
		email, password, role, name
	});

	// Failed to create new user
	if (user === null) return res.json({
		status: 500,
		message: "Create new user failed",
	});

	// All is well
	return res.json({
		status: 200,
		message: "Create new user success",
		data: user,
	});

	
});

// Get user by id
router.get('/:userId', async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const user = await UserModel.get(userId);
	if (user === null) return res.json({
		status: 404,
		message: `Failed to get user with id ${userId}`,
		data: null,
	});
	return res.json({
		status: 200,
		message: `Get user with id ${userId} success`,
		data: user,
	});
});

// Update user by id
router.put('/:userId', async (req: Request, res: Response) => {
	const userId = req.params.userId;

	// Check if user exists
	const userExists = (await UserModel.get(userId)) !== null;
	if (!userExists) return res.json({
		status: 404,
		message: `There is no user with id ${userId}`,
		data: null,
	});

	// Get request body
	const { email, password, role, name } = req.body;

	// Update user
	const user = await UserModel.update(userId, {
		email, password, role, name
	});

	// Failed to update user
	if (user === null) return res.json({
		status: 500,
		message: `Update user with id ${userId} failed`,
	});

	// All is well
	return res.json({
		status: 200,
		message: `Update user with id ${userId} success`,
		data: user,
	});
});

// Delete user by id
router.delete('/:userId', async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const user = await UserModel.delete(userId);
	if (user === null) return res.json({
		status: 404,
		message: `Failed to get user with id ${userId}`,
		data: null,
	});

	return res.json({
		status: 200,
		message: `Delete user with id ${userId} success`,
		data: user,
	});
});

export { router as UserRouter };