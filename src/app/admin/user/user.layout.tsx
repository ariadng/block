import SecuredAPI from "../../utils/SecuredAPI";
import React, { useEffect, useState } from "react";
import "./user.style.scss";
import { Button, TextField } from "@mui/material";

export default function UserLayout () {

	const [users, setUsers] = useState<any[]>([]);
	const [searchText, setSearchText] = useState<string>("");

	const loadUsers = async () => {
		const response = await SecuredAPI.get("user");
		if (response.status === 200) setUsers(response.data);
	}

	useEffect(() => {
		loadUsers();
	}, []);

	const getFilteredUsers = () => {
		return users.filter(user => user.name.toLowerCase().includes(searchText));
	}

	const handleSearchInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setSearchText(value);
	};

	return (
		<div className="UserLayout">
			<div className="UserList">
				<div className="Search">
					<TextField value={searchText} onChange={handleSearchInput} label="Search..." variant="outlined" size="small" type="search" fullWidth />
					<Button variant="contained">Create</Button>
				</div>
				<div className="Rows">
					{getFilteredUsers().map(user => (
						<div className="UserRow" key={user.id}>
							<div className="Photo">
								<div className="Initials">{user.name.split(' ').map((a: string) => a[0]).join()}</div>
							</div>
							<div className="Details">
								<div className="Name">{user.name}</div>
								<div className="Meta">
									<div className="Email">{user.email}</div>
									<div className="Role">({user.role})</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}