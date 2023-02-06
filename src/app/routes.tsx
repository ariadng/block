import React from "react";
import AdminLayout from "./admin/admin.layout";
import LoginPage from "./admin/login/login.page";

const AppRoutes = [
	{ path: "/", element: "Site" },
	
	// Admin
	{ path: "admin", element: <AdminLayout />, children: [
		{ path: "/", element: <LoginPage /> },
	]},
]

export default AppRoutes;