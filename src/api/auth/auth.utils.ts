import { PrismaClient, Session, User } from "@prisma/client";
import { AES } from "crypto-js";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";
const prisma = new PrismaClient();

// Get APP_KEY
export function getAppKey(): string {
	return process.env.APP_KEY ? process.env.APP_KEY : "APP_KEY";
}

// Get access token from request header
export function getAccessToken(authString?: string): string | null {
	if (typeof authString === "undefined") return null;
	if (authString.split(' ').length < 2) return null;
	const accessToken = authString.split(' ')[1];
	return accessToken;
}

// Validate access token
export async function validateAccessToken(token: string): Promise<boolean> {
	const session = await prisma.session.findFirst({ where: {
		token: token,
	}});
	if (session === null) return false;
	return true;
}

// Get session from access token
export async function getSessionFromAccessToken(token: string): Promise<Session|null> {
	const session = await prisma.session.findFirst({
		where: {
			token: token,
		}
	});
	return session;
}

// Create session using user's id
export async function createSession(userId: number): Promise<Session|null> {
	const expiration = DateTime.now().plus({ weeks: 1 }).toJSDate().toISOString();
	const tokenObject = {
		id: userId,
		salt: uuid() + Math.floor(DateTime.now().toSeconds()),
		exp: expiration,
	};
	const session = await prisma.session.create({data: {
		userId: userId,
		token: AES.encrypt(JSON.stringify(tokenObject), getAppKey()).toString(),
		expiredAt: expiration,
	}});
	return session;
}