import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, TextField } from "@mui/material";
import { Link, Outlet, useNavigate } from "@tanstack/react-location";
import { AdminContext } from "../admin.context";
import { DateTime } from "luxon";
import "./page.style.scss";

export default function PageLayout () {

	const navigate = useNavigate();

	const { language, list: { pages, loadPages } } = useContext(AdminContext);
	const [ searchText, setSearchText ] = useState<string>("");

	const init = async () => {
		await loadPages();
	}

	useEffect(() => {
		init();
	}, []);

	const getFilteredPages = () => {
		return pages.filter(page => getPageTitle(page).toLowerCase().includes(searchText));
	}

	const handleSearchInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setSearchText(value);
	};

	const goToCreate = () => {
		navigate({ to: "/admin/page/create" });
	};

	const getPageTitle = (page: any): string => {
		return page.title[language] ? page.title[language] : "";
	}

	return (
		<div className="PageLayout">

			<div className="PageList">
				<div className="Search">
					<TextField value={searchText} onChange={handleSearchInput} label="Search..." variant="outlined" size="small" type="search" fullWidth />
					<Button variant="contained" onClick={() => { goToCreate() }}>
						<Icon>add</Icon>
						<span className="Label">Add New</span>
					</Button>
				</div>
				<div className="Rows">
					{getFilteredPages().map(page => (
						<Link to={`/admin/page/${page.id}`} className="PageRow" key={page.id} getActiveProps={() => ({ className: 'Active' })}>
							<span className="Photo">
								<span className="Thumbnail">
									{page.photo && <img src={page.photo} />}
								</span>
							</span>
							<span className="Details">
								<span className="Name">{getPageTitle(page)}</span>
								<span className="Meta">
									<span className="MetaItem">
										<Icon>schedule</Icon>
										<span className="label">{DateTime.fromISO(page.updatedAt).toLocaleString(DateTime.DATETIME_MED)}</span>
									</span>
									{page.publishedAt && <span className="MetaItem">
										<Icon>public</Icon>
										<span className="label">Published</span>
									</span>}
									{!page.publishedAt && <span className="MetaItem">
										<Icon>edit_note</Icon>
										<span className="label">Draft</span>
									</span>}
								</span>
							</span>
						</Link>
					))}
				</div>
			</div>

			<div className="PageView">
				<Outlet />
			</div>
		</div>
	)
}