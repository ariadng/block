import SecuredAPI from "../../utils/SecuredAPI";
import React, { useEffect, useState } from "react";
import { useMatch, useRouter } from "@tanstack/react-location";
import { Button, CircularProgress, Icon } from "@mui/material";

export default function UserCard () {

	const { params: {userId} } = useMatch();

	const [user, setUser] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const loadUser = async () => {
		setIsLoading(true);
		const response = await SecuredAPI.get("user/" + userId);
		if (response.status === 200) setUser(response.data);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
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
					<div className="Initials">{user.name.split(' ').map((a: string) => a[0]).join()}</div>
				</div>
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
					<Button>
						<Icon>edit</Icon>
						<div className="Label">Edit Info</div>
					</Button>
					<Button>
						<Icon>password</Icon>
						<div className="Label">Change Password</div>
					</Button>
					<Button color="error">
						<Icon>delete</Icon>
						<div className="Label">Delete</div>
					</Button>
				</div>
			</div>
		</div>
	);

	return (
		<p>Cannot load user data.</p>
	);
}