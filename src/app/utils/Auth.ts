import SecuredAPI from "./SecuredAPI";

export default class Auth {

	public static getAccessToken () {
		const accessToken = localStorage.getItem("accessToken");
		return accessToken;
	}

	public static async getUser () {
		const response = await SecuredAPI.get("auth/account");
		if (response.status === 200) return response.data;
		return null;
	}

}