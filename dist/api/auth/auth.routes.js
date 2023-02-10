"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_utils_1 = require("./auth.utils");
const luxon_1 = require("luxon");
const validate_1 = __importDefault(require("../utils/validate"));
const router = (0, express_1.Router)();
exports.AuthRouter = router;
const prisma = new client_1.PrismaClient();
router.get('/', (req, res) => res.send("api/auth"));
// [ User Login ]
router.post('/login', async (req, res) => {
    // Validate request body
    const validation = (0, validate_1.default)(req.body, {
        email: "required",
        password: "required",
    });
    // Invalid request
    if (validation.invalid)
        return res.json({
            status: 400,
            errors: validation.errors,
            message: "Invalid request",
        });
    // Get request body
    const { email, password } = req.body;
    // Get user data from provided credentials
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });
    // Invalid email
    if (user === null)
        return res.json({
            status: 401,
            message: "Login failed",
            errors: {
                email: "Invalid email address"
            }
        });
    // Check password
    if (!(0, auth_utils_1.checkPassword)(password, user.password))
        return res.json({
            status: 401,
            message: "Login failed",
            errors: {
                password: "Invalid password"
            }
        });
    // Create new session
    const session = await (0, auth_utils_1.createSession)(user.id);
    // Failed to create session
    if (session === null)
        return res.json({
            status: 500,
            message: "Failed to create session",
        });
    // Update user's last login time
    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            updatedAt: luxon_1.DateTime.now().toJSDate().toISOString(),
        }
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
// [ User Logout ]
router.get('/logout', async (req, res) => {
    // Get access token
    const accessToken = (0, auth_utils_1.getAccessToken)(req.header("Authorization"));
    // No access token
    if (accessToken === null)
        return res.json({
            status: 400,
            message: "Access token in request header is required",
        });
    // Get session
    const session = await (0, auth_utils_1.getSessionFromAccessToken)(accessToken);
    // Invalid access token
    if (session === null)
        return res.json({
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
