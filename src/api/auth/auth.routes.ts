import { Request, Response, Router } from "express";
import validate from "@/api/utils/validate";
import { PrismaClient, User } from '@prisma/client'
import { createSession } from "./auth.utils";

const router = Router();
const prisma = new PrismaClient();

router.get('/', (req: Request, res: Response) => res.send("api/auth"));

// [ User Login ]
router.post('/login', async (req: Request, res: Response) => {
	
	// Validate request body
	const validation = validate(req.body, {
		email: "required",
		password: "required",
	});

	// Invalid request
	if (validation.invalid) return res.json({
		status: 400,
		errors: validation.errors,
		message: "Invalid request",
	});

	// Get request body
	const { email, password } = req.body;

	// Get user data from provided credentials
	const user: User | null = await prisma.user.findFirst({
		where: {
			email: email,
			password: password,
		}
	});

	// Invalid credentials
	if (user === null) return res.json({
		status: 401,
		message: "Invalid credentials",
	});
	
	// Create new session
	const session = await createSession(user.id);
	
	// Failed to create session
	if (session === null) return res.json({
		status: 500,
		message: "Failed to create session",
	});

	// Login success
	return res.json({
		status: 200,
		message: "Login success",
		data: {
			accessToken: session.token,
		},
	});


});

export { router as AuthRouter };