"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_js_1 = require("crypto-js");
const auth_utils_1 = require("../auth/auth.utils");
const prisma = new client_1.PrismaClient();
class UserModel {
    // List users
    static async index() {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                lastLogin: true,
            },
            orderBy: {
                name: "asc"
            }
        });
        return users;
    }
    // Create new user
    static async store(data) {
        const password = UserModel.encryptPassword(data.password);
        const user = await prisma.user.create({ data: {
                email: data.email ? data.email : "",
                name: data.name ? data.name : "",
                role: data.role ? data.role : "viewer",
                photo: data.photo ? data.photo : "",
                password: password,
            } });
        if (user === null)
            return null;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
    // Get user by id
    static async get(id) {
        const userId = (typeof id === "string") ? parseInt(id) : id;
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                photo: true,
                lastLogin: true,
            }
        });
        return user;
    }
    // Update user by id
    static async update(id, data) {
        const userId = (typeof id === "string") ? parseInt(id) : id;
        const userExists = (await UserModel.get(userId)) !== null;
        if (!userExists)
            return null;
        let updated = {};
        if (typeof data.email !== "undefined" && (await UserModel.emailAvailable(data.email)))
            updated["email"] = data.email;
        if (typeof data.password !== "undefined")
            updated["password"] = UserModel.encryptPassword(data.password);
        if (typeof data.role !== "undefined")
            updated["role"] = data.role;
        if (typeof data.name !== "undefined")
            updated["name"] = data.name;
        if (typeof data.photo !== "undefined")
            updated["photo"] = data.photo;
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: updated,
        });
        return user;
    }
    // Delete user by id
    static async delete(id) {
        const userId = (typeof id === "string") ? parseInt(id) : id;
        // Delete sessions
        await prisma.session.deleteMany({
            where: {
                userId: userId,
            },
        });
        // Delete user
        const user = await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        return user;
    }
    // Check whether an email has been used
    static async emailAvailable(email, id) {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (user === null)
            return true;
        if (typeof id === "undefined")
            return false;
        if (user.id === id)
            return true;
        return false;
    }
    // Create an encrypted password
    static encryptPassword(unencrypted) {
        if (typeof unencrypted === "undefined")
            return "";
        return crypto_js_1.AES.encrypt(unencrypted, (0, auth_utils_1.getAppKey)()).toString();
    }
}
exports.default = UserModel;
