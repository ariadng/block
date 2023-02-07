import SecuredAPI from "../../utils/SecuredAPI";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useMatch, useNavigate, useRouter } from "@tanstack/react-location";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { AdminContext } from "../admin.context";

export default function UserCard () {

	const navigate = useNavigate();

	const { params: {userId} } = useMatch();
	const { list: { loadUsers } } = useContext(AdminContext);

	const [user, setUser] = useState<any>(null);
	const [editData, setEditData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
	const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false);
	const [newPassword, setNewPassword] = useState<string>("");

	const adminContext = useContext(AdminContext);

	const loadUser = async () => {
		setIsLoading(true);
		const response = await SecuredAPI.get("user/" + userId);
		if (response.status === 200) {
			setUser(response.data);
			setEditData(user);
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}

	const edit = () => {
		setIsEditing(true);
		setEditData(user);
	}

	const cancelEdit = () => {
		setIsEditing(false);
		setEditData(user);
	}

	const submitEdit = async () => {
		setIsLoadingEdit(true)
		const response = await SecuredAPI.put("user/" + user.id, editData);
		setTimeout(() => {
			setIsLoadingEdit(false);
			if (response.status === 200) {
				setIsEditing(false);
				loadUsers();
				loadUser();
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

	const deleteUser = () => {
		setIsDeleteDialogOpen(true);
	}

	const cancelDeleteUser = () => {
		setIsDeleteDialogOpen(false);
	}

	const submitDeleteUser = async () => {
		const response = await SecuredAPI.delete("user/" + user.id);
		loadUsers();
		navigate({ to: "/admin/user" });
	}

	const changePassword = () => {
		setIsPasswordDialogOpen(true);
		setNewPassword("");
	}

	const cancelPassword = () => {
		setIsPasswordDialogOpen(false);
		setNewPassword("");
	}

	const submitPassword = async () => {
		const response = await SecuredAPI.put("user/" + user.id, {
			password: newPassword,
		});
		loadUsers();
		setIsPasswordDialogOpen(false);
		setNewPassword("");
	}

	useEffect(() => {
		loadUser();
	}, []);

	if (isLoading) return (
		<CircularProgress />
	);

	else if (user !== null) return (
		<div className="UserCard">
			<div className="Profile">
				<div className="Photo">
					<div className="Initials">{user.name.split(' ').map((a: string) => a[0]).join('')}</div>
				</div>
				{!isEditing && <>
					<div className="Details">
						<div className="Name">{user.name}</div>
						<div className="Meta">
							<div className="MetaItem">
								<Icon>email</Icon>
								<div className="Label">{user.email}</div>
							</div>
							<div className="MetaItem">
								<Icon>assignment_ind</Icon>
								<div className="Label">{user.role}</div>
							</div>
						</div>
					</div>
					<div className="Actions">
						<Button onClick={() => { edit() }}>
							<Icon>edit</Icon>
							<div className="Label">Edit Info</div>
						</Button>
						<Button onClick={() => { changePassword() }}>
							<Icon>password</Icon>
							<div className="Label">Change Password</div>
						</Button>
						<Button color="error" onClick={() => { deleteUser() }}>
							<Icon>delete</Icon>
							<div className="Label">Delete</div>
						</Button>
					</div>
				</>}

				{isEditing && <>
					<div className="UserEdit">
						<div className="Details">
							<form onSubmit={handleEditSubmit}>
								<TextField id="name" value={editData.name} onChange={handleEditChange} label="Name" variant="outlined" fullWidth />
								<TextField id="email" value={editData.email} onChange={handleEditChange} label="Email Address" variant="outlined" fullWidth />
								<Select disabled={editData.id === adminContext?.user?.id} value={editData.role} onChange={handleRoleEditSelect} displayEmpty variant="outlined" labelId="role-label" id="role">
									<MenuItem value="admin">Admin</MenuItem>
									<MenuItem value="editor">Editor</MenuItem>
								</Select>
								<div className="FormActions">
									{!isLoadingEdit && <>
										<Button type="button" onClick={() => {cancelEdit()}}>Cancel</Button>
										<Button variant="contained" type="submit">Save</Button>
									</>}
									{isLoadingEdit && <CircularProgress />}
								</div>
							</form>
						</div>
					</div>
				</>}

			</div>

			<Dialog
				open={isDeleteDialogOpen}
				onClose={cancelDeleteUser}
			>
				<DialogTitle>Are you sure want to delete?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						This action cannot be undone. Please proceed with caution.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={cancelDeleteUser}>No</Button>
					<Button onClick={submitDeleteUser} autoFocus>Yes</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={isPasswordDialogOpen} onClose={cancelPassword}>
				<DialogTitle>Change Password</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter new password for this user.
					</DialogContentText>
					<TextField
						autoFocus
						margin="normal"
						id="password"
						type="password"
						fullWidth
						variant="outlined"
						value={newPassword}
						onChange={(event) => { event.preventDefault(); setNewPassword(event.target.value); }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={cancelPassword}>Cancel</Button>
					<Button onClick={submitPassword} variant="contained">Submit</Button>
				</DialogActions>
			</Dialog>

		</div>
	);

	return (
		<p>Cannot load user data.</p>
	);
}