import SecuredAPI from "../../utils/SecuredAPI";
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Icon } from "@mui/material";
import { useMatch, useNavigate } from "@tanstack/react-location";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "../admin.context";
import TypoEditor from "../../TypoEditor/TypoEditor";
import slugify from "slugify";
import ComponentEditor from "../../block/editor/ComponentEditor";

export default function ComponentCreate () {

	const navigate = useNavigate();

	const { language, list: { loadComponents } } = useContext(AdminContext);

	const [ component, setComponent ] = useState<any>({
		name: "",
		content: {}
	});

	// Editor
	const save = async () => {
		const response = await SecuredAPI.post("component", component);
		if (response.status === 200) {
			loadComponents();
			navigate({ to: "/admin/component/" + response.data.slug });
		}
	};

	// [ Initialization ]
	useEffect(() => {
		// ...
	}, []);

	// [ Render UI ]
	return (
		<div className="ComponentView">
			<ComponentEditor />
		</div>
	);
}