"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecuredAPI_1 = __importDefault(require("./SecuredAPI"));
class Auth {
    static getAccessToken() {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken;
    }
    static async getUser() {
        const response = await SecuredAPI_1.default.get("auth/account");
        if (response.status === 200)
            return response.data;
        return null;
    }
}
exports.default = Auth;
