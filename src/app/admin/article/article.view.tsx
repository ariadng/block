import SecuredAPI from "../../utils/SecuredAPI";
import { Button, CircularProgress } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../admin.context";
import ReactMarkdown from "react-markdown";

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
					<div className="Title">Article</div>
					<div className="Content">

					</div>
				</div>
			</div>
		</div>
	);
}