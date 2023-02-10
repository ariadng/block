"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("./Auth"));
class SecuredAPI {
    static async get(path) {
        const url = "/api";
        const response = await fetch(url + "/" + path, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + Auth_1.default.getAccessToken(),
            }
        });
        const json = await response.json();
        return json;
    }
    static async post(path, data) {
        const url = "/api";
        let headers = {
            'Authorization': 'Bearer ' + Auth_1.default.getAccessToken(),
            'Accept': 'application/json',
        };
        if (!(data instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url + "/" + path, {
            method: "POST",
            headers: { ...headers },
            body: data instanceof FormData ? data : JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    }
    static async put(path, data) {
        const url = "/api";
        const response = await fetch(url + "/" + path, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + Auth_1.default.getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    }
    static async delete(path) {
        const url = "/api";
        const response = await fetch(url + "/" + path, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + Auth_1.default.getAccessToken(),
            }
        });
        const json = await response.json();
        return json;
    }
}
exports.default = SecuredAPI;
