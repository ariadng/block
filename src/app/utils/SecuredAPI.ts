import Auth from "./Auth";

export default class SecuredAPI {

	public static async get (path: string) {
		const url = "/api";
		const response = await fetch(url + "/" + path, {
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + Auth.getAccessToken(),
			}
		});
		const json = await response.json();
		return json;
	}

	public static async post (path: string, data: {[key: string]: any}) {
		const url = "/api";
		const response = await fetch(url + "/" + path, {
			method: "POST",
			headers: {
				'Authorization': 'Bearer ' + Auth.getAccessToken(),
				'Accept': 'application/json',
      			'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		});
		const json = await response.json();
		return json;
	}

	public static async put (path: string, data: {[key: string]: any}) {
		const url = "/api";
		const response = await fetch(url + "/" + path, {
			method: "PUT",
			headers: {
				'Authorization': 'Bearer ' + Auth.getAccessToken(),
				'Accept': 'application/json',
      			'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		});
		const json = await response.json();
		return json;
	}

	public static async delete (path: string) {
		const url = "/api";
		const response = await fetch(url + "/" + path, {
			method: "DELETE",
			headers: {
				'Authorization': 'Bearer ' + Auth.getAccessToken(),
			}
		});
		const json = await response.json();
		return json;
	}

}