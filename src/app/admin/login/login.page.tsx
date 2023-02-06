import React, { useState } from "react";
import { TextField, Button } from '@mui/material';
import "./login.style.scss";
import API from "../../utils/API";

export default function LoginPage () {

	const [ formData, setFormData ] = useState({ email: "", password: "" });
	const [ formErrors, setFormErrors ] = useState<{[key: string]: string | undefined}>({});

	const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
		event.preventDefault();
		const id = event.target.id;
		const value = event.target.value;
		setFormData({ ...formData, [id]: value });
		if (formErrors[id]) setFormErrors({...formErrors, [id]: undefined});
	};

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const response = await API.post("auth/login", formData);
		// Errors
		if (response.status === 401) {
			setFormErrors(response.errors);
		}
	}

	return (
		<div className="LoginPage">
			<div className="LoginBox">
				<div className="Text">
					<h1>Dashboard</h1>
					<p>Please login to manage the website.</p>
				</div>
				<form onSubmit={handleFormSubmit}>
					<TextField value={formData.email} onChange={handleInputChange} error={formErrors["email"] ? true : false} helperText={formErrors["email"] ? formErrors["email"] : ""} id="email" label="Email Address" variant="outlined" margin="normal" fullWidth autoFocus={true} />
					<TextField value={formData.password} onChange={handleInputChange} error={formErrors["password"] ? true : false} helperText={formErrors["password"] ? formErrors["password"] : ""} id="password" label="Password" type="password" variant="outlined" margin="normal" fullWidth />
					<div className="Actions">
						<Button variant="contained" size="large" type="submit">Login</Button>
					</div>
				</form>
			</div>
		</div>
	);
}