"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMiddleware = exports.AuthMiddleware = void 0;
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("../models/user"));
const auth_utils_1 = require("./auth.utils");
const prisma = new client_1.PrismaClient();
const AuthMiddleware = async (req, res, next) => {
    // Get access token
    const accessToken = (0, auth_utils_1.getAccessToken)(req.header("Authorization"));
    // No access token
    if (accessToken === null)
        return res.json({
            status: 401,
            message: "Unauthorized access",
        });
    // Get session
    const session = await (0, auth_utils_1.getSessionFromAccessToken)(accessToken);
    // Invalid access token
    if (session === null)
        return res.json({
            status: 401,
            message: "Unauthorized access",
        });
    // Get authenticated user
    const user = await user_1.default.get(session.userId);
    // No user found
    if (user === null)
        return res.json({
            status: 401,
            message: "Unauthorized access",
        });
    // All is well
    req.body.user = user;
    next();
};
exports.AuthMiddleware = AuthMiddleware;
const AdminMiddleware = async (req, res, next) => {
    const user = req.body.user;
    if (user === null || user.role !== "admin")
        return res.json({
            status: 401,
            message: "Unauthorized access",
        });
    next();
};
exports.AdminMiddleware = AdminMiddleware;
