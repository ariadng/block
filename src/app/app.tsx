import React from "react";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import AppRoutes from "./routes";

const location = new ReactLocation();

export default function App () {
	return (
		<Router location={location} routes={AppRoutes}>
			<Outlet />
		</Router>
	);
}