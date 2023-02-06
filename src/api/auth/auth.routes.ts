import { Request, Response, Router } from "express";
import validate from "@/api/utils/validate";
import { PrismaClient, User } from '@prisma/client'
import { checkPassword, createSession, getAccessToken, getSessionFromAccessToken, validateAccessToken } from "./auth.utils";
import { DateTime } from "luxon";

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
		}
	});

	// Invalid email
	if (user === null) return res.json({
		status: 401,
		message: "Login failed",
		errors: {
			email: "Invalid email address"
		}
	});

	// Check password
	if (!checkPassword(password, user.password)) return res.json({
		status: 401,
		message: "Login failed",
		errors: {
			email: "Invalid email password"
		}
	});
	
	// Create new session
	const session = await createSession(user.id);
	
	// Failed to create session
	if (session === null) return res.json({
		status: 500,
		message: "Failed to create session",
	});

	// Update user's last login time
	await prisma.user.update({
		where: {
			id: user.id
		},
		data: {
			updatedAt: DateTime.now().toJSDate().toISOString(),
		}
	})

	// Login success
	return res.json({
		status: 200,
		message: "Login success",
		data: {
			accessToken: session.token,
		},
	});


});

// [ User Logout ]
router.get('/logout', async (req: Request, res: Response) => {

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

	// Delete session
	await prisma.session.delete({
		where: {
			id: session.id,
		}
	});

	return res.json({
		status: 200,
		message: "Logout success",
	});

});

export { router as AuthRouter };