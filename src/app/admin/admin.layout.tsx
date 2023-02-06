import React, { useEffect } from "react";
import { Link, Outlet, useMatch, useNavigate } from "@tanstack/react-location";
import { Button, Icon } from '@mui/material';
import "./admin.style.scss";
import SecuredAPI from "../utils/SecuredAPI";

export default function AdminLayout () {

	const navigate = useNavigate();
	const { data: { user } } = useMatch();

	useEffect(() => {
		if (user !== null) navigate({ to: "/admin/page" });
		else navigate({ to: "/admin" })
	}, [user]);

	if (user === null ) return (
		<div className="AdminLayout">
			<Outlet />
		</div>
	);

	const logout = async () => {
		await SecuredAPI.get("auth/logout");
		localStorage.clear();
		navigate({ to: "/admin" });
	};
	
	return (
		<div className="AdminLayout">
			<div className="AppBar">
				<div className="Brand">
					<div className="Title">Transisi</div>
				</div>
				<div className="Menu">
					<Link to="/admin/page" className="MenuItem" getActiveProps={() => ({ className: 'Active' })}>
						<Icon>auto_stories</Icon>
						<span className="Label">Pages</span>
					</Link>
					<Link to="/admin/article" className="MenuItem" getActiveProps={() => ({ className: 'Active' })}>
						<Icon>newspaper</Icon>
						<span className="Label">Articles</span>
					</Link>
					<Link to="/admin/user" className="MenuItem" getActiveProps={() => ({ className: 'Active' })}>
						<Icon>people</Icon>
						<span className="Label">Users</span>
					</Link>
					<Link to="/admin/settings" className="MenuItem" getActiveProps={() => ({ className: 'Active' })}>
						<Icon>settings</Icon>
						<span className="Label">Settings</span>
					</Link>
				</div>
				<div className="Actions">
					<Link to="/admin/account" className="MenuItem" getActiveProps={() => ({ className: 'Active' })}>
						<Icon>account_circle</Icon>
						<span className="Label">User Name</span>
					</Link>
					<Button variant="text" onClick={() => { logout() }}>Logout</Button>
				</div>
			</div>
			<div className="AppContent">
				<Outlet />
			</div>
		</div>
	)

}