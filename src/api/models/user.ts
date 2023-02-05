import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

interface UserInterface {
	id: number;
    email: string;
    name: string;
    role: string;
    lastLogin: Date | null;
}

export default class UserModel {

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

}