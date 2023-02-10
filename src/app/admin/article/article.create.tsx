import SecuredAPI from "../../utils/SecuredAPI";
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Icon } from "@mui/material";
import { useMatch, useNavigate } from "@tanstack/react-location";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "../admin.context";
import TypoEditor from "../../TypoEditor/TypoEditor";
import slugify from "slugify";

export default function ArticleCreate () {

	const navigate = useNavigate();

	const { params: {articleId} } = useMatch();
	const { language, list: { categories, loadCategories, loadArticles } } = useContext(AdminContext);

	const [ article, setArticle ] = useState<any>({
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
		const title = typeof article.title === "string" ? JSON.parse(article.title) : article.title;
		return title[language];
	}

	const getContent = () => {
		if (article.content === null) return "";
		const content = typeof article.content === "string" ? JSON.parse(article.content) : article.content;
		return content[language];
	}

	// [ Categories Editor ]
	const getCategoryIds = () => {
		if (!article || !article.categories) return [];
		return article.categories.map((cat: any) => cat.category.id);
	};

	const [editorCategories, setEditorCategories] = useState<any[]>(getCategoryIds());
	
	const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		const value = parseInt(event.target.value);
		if (checked) {
			setEditorCategories([...editorCategories, value]);
		} else {
			setEditorCategories(editorCategories.filter(cat => cat !== value));
		}
	};

	// [ Article Editor ]

	const featuredImageFileSelector = useRef<HTMLInputElement>(null);
	const [ isUploadingFeaturedImage, setIsUploadingFeaturedImage ] = useState<boolean>(false);

	const saveEditArticle = async () => {
		const response = await SecuredAPI.post("article", {...article, categoryIds: editorCategories.filter(cat => typeof cat === "number")});
		if (response.status === 200) {
			loadArticles();
			navigate({ to: "/admin/article/" + response.data.id });
		}
	};

	const handleEditTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		const value = event.target.value;
		setArticle({...article, title: {...article.title, [language]: value}});
	};

	const handleEditContentChange = (value: string) => {
		setArticle({...article, content: {...article.content, [language]: value}});
	};

	const openFeaturedImageFileSelector = () => {
		if (featuredImageFileSelector.current) {
			featuredImageFileSelector.current.click();
		}
	};
	const removeFeaturedImage = () => {
		setArticle({...article, photo: null });
	}
	const handleFeaturedImageFileSelector: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
		if (event.target.files && event.target.files.length > 0) {
			setIsUploadingFeaturedImage(true);
			const file = event.target.files[0];
			let formData = new FormData();
			formData.set("file", file);
			const response = await SecuredAPI.post("file", formData);
			if (response.status === 200) {
				setTimeout(() => {
					setIsUploadingFeaturedImage(false);
					setArticle({...article, photo: response.data.path });
				}, 1000);
			} else {
				console.error(response);
			}
		}
	};

	useEffect(() => {
		if (article.title) {
			const title = article.title["en"] ? article.title["en"] : article.title["id"];
			setArticle({...article, slug: slugify(title)})
		}
	}, [article.title])

	// [ Initialization ]
	useEffect(() => {
		loadCategories();
	}, [])

	// [ Render UI ]
	return (
		<div className={`ArticleViewer Edit`}>
			<div className="Article">
				<div className="Title">
					<div className="TitleEditor">
						<label className="EditLabel">Title ({language})</label>
						<textarea value={getTitle()} onChange={handleEditTitleChange} placeholder="Enter title..." />
					</div>
				</div>

				{<div className="FeaturedImage">
					<label className="EditLabel">Featured Image</label>
					<div className="FeaturedImageEditor">
						<div className="Overlay">
							{!article.photo && !isUploadingFeaturedImage && <>
								<Icon>image</Icon>
								<Button onClick={() => {openFeaturedImageFileSelector()}}>Upload Image</Button>
							</>}
							{article.photo && !isUploadingFeaturedImage && <>
								<Button className="ChangeButton" variant="contained" onClick={() => {openFeaturedImageFileSelector()}}>Change Image</Button>
								<Button className="ChangeButton" variant="contained" color="error" onClick={() => {removeFeaturedImage()}}>Remove</Button>
							</>}
							{!article.photo && isUploadingFeaturedImage && <>
								<CircularProgress />
							</>}
						</div>
						{ article.photo && <img src={article.photo} /> }
						<input ref={featuredImageFileSelector} onChange={handleFeaturedImageFileSelector} type="file" />
					</div>
				</div>}

				<div className="Content">
					<label className="EditLabel">Content ({language})</label>
					<TypoEditor value={getContent()} onUpdate={handleEditContentChange} options={{
						input: "html",
						showToolbar: false,
						showOtherInput: false,
						showPreview: false,
						showEditorToolbar: false,
					}} />
				</div>
			</div>
			<div className="Sidebar">
				
				<div className="SidebarPanel">
					<div className="Title">
						<div className="Label">Article</div>
						<div className="TitleActions">
							<Button variant="outlined" onClick={() => {saveEditArticle()}}>Save</Button>
						</div>
					</div>
					<div className="Content">
						<div className="ContentRow">
							<div className="Label">Slug</div>
							<div className="Value">{article.slug}</div>
						</div>
					</div>
				</div>

				<div className="SidebarPanel">
					<div className="Title">
						<div className="Label">Category</div>
					</div>
					<div className="Content">
						<p>Please select one or more categories.</p>
						<FormGroup className="Options">
							{ categories && categories.map(category => (
								<label className="Option" key={category.id}>
									<Checkbox size="small" value={category.id} checked={editorCategories.includes(category.id)} onChange={handleCategoryChange} />
									<div className="Text">{category.title}</div>
								</label>
							))}
						</FormGroup>
					</div>
				</div>

			</div>
		</div>
	);
}