import React from "react";
import AdminPage from "./admin/page";

const AppRoutes = [
	{ path: "/", element: "Site" },
	{ path: "/admin", element: <AdminPage /> },
]

export default AppRoutes;