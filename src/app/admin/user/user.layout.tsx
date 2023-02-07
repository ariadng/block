import SecuredAPI from "../../utils/SecuredAPI";
import React, { useContext, useEffect, useState } from "react";
import "./user.style.scss";
import { Button, Icon, TextField } from "@mui/material";
import { Link, Outlet, useNavigate } from "@tanstack/react-location";
import { AdminContext } from "../admin.context";

export default function UserLayout () {

	const navigate = useNavigate();

	const { list: { users, loadUsers } } = useContext(AdminContext);
	const [searchText, setSearchText] = useState<string>("");

	const init = async () => {
		await loadUsers();
	}

	useEffect(() => {
		init();
	}, []);

	const getFilteredUsers = () => {
		return users.filter(user => user.name ? user.name.toLowerCase().includes(searchText) : false);
	}

	const handleSearchInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setSearchText(value);
	};

	const goToCreate = () => {
		navigate({ to: "/admin/user/create" });
	};

	return (
		<div className="UserLayout">

			<div className="UserList">
				<div className="Search">
					<TextField value={searchText} onChange={handleSearchInput} label="Search..." variant="outlined" size="small" type="search" fullWidth />
					<Button variant="contained" onClick={() => { goToCreate() }}>
						<Icon>add</Icon>
						<span className="Label">Add New</span>
					</Button>
				</div>
				<div className="Rows">
					{getFilteredUsers().map(user => (
						<Link to={`/admin/user/${user.id}`} className="UserRow" key={user.id} getActiveProps={() => ({ className: 'Active' })}>
							<span className="Photo">
								<span className="Initials">{user.name.split(' ').map((a: string) => a[0]).join('')}</span>
							</span>
							<span className="Details">
								<span className="Name">{user.name}</span>
								<span className="Meta">
									<span className="Email">{user.email}</span>
									<span className="Role">({user.role})</span>
								</span>
							</span>
						</Link>
					))}
				</div>
			</div>

			<div className="UserView">
				<Outlet />
			</div>
		</div>
	)
}