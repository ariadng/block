"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.createSession = exports.getSessionFromAccessToken = exports.validateAccessToken = exports.getAccessToken = exports.getAppKey = void 0;
const client_1 = require("@prisma/client");
const crypto_js_1 = require("crypto-js");
const luxon_1 = require("luxon");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
// Get APP_KEY
function getAppKey() {
    return process.env.APP_KEY ? process.env.APP_KEY : "APP_KEY";
}
exports.getAppKey = getAppKey;
// Get access token from request header
function getAccessToken(authString) {
    if (typeof authString === "undefined")
        return null;
    if (authString.split(' ').length < 2)
        return null;
    const accessToken = authString.split(' ')[1];
    return accessToken;
}
exports.getAccessToken = getAccessToken;
// Validate access token
async function validateAccessToken(token) {
    const session = await prisma.session.findFirst({ where: {
            token: token,
        } });
    if (session === null)
        return false;
    return true;
}
exports.validateAccessToken = validateAccessToken;
// Get session from access token
async function getSessionFromAccessToken(token) {
    const session = await prisma.session.findFirst({
        where: {
            token: token,
        }
    });
    return session;
}
exports.getSessionFromAccessToken = getSessionFromAccessToken;
// Create session using user's id
async function createSession(userId) {
    const expiration = luxon_1.DateTime.now().plus({ weeks: 1 }).toJSDate().toISOString();
    const tokenObject = {
        id: userId,
        salt: (0, uuid_1.v4)() + Math.floor(luxon_1.DateTime.now().toSeconds()),
        exp: expiration,
    };
    const session = await prisma.session.create({ data: {
            userId: userId,
            token: crypto_js_1.AES.encrypt(JSON.stringify(tokenObject), getAppKey()).toString(),
            expiredAt: expiration,
        } });
    return session;
}
exports.createSession = createSession;
// Check password
function checkPassword(from, to) {
    const decrypted = crypto_js_1.AES.decrypt(to, getAppKey()).toString(crypto_js_1.enc.Utf8);
    return from === decrypted;
}
exports.checkPassword = checkPassword;
