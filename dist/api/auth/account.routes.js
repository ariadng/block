"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccount = exports.getAccount = void 0;
const user_1 = __importDefault(require("../models/user"));
// Get the authenticated account
async function getAccount(req, res) {
    if (typeof req.body.user === "undefined")
        return res.json({
            status: 401,
            message: "Get account failed",
        });
    return res.json({
        status: 200,
        message: "Get account success",
        data: req.body.user,
    });
}
exports.getAccount = getAccount;
// Update authenticated account
async function updateAccount(req, res) {
    if (typeof req.body.user === "undefined")
        return res.json({
            status: 401,
            message: "Get account failed",
        });
    // Get request body
    const { email, password, role, name } = req.body;
    // Update user
    const user = await user_1.default.update(req.body.user.id, {
        email, password, name
    });
    // Failed to update user
    if (user === null)
        return res.json({
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
exports.updateAccount = updateAccount;
