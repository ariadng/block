import { Request, Response } from "express";
import UserModel from "../models/user";

// Get the authenticated account
export async function getAccount (req: Request, res: Response) {
	if (typeof req.body.user === "undefined") return res.json({
		status: 401,
		message: "Get account failed",
	});
	return res.json({
		status: 200,
		message: "Get account success",
		data: req.body.user,
	});
}

// Update authenticated account
export async function updateAccount (req: Request, res: Response) {
	if (typeof req.body.user === "undefined") return res.json({
		status: 401,
		message: "Get account failed",
	});
	
	// Get request body
	const { email, password, role, name } = req.body;

	// Update user
	const user = await UserModel.update(req.body.user.id, {
		email, password, name
	});

	// Failed to update user
	if (user === null) return res.json({
		status: 500,
		message: `Update user with id ${req.body.user.id} failed`,
	});

	// All is well
	return res.json({
		status: 200,
		message: `Update user with id ${req.body.user.id} success`,
		data: user,
	});
}