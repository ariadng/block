import React from "react";
import { Outlet } from "@tanstack/react-location";
import "./admin.style.scss";

export default function AdminLayout () {

	return (
		<div className="AdminLayout">
			<Outlet />
		</div>
	);

}