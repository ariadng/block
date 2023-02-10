"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecuredAPI_1 = __importDefault(require("../../utils/SecuredAPI"));
const material_1 = require("@mui/material");
const react_location_1 = require("@tanstack/react-location");
const react_1 = __importStar(require("react"));
const admin_context_1 = require("../admin.context");
const luxon_1 = require("luxon");
const TypoEditor_1 = __importDefault(require("../../TypoEditor/TypoEditor"));
const TypoUtils_1 = __importDefault(require("../../TypoEditor/TypoUtils"));
function ArticleView() {
    const navigate = (0, react_location_1.useNavigate)();
    const { params: { articleId } } = (0, react_location_1.useMatch)();
    const { language, list: { categories, loadCategories, loadArticles } } = (0, react_1.useContext)(admin_context_1.AdminContext);
    const [article, setArticle] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const loadArticle = async () => {
        setIsLoading(true);
        const response = await SecuredAPI_1.default.get("article/" + articleId);
        if (response.status === 200) {
            setArticle(response.data);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    const getTitle = () => {
        const title = typeof article.title === "string" ? JSON.parse(article.title) : article.title;
        return title[language];
    };
    const getContent = () => {
        if (article.content === null)
            return "";
        const content = typeof article.content === "string" ? JSON.parse(article.content) : article.content;
        return content[language];
    };
    const getLastUpdate = () => {
        return luxon_1.DateTime.fromISO(article.updatedAt).toLocaleString(luxon_1.DateTime.DATETIME_MED);
    };
    // [ Delete Article ]
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = (0, react_1.useState)(false);
    const deleteArticle = () => {
        setIsDeleteDialogOpen(true);
    };
    const cancelDeleteArticle = () => {
        setIsDeleteDialogOpen(false);
    };
    const submitDeleteArticle = async () => {
        const response = await SecuredAPI_1.default.delete("article/" + article.id);
        loadArticles();
        navigate({ to: "/admin/article" });
    };
    // Publish Article
    const publishArticle = async () => {
        const response = await SecuredAPI_1.default.put("article/" + article.id + '/publish', {});
        if (response.status === 200) {
            loadArticles();
            setArticle(response.data);
        }
    };
    const unpublishArticle = async () => {
        const response = await SecuredAPI_1.default.put("article/" + article.id + '/unpublish', {});
        if (response.status === 200) {
            loadArticles();
            setArticle(response.data);
        }
    };
    // [ Categories Editor ]
    const getCategoryIds = () => {
        if (!article)
            return [];
        return article.categories.map((cat) => cat.category.id);
    };
    const [isEditingCategories, setIsEditingCategories] = (0, react_1.useState)(false);
    const [editorCategories, setEditorCategories] = (0, react_1.useState)(getCategoryIds());
    const editCategories = () => {
        setEditorCategories(getCategoryIds());
        setIsEditingCategories(true);
    };
    const discardEditCategories = () => {
        setEditorCategories(getCategoryIds());
        setIsEditingCategories(false);
    };
    const saveEditCategories = async () => {
        const response = await SecuredAPI_1.default.put("article/" + article.id, {
            categoryIds: editorCategories.filter(cat => typeof cat === "number"),
        });
        if (response.status === 200) {
            setArticle(response.data);
            setIsEditingCategories(false);
        }
    };
    const handleCategoryChange = (event, checked) => {
        const value = parseInt(event.target.value);
        if (checked) {
            setEditorCategories([...editorCategories, value]);
        }
        else {
            setEditorCategories(editorCategories.filter(cat => cat !== value));
        }
    };
    // [ Article Editor ]
    const [articleEdit, setArticleEdit] = (0, react_1.useState)(null);
    const [isEditingArticle, setIsEditingArticle] = (0, react_1.useState)(false);
    const featuredImageFileSelector = (0, react_1.useRef)(null);
    const [isUploadingFeaturedImage, setIsUploadingFeaturedImage] = (0, react_1.useState)(false);
    const editArticle = () => {
        setArticleEdit({ ...article });
    };
    const discardEditArticle = () => {
        setIsEditingArticle(false);
        setArticleEdit(null);
    };
    const saveEditArticle = async () => {
        const response = await SecuredAPI_1.default.put("article/" + article.id, articleEdit);
        if (response.status === 200) {
            loadArticles();
            setArticle(response.data);
            setIsEditingArticle(false);
            setArticleEdit(null);
        }
    };
    const getEditTitle = () => {
        const title = typeof articleEdit.title === "string" ? JSON.parse(articleEdit.title) : articleEdit.title;
        return title[language];
    };
    const handleEditTitleChange = (event) => {
        const value = event.target.value;
        setArticleEdit({ ...articleEdit, title: { ...articleEdit.title, [language]: value } });
    };
    const getEditContent = () => {
        const content = typeof articleEdit.content === "string" ? JSON.parse(articleEdit.content) : articleEdit.content;
        return content[language];
    };
    const handleEditContentChange = (value) => {
        setArticleEdit({ ...articleEdit, content: { ...articleEdit.content, [language]: value } });
    };
    const openFeaturedImageFileSelector = () => {
        if (featuredImageFileSelector.current) {
            featuredImageFileSelector.current.click();
        }
    };
    const removeFeaturedImage = () => {
        setArticleEdit({ ...articleEdit, photo: null });
    };
    const handleFeaturedImageFileSelector = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setIsUploadingFeaturedImage(true);
            const file = event.target.files[0];
            let formData = new FormData();
            formData.set("file", file);
            const response = await SecuredAPI_1.default.post("file", formData);
            if (response.status === 200) {
                setTimeout(() => {
                    setIsUploadingFeaturedImage(false);
                    setArticleEdit({ ...articleEdit, photo: response.data.path });
                }, 1000);
            }
            else {
                console.error(response);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        setIsEditingArticle(articleEdit !== null);
    }, [articleEdit]);
    // [ Initialization ]
    (0, react_1.useEffect)(() => {
        loadArticle();
        loadCategories();
    }, [articleId]);
    if (isLoading)
        return (react_1.default.createElement("div", { className: "ArticleCenter" },
            react_1.default.createElement(material_1.CircularProgress, null)));
    // [ Render UI ]
    return (react_1.default.createElement("div", { className: `ArticleViewer ${isEditingArticle ? 'Edit' : ''}` },
        react_1.default.createElement("div", { className: "Article" },
            react_1.default.createElement("div", { className: "Title" },
                !isEditingArticle && react_1.default.createElement("h1", null, getTitle()),
                isEditingArticle && react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "TitleEditor" },
                        react_1.default.createElement("label", { className: "EditLabel" },
                            "Title (",
                            language,
                            ")"),
                        react_1.default.createElement("textarea", { value: getEditTitle(), onChange: handleEditTitleChange, placeholder: "Enter title..." })))),
            react_1.default.createElement("div", { className: "FeaturedImage" },
                isEditingArticle && react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("label", { className: "EditLabel" }, "Featured Image"),
                    react_1.default.createElement("div", { className: "FeaturedImageEditor" },
                        react_1.default.createElement("div", { className: "Overlay" },
                            !articleEdit.photo && !isUploadingFeaturedImage && react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(material_1.Icon, null, "image"),
                                react_1.default.createElement(material_1.Button, { onClick: () => { openFeaturedImageFileSelector(); } }, "Upload Image")),
                            articleEdit.photo && !isUploadingFeaturedImage && react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(material_1.Button, { className: "ChangeButton", variant: "contained", onClick: () => { openFeaturedImageFileSelector(); } }, "Change Image"),
                                react_1.default.createElement(material_1.Button, { className: "ChangeButton", variant: "contained", color: "error", onClick: () => { removeFeaturedImage(); } }, "Remove")),
                            !articleEdit.photo && isUploadingFeaturedImage && react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(material_1.CircularProgress, null))),
                        articleEdit.photo && react_1.default.createElement("img", { src: articleEdit.photo }),
                        react_1.default.createElement("input", { ref: featuredImageFileSelector, onChange: handleFeaturedImageFileSelector, type: "file" }))),
                !isEditingArticle && react_1.default.createElement("img", { src: article.photo })),
            react_1.default.createElement("div", { className: "Content" },
                !isEditingArticle && react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: TypoUtils_1.default.markdownToHTML(getContent()) } }),
                isEditingArticle && react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("label", { className: "EditLabel" },
                        "Content (",
                        language,
                        ")"),
                    react_1.default.createElement(TypoEditor_1.default, { value: getEditContent(), onUpdate: handleEditContentChange, options: {
                            input: "html",
                            showToolbar: false,
                            showOtherInput: false,
                            showPreview: false,
                            showEditorToolbar: false,
                        } })))),
        react_1.default.createElement("div", { className: "Sidebar" },
            react_1.default.createElement("div", { className: "SidebarPanel" },
                react_1.default.createElement("div", { className: "Title" },
                    react_1.default.createElement("div", { className: "Label" }, "Article"),
                    react_1.default.createElement("div", { className: "TitleActions" },
                        !isEditingArticle && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(material_1.Button, { onClick: () => { editArticle(); } }, "Edit Content")),
                        isEditingArticle && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(material_1.Button, { color: "error", onClick: () => { discardEditArticle(); } }, "Discard"),
                            react_1.default.createElement(material_1.Button, { onClick: () => { saveEditArticle(); } }, "Save")))),
                react_1.default.createElement("div", { className: "Content" },
                    react_1.default.createElement("div", { className: "ContentRow" },
                        react_1.default.createElement("div", { className: "Label" }, "Slug"),
                        react_1.default.createElement("div", { className: "Value" }, article.slug)),
                    react_1.default.createElement("div", { className: "ContentRow" },
                        react_1.default.createElement("div", { className: "Label" }, "Status"),
                        react_1.default.createElement("div", { className: "Value" }, article.publishedAt ? "Published" : "Draft")),
                    react_1.default.createElement("div", { className: "ContentRow" },
                        react_1.default.createElement("div", { className: "Label" }, "Last Update"),
                        react_1.default.createElement("div", { className: "Value" }, getLastUpdate()))),
                react_1.default.createElement("div", { className: "Actions" },
                    article.publishedAt && react_1.default.createElement(material_1.Button, { variant: "outlined", onClick: () => { unpublishArticle(); }, disabled: isEditingArticle }, "Unpublish"),
                    !article.publishedAt && react_1.default.createElement(material_1.Button, { variant: "outlined", color: "error", onClick: () => { deleteArticle(); }, disabled: isEditingArticle }, "Delete Draft"),
                    !article.publishedAt && react_1.default.createElement(material_1.Button, { variant: "contained", onClick: () => { publishArticle(); }, disabled: isEditingArticle }, "Publish"))),
            react_1.default.createElement("div", { className: "SidebarPanel" },
                react_1.default.createElement("div", { className: "Title" },
                    react_1.default.createElement("div", { className: "Label" }, "Category"),
                    react_1.default.createElement("div", { className: "TitleActions" },
                        !isEditingCategories && react_1.default.createElement(material_1.Button, { onClick: () => { editCategories(); } }, "Edit"),
                        isEditingCategories && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(material_1.Button, { color: "error", onClick: () => { discardEditCategories(); } }, "Discard"),
                            react_1.default.createElement(material_1.Button, { onClick: () => { saveEditCategories(); } }, "Save")))),
                react_1.default.createElement("div", { className: "Content" },
                    !isEditingCategories && react_1.default.createElement(react_1.default.Fragment, null,
                        article.categories.length === 0 && react_1.default.createElement("p", null, "This article doesn't belong to any category."),
                        article.categories.length > 0 && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("p", null, "Article belongs to these categories:"),
                            react_1.default.createElement("ul", null, article.categories.map((cat) => (react_1.default.createElement("li", { key: cat.id }, cat.category.title)))))),
                    isEditingCategories && react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("p", null, "Please select one or more categories."),
                        react_1.default.createElement(material_1.FormGroup, { className: "Options" }, categories.map(category => (react_1.default.createElement("label", { className: "Option", key: category.id },
                            react_1.default.createElement(material_1.Checkbox, { size: "small", value: category.id, checked: editorCategories.includes(category.id), onChange: handleCategoryChange }),
                            react_1.default.createElement("div", { className: "Text" }, category.title))))))))),
        react_1.default.createElement(material_1.Dialog, { open: isDeleteDialogOpen, onClose: cancelDeleteArticle },
            react_1.default.createElement(material_1.DialogTitle, null, "Are you sure want to delete?"),
            react_1.default.createElement(material_1.DialogContent, null,
                react_1.default.createElement(material_1.DialogContentText, null, "This action cannot be undone. Please proceed with caution.")),
            react_1.default.createElement(material_1.DialogActions, null,
                react_1.default.createElement(material_1.Button, { onClick: cancelDeleteArticle }, "No"),
                react_1.default.createElement(material_1.Button, { onClick: submitDeleteArticle, autoFocus: true }, "Yes")))));
}
exports.default = ArticleView;
