import { Outlet, useMatch } from "@tanstack/react-location";
import React from "react";

export default function DashboardLayout () {

	const { data: { user } } = useMatch();

	console.log(user);

	return (
		<div className="DashboardLayout">
			<Outlet />
		</div>
	);
}