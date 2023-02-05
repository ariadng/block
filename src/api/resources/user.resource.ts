import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import UserModel from "../models/user";

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

export { router as UserRouter };