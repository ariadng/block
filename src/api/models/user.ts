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
		const password = AES.encrypt(data.password ? data.password : "", getAppKey()).toString();
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

	// Check whether an email has been used
	public static async emailAvailable(email: string): Promise<boolean> {
		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});
		return (user === null);
	}

}