import React from "react";
import { Outlet } from "@tanstack/react-location";
import "./style.scss";

interface Props {
	children?: React.ReactNode,
}

export default function SiteLayout ({
	children,
}: Props) {
	return (
		<>{children}</>
	);
}