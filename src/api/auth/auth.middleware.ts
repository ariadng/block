import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import { getAccessToken, getSessionFromAccessToken } from "./auth.utils";

const prisma = new PrismaClient();

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	
	// Get access token
	const accessToken = getAccessToken(req.header("Authorization"));

	// No access token
	if (accessToken === null) return res.json({
		status: 400,
		message: "Access token in request header is required",
	});

	// Get session
	const session = await getSessionFromAccessToken(accessToken);

	// Invalid access token
	if (session === null) return res.json({
		status: 401,
		message: "Access token is invalid",
	});

	// Get authenticated user
	const user = await UserModel.get(session.userId);

	// No user found
	if (user === null) return res.json({
		status: 401,
		message: "Unauthorized access",
	});

	// All is well
	req.body.user = user;
	next();
};

export default AuthMiddleware;