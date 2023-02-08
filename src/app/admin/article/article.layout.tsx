import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, TextField } from "@mui/material";
import { Link, Outlet, useNavigate } from "@tanstack/react-location";
import { AdminContext } from "../admin.context";
import { DateTime } from "luxon";
import "./article.style.scss";

export default function ArticleLayout () {

	const navigate = useNavigate();

	const { list: { articles, loadArticles } } = useContext(AdminContext);
	const [searchText, setSearchText] = useState<string>("");

	const init = async () => {
		await loadArticles();
	}

	useEffect(() => {
		init();
	}, []);

	const getFilteredArticles = () => {
		return articles.filter(article => article.title.toLowerCase().includes(searchText));
	}

	const handleSearchInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setSearchText(value);
	};

	const goToCreate = () => {
		navigate({ to: "/admin/article/create" });
	};

	return (
		<div className="ArticleLayout">

			<div className="ArticleList">
				<div className="Search">
					<TextField value={searchText} onChange={handleSearchInput} label="Search..." variant="outlined" size="small" type="search" fullWidth />
					<Button variant="contained" onClick={() => { goToCreate() }}>
						<Icon>add</Icon>
						<span className="Label">Add New</span>
					</Button>
				</div>
				<div className="Rows">
					{getFilteredArticles().map(article => (
						<Link to={`/admin/article/${article.id}`} className="ArticleRow" key={article.id} getActiveProps={() => ({ className: 'Active' })}>
							<span className="Photo">
								<span className="Thumbnail">
									{article.photo && <img src={article.photo} />}
								</span>
							</span>
							<span className="Details">
								<span className="Name">{article.title}</span>
								<span className="Meta">
									<span className="MetaItem">
										<Icon>schedule</Icon>
										<span className="label">{DateTime.fromISO(article.updatedAt).toLocaleString(DateTime.DATETIME_MED)}</span>
									</span>
									{article.publishedAt && <span className="MetaItem">
										<Icon>public</Icon>
										<span className="label">Published</span>
									</span>}
									{!article.publishedAt && <span className="MetaItem">
										<Icon>edit_note</Icon>
										<span className="label">Draft</span>
									</span>}
								</span>
							</span>
						</Link>
					))}
				</div>
			</div>

			<div className="ArticleView">
				<Outlet />
			</div>
		</div>
	)
}