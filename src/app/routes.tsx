import React from "react";
import AdminLayout from "./admin/admin.layout";
import LoginPage from "./admin/login/login.page";
import UserLayout from "./admin/user/user.layout";
import Auth from "./utils/Auth";

const AppRoutes = [
	{ path: "/", element: "Site" },
	
	// Admin
	{ path: "admin", element: <AdminLayout />, children: [
		{ path: "/", element: <LoginPage /> },
		{ path: "page", element: "admin page" },
		{ path: "article", element: "admin article" },
		{ path: "user", element: <UserLayout /> },
		{ path: "settings", element: "admin settings" },
		{ path: "account", element: "admin account" },
	]},
]

export default AppRoutes;