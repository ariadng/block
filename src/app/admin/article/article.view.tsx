import SecuredAPI from "../../utils/SecuredAPI";
import { Button, CircularProgress } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../admin.context";
import ReactMarkdown from "react-markdown";
import { DateTime } from "luxon";

export default function ArticleView () {

	const { params: {articleId} } = useMatch();
	const { language } = useContext(AdminContext);

	const [article, setArticle] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const loadArticle = async () => {
		setIsLoading(true);
		const response = await SecuredAPI.get("article/" + articleId);
		if (response.status === 200) {
			setArticle(response.data);
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}

	const getTitle = () => {
		const title = typeof article.title === "string" ? JSON.parse(article.title) : article.title;
		return title[language];
	}

	const getContent = () => {
		if (article.content === null) return "";
		const content = typeof article.content === "string" ? JSON.parse(article.content) : article.content;
		return content[language];
	}

	const getLastUpdate = () => {
		return DateTime.fromISO(article.updatedAt).toLocaleString(DateTime.DATETIME_MED)
	}

	useEffect(() => {
		loadArticle();
	}, [articleId])

	if (isLoading) return (
		<div className="ArticleCenter">
			<CircularProgress />
		</div>
	);

	return (
		<div className="ArticleViewer">
			<div className="Article">
				<div className="Title">
					<h1>{getTitle()}</h1>
				</div>
				{article.photo && <div className="FeaturedImage">
					<img src={article.photo} />
				</div>}
				<div className="Content">
					<ReactMarkdown>
						{getContent()}
					</ReactMarkdown>
				</div>
			</div>
			<div className="Sidebar">
				
				<div className="SidebarPanel">
					<div className="Title">
						<div className="Label">Article</div>
						<div className="TitleActions">
							<Button>Edit Content</Button>
						</div>
					</div>
					<div className="Content">
						<div className="ContentRow">
							<div className="Label">Slug</div>
							<div className="Value">{article.slug}</div>
						</div>
						<div className="ContentRow">
							<div className="Label">Status</div>
							<div className="Value">{article.publishedAt ? "Published" : "Draft"}</div>
						</div>
						<div className="ContentRow">
							<div className="Label">Last Update</div>
							<div className="Value">{getLastUpdate()}</div>
						</div>
					</div>
					<div className="Actions">
						{ article.publishedAt && <Button variant="outlined" color="error">Archive</Button>}
						{ article.publishedAt && <Button variant="outlined">Unpublish</Button>}
						{ !article.publishedAt && <Button variant="outlined" color="error">Delete Draft</Button>}
						{ !article.publishedAt && <Button variant="contained">Publish</Button>}
					</div>
				</div>

				<div className="SidebarPanel">
					<div className="Title">
						<div className="Label">Category</div>
						<div className="TitleActions">
							<Button>Edit</Button>
						</div>
					</div>
					<div className="Content">
						<p>The article is listed under these categories:</p>
					</div>
				</div>

			</div>
		</div>
	);
}