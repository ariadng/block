"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class API {
    static async get(path) {
        const url = "/api";
        const response = await fetch(url + "/" + path);
        const json = await response.json();
        return json;
    }
    static async post(path, data) {
        const url = "/api";
        const response = await fetch(url + "/" + path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    }
    static async put(path, data) {
        const url = "/api";
        const response = await fetch(url + "/" + path, {
            method: "PUT",
            headers: {
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
        });
        const json = await response.json();
        return json;
    }
}
exports.default = API;
