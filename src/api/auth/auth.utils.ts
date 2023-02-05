import { PrismaClient, Session } from "@prisma/client";
import { AES } from "crypto-js";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";
const prisma = new PrismaClient();

// Get APP_KEY
export function getAppKey(): string {
	return process.env.APP_KEY ? process.env.APP_KEY : "APP_KEY";
}

// Create session using user's id
export async function createSession(userId: number): Promise<Session|null> {
	const session = await prisma.session.create({data: {
		userId: userId,
		token: AES.encrypt(uuid() + Math.floor(DateTime.now().toSeconds()), getAppKey()).toString(),
		expiredAt: DateTime.now().plus({ weeks: 1 }).toJSDate().toISOString(),
	}});
	return session;
}