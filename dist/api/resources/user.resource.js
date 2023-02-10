"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const validate_1 = __importDefault(require("../utils/validate"));
const router = (0, express_1.Router)();
exports.UserRouter = router;
// List all users
router.get('/', async (req, res) => {
    const users = await user_1.default.index();
    return res.json({
        status: 200,
        message: "Get users success",
        data: users,
    });
});
// Create new user
router.post('/', async (req, res) => {
    // Validate request body
    const validation = (0, validate_1.default)(req.body, {
        email: "required",
        password: "required",
        role: "required",
        name: "required",
    });
    // Invalid request
    if (validation.invalid)
        return res.json({
            status: 400,
            errors: validation.errors,
            message: "Invalid request",
        });
    // Get request body
    const { email, password, role, name, photo } = req.body;
    // Create new user
    const user = await user_1.default.store({
        email, password, role, name, photo
    });
    // Failed to create new user
    if (user === null)
        return res.json({
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
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await user_1.default.get(userId);
    if (user === null)
        return res.json({
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
router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    // Check if user exists
    const userExists = (await user_1.default.get(userId)) !== null;
    if (!userExists)
        return res.json({
            status: 404,
            message: `There is no user with id ${userId}`,
            data: null,
        });
    // Get request body
    const { email, password, role, name, photo } = req.body;
    // Update user
    const user = await user_1.default.update(userId, {
        email, password, role, name, photo
    });
    // Failed to update user
    if (user === null)
        return res.json({
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
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await user_1.default.delete(userId);
    if (user === null)
        return res.json({
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
