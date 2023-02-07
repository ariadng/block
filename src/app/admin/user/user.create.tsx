import SecuredAPI from "../../utils/SecuredAPI";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useMatch, useNavigate, useRouter } from "@tanstack/react-location";
import { Button, CircularProgress, Icon, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { AdminContext } from "../admin.context";

export default function UserCreate () {

	const navigate = useNavigate();
	const { list: { loadUsers } } = useContext(AdminContext);

	const [editData, setEditData] = useState<any>({
		name: "",
		email: "",
		password: "",
		role: "editor"
	});
	const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);

	const submitEdit = async () => {
		setIsLoadingEdit(true)
		const response = await SecuredAPI.post("user/", editData);
		setTimeout(() => {
			setIsLoadingEdit(false);
			if (response.status === 200) {
				loadUsers();
				navigate({ to: "/admin/user/" + response.data.id });
			}
		}, 1000)
	};

	const handleEditChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
		event.preventDefault();
		const id = event.target.id;
		const value = event.target.value;
		setEditData({ ...editData, [id]: value });
	};

	const handleRoleEditSelect: ((event: SelectChangeEvent<any>, child: React.ReactNode) => void) = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setEditData({ ...editData, role: value });
	};

	const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		submitEdit();
	}

	const goToList = () => {
		navigate({ to: "/admin/user" });
	};

	return (
		<div className="UserCard">
			<div className="Profile">
				<div className="UserEdit">
					<div className="Details Create">
						<h4>Add New User</h4>
						<form onSubmit={handleEditSubmit}>
							<TextField id="name" value={editData.name} onChange={handleEditChange} label="Name" variant="outlined" fullWidth />
							<TextField id="email" value={editData.email} onChange={handleEditChange} label="Email Address" variant="outlined" fullWidth />
							<Select value={editData.role} onChange={handleRoleEditSelect} displayEmpty variant="outlined" labelId="role-label" id="role">
								<MenuItem value="admin">Admin</MenuItem>
								<MenuItem value="editor">Editor</MenuItem>
							</Select>
							<div className="FormActions">
								{!isLoadingEdit && <>
									<Button type="button" onClick={() => { goToList() }}>Cancel</Button>
									<Button variant="contained" type="submit">Save</Button>
								</>}
								{isLoadingEdit && <CircularProgress />}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}