import SecuredAPI from "../../utils/SecuredAPI";
import { Button, CircularProgress } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../admin.context";
import ReactMarkdown from "react-markdown";

export default function ArticleView () {

	const { params: {articleId} } = useMatch();

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
					<h1>{article.title}</h1>
				</div>
				{article.photo && <div className="FeaturedImage">
					<img src={article.photo} />
				</div>}
				<div className="Content">
					<ReactMarkdown>
						{article.content}
					</ReactMarkdown>
				</div>
			</div>
			<div className="Sidebar">sidebar</div>
		</div>
	);
}