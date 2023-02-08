import SecuredAPI from "../../utils/SecuredAPI";
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup } from "@mui/material";
import { useMatch, useNavigate } from "@tanstack/react-location";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../admin.context";
import ReactMarkdown from "react-markdown";
import { DateTime } from "luxon";

export default function ArticleView () {

	const navigate = useNavigate();

	const { params: {articleId} } = useMatch();
	const { language, list: { categories, loadCategories, loadArticles } } = useContext(AdminContext);

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

	// Delete Article
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const deleteArticle = () => {
		setIsDeleteDialogOpen(true);
	}
	const cancelDeleteArticle = () => {
		setIsDeleteDialogOpen(false);
	}
	const submitDeleteArticle = async () => {
		const response = await SecuredAPI.delete("article/" + article.id);
		loadArticles();
		navigate({ to: "/admin/article" });
	}

	// Categories Editor
	const getCategoryIds = () => {
		if (!article) return [];
		return article.categories.map((cat: any) => cat.category.id);
	};
	const [isEditingCategories, setIsEditingCategories] = useState<boolean>(false);
	const [editorCategories, setEditorCategories] = useState<any[]>(getCategoryIds());
	const editCategories = () => {
		setEditorCategories(getCategoryIds());
		setIsEditingCategories(true);
	};
	const discardEditCategories = () => {
		setEditorCategories(getCategoryIds());
		setIsEditingCategories(false);
	};
	const saveEditCategories = async () => {
		const response = await SecuredAPI.put("article/" + article.id, {
			categoryIds: editorCategories.filter(cat => typeof cat === "number"),
		});
		if (response.status === 200) {
			setArticle(response.data);
			setIsEditingCategories(false);
		}
	};
	const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		const value = parseInt(event.target.value);
		if (checked) {
			setEditorCategories([...editorCategories, value]);
		} else {
			setEditorCategories(editorCategories.filter(cat => cat !== value));
		}
	};

	useEffect(() => {
		loadArticle();
		loadCategories();
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
						{ !article.publishedAt && <Button variant="outlined" color="error" onClick={() => {deleteArticle()}}>Delete Draft</Button>}
						{ !article.publishedAt && <Button variant="contained">Publish</Button>}
					</div>
				</div>

				<div className="SidebarPanel">
					<div className="Title">
						<div className="Label">Category</div>
						<div className="TitleActions">
							{ !isEditingCategories && <Button onClick={() => { editCategories() }}>Edit</Button> }
							{ isEditingCategories && <>
								<Button color="error" onClick={() => { discardEditCategories() }}>Discard</Button>
								<Button onClick={() => { saveEditCategories() }}>Save</Button>
							</>}
						</div>
					</div>
					<div className="Content">
						{ !isEditingCategories && <>
							{article.categories.length === 0 && <p>This article doesn't belong to any category.</p>}
							{article.categories.length > 0 && <>
								<p>Article belongs to these categories:</p>
								<ul>
									{article.categories.map((cat: any) => (
										<li key={cat.id}>{cat.category.title}</li>
									))}
								</ul>
							</>}
						</>}
						{ isEditingCategories && <>
							<p>Please select one or more categories.</p>
							<FormGroup className="Options">
								{ categories.map(category => (
									<label className="Option" key={category.id}>
										<Checkbox size="small" value={category.id} checked={editorCategories.includes(category.id)} onChange={handleCategoryChange} />
										<div className="Text">{category.title}</div>
									</label>
								))}
							</FormGroup>
						</>}
					</div>
				</div>

			</div>

			{/* Delete Article Dialog */}
			<Dialog
				open={isDeleteDialogOpen}
				onClose={cancelDeleteArticle}
			>
				<DialogTitle>Are you sure want to delete?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						This action cannot be undone. Please proceed with caution.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={cancelDeleteArticle}>No</Button>
					<Button onClick={submitDeleteArticle} autoFocus>Yes</Button>
				</DialogActions>
			</Dialog>
			
		</div>
	);
}