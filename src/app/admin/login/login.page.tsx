import React, { useState } from "react";
import { TextField, Button } from '@mui/material';
import "./login.style.scss";

export default function LoginPage () {

	const [ formData, setFormData ] = useState({ email: "", password: "" });

	const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
		event.preventDefault();
		const id = event.target.id;
		const value = event.target.value;
		setFormData({ ...formData, [id]: value });
	};

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		console.log(formData);
	}

	return (
		<div className="LoginPage">
			<div className="LoginBox">
				<div className="Text">
					<h1>Dashboard</h1>
					<p>Please login to manage the website.</p>
				</div>
				<form onSubmit={handleFormSubmit}>
					<TextField value={formData.email} onChange={handleInputChange} id="email" label="Email Address" variant="outlined" margin="normal" fullWidth autoFocus={true} />
					<TextField value={formData.password} onChange={handleInputChange} id="password" label="Password" type="password" variant="outlined" margin="normal" fullWidth />
					<div className="Actions">
						<Button variant="contained" size="large" type="submit">Login</Button>
					</div>
				</form>
			</div>
		</div>
	);
}