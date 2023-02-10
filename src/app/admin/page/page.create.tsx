import SecuredAPI from "../../utils/SecuredAPI";
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Icon } from "@mui/material";
import { useMatch, useNavigate } from "@tanstack/react-location";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "../admin.context";
import TypoEditor from "../../TypoEditor/TypoEditor";
import slugify from "slugify";

export default function PageCreate () {

	const navigate = useNavigate();

	const { language, list: { loadPages } } = useContext(AdminContext);

	const [ page, setPage ] = useState<any>({
		title: {
			en: "",
			id: "",
		},
		content: {
			en: "",
			id: "",
		},
		slug: "",
	});

	const getTitle = () => {
		const title = typeof page.title === "string" ? JSON.parse(page.title) : page.title;
		return title[language];
	}

	const getContent = () => {
		if (page.content === null) return "";
		const content = typeof page.content === "string" ? JSON.parse(page.content) : page.content;
		return content[language];
	}

	useEffect(() => {
		if (page.title) {
			const title = page.title["en"] ? page.title["en"] : page.title["id"];
			setPage({...page, slug: slugify(title)})
		}
	}, [page.title])

	// Editor

	const savePage = async () => {
		const response = await SecuredAPI.post("page", page);
		if (response.status === 200) {
			loadPages();
			navigate({ to: "/admin/page/" + response.data.id });
		}
	};

	const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		const value = event.target.value;
		setPage({...page, title: {...page.title, [language]: value}});
	};

	// [ Initialization ]
	useEffect(() => {
		// ...
	}, []);

	// [ Render UI ]
	return (
		<div className={`PageViewer Edit`}>
			
			<div className="Page">
				
			</div>

			<div className="Sidebar">
				
				<div className="SidebarPanel">
					<div className="Title">
						<div className="Label">Page</div>
						<div className="TitleActions">
							<Button variant="outlined" onClick={() => {savePage()}}>Save</Button>
						</div>
					</div>
					<div className="Content">
						asdf
					</div>
				</div>

			</div>
		</div>
	);
}