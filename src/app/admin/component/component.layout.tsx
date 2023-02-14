import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, TextField } from "@mui/material";
import { Link, Outlet, useNavigate } from "@tanstack/react-location";
import { AdminContext } from "../admin.context";
import { DateTime } from "luxon";
import "./component.style.scss";

export default function ComponentLayout () {

	const navigate = useNavigate();

	const { language, list: { components, loadComponents } } = useContext(AdminContext);
	const [ searchText, setSearchText ] = useState<string>("");

	const init = async () => {
		await loadComponents();
	}

	useEffect(() => {
		init();
	}, []);

	const getFiltered = () => {
		return components.filter(component => component.name.toLowerCase().includes(searchText));
	}

	const handleSearchInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setSearchText(value);
	};

	const goToCreate = () => {
		navigate({ to: "/admin/component/create" });
	};

	return (
		<div className="ComponentLayout">

			<div className="ComponentList">
				<div className="Search">
					<TextField value={searchText} onChange={handleSearchInput} label="Search..." variant="outlined" size="small" type="search" fullWidth />
					<Button variant="contained" onClick={() => { goToCreate() }}>
						<Icon>add</Icon>
						<span className="Label">Add New</span>
					</Button>
				</div>
				<div className="Rows">
					{getFiltered().map(component => (
						<Link to={`/admin/component/${component.slug}`} className="ComponentRow" key={component.slug} getActiveProps={() => ({ className: 'Active' })}>
							<span className="Details">
								<span className="Name">{component.name}</span>
							</span>
						</Link>
					))}
				</div>
			</div>

			<div className="ComponentView">
				<Outlet />
			</div>
		</div>
	)
}