import React from "react";
import AdminLayout from "./admin/admin.layout";
import LoginPage from "./admin/login/login.page";
import Auth from "./utils/Auth";

const AppRoutes = [
	{ path: "/", element: "Site" },
	
	// Admin
	{ path: "admin", element: <AdminLayout />, loader: async () => ({ user: await Auth.getUser() }), children: [
		{ path: "/", element: <LoginPage /> },
		{ path: "page", element: "admin page" },
		{ path: "article", element: "admin article" },
		{ path: "user", element: "admin user" },
		{ path: "settings", element: "admin settings" },
		{ path: "account", element: "admin account" },
	]},
]

export default AppRoutes;