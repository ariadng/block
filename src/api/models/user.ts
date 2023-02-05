import { PrismaClient, User } from "@prisma/client";
import { AES } from "crypto-js";
import { getAppKey } from "../auth/auth.utils";

const prisma = new PrismaClient();

interface UserInterface {
	id?: number;
    email?: string;
    password?: string;
    name?: string;
    role?: string;
    lastLogin?: Date | null;
}

export default class UserModel {

	// List users
	public static async index(): Promise<UserInterface[]> {
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
	public static async store(data: UserInterface) {
		const password = UserModel.encryptPassword(data.password);
		const user = await prisma.user.create({data: {
			email: data.email ? data.email : "",
			name: data.name ? data.name : "",
			role: data.role ? data.role : "viewer",
			password: password,
		}});
		if (user === null) return null;
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
		}
	}

	// Get user by id
	public static async get(id: number | string): Promise<UserInterface|null> {
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
				lastLogin: true,
			}
		});
		return user;
	}

	// Update user by id
	public static async update(id: number | string, data: UserInterface): Promise<UserInterface|null> {
		const userId = (typeof id === "string") ? parseInt(id) : id;
		const userExists = (await UserModel.get(userId)) !== null;
		if (!userExists) return null;
		let updated: UserInterface = {};
		if (typeof data.email !== "undefined" && (await UserModel.emailAvailable(data.email))) updated["email"] = data.email;
		if (typeof data.password !== "undefined") updated["password"] = UserModel.encryptPassword(data.password);
		if (typeof data.role !== "undefined") updated["role"] = data.role;
		if (typeof data.name !== "undefined") updated["name"] = data.name;
		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: updated,
		});
		return user;
	}

	// Check whether an email has been used
	public static async emailAvailable(email: string, id?: number): Promise<boolean> {
		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});
		if (user === null) return true;
		if (typeof id === "undefined") return false;
		if (user.id === id) return true;
		return false;
	}

	// Create an encrypted password
	public static encryptPassword(unencrypted?: string): string {
		if (typeof unencrypted === "undefined") return "";
		return AES.encrypt(unencrypted, getAppKey()).toString();
	}

}