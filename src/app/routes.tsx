import React from "react";
import AdminLayout from "./admin/admin.layout";
import ArticleIndex from "./admin/article/article.index";
import ArticleLayout from "./admin/article/article.layout";
import LoginPage from "./admin/login/login.page";
import UserCreate from "./admin/user/user.create";
import UserIndex from "./admin/user/user.index";
import UserLayout from "./admin/user/user.layout";
import UserCard from "./admin/user/user.view";

const AppRoutes = [
	{ path: "/", element: "Site" },
	
	// Admin
	{ path: "admin", element: <AdminLayout />, children: [
		{ path: "/", element: <LoginPage /> },
		{ path: "page", element: "admin page" },
		{ path: "article", element: <ArticleLayout />, children: [
			{ path: "/", element: <ArticleIndex /> },
		]},
		{ path: "user", element: <UserLayout />, children: [
			{ path: "/", element: <UserIndex /> },
			{ path: "create", element: <UserCreate /> },
			{ path: "/:userId", element: <UserCard /> },
		]},
		{ path: "settings", element: "admin settings" },
		{ path: "account", element: "admin account" },
	]},
]

export default AppRoutes;