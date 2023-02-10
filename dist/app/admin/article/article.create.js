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
const TypoEditor_1 = __importDefault(require("../../TypoEditor/TypoEditor"));
const slugify_1 = __importDefault(require("slugify"));
function ArticleCreate() {
    const navigate = (0, react_location_1.useNavigate)();
    const { params: { articleId } } = (0, react_location_1.useMatch)();
    const { language, list: { categories, loadCategories, loadArticles } } = (0, react_1.useContext)(admin_context_1.AdminContext);
    const [article, setArticle] = (0, react_1.useState)({
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
    };
    const getContent = () => {
        if (article.content === null)
            return "";
        const content = typeof article.content === "string" ? JSON.parse(article.content) : article.content;
        return content[language];
    };
    // [ Categories Editor ]
    const getCategoryIds = () => {
        if (!article || !article.categories)
            return [];
        return article.categories.map((cat) => cat.category.id);
    };
    const [editorCategories, setEditorCategories] = (0, react_1.useState)(getCategoryIds());
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
    const featuredImageFileSelector = (0, react_1.useRef)(null);
    const [isUploadingFeaturedImage, setIsUploadingFeaturedImage] = (0, react_1.useState)(false);
    const saveEditArticle = async () => {
        const response = await SecuredAPI_1.default.post("article", { ...article, categoryIds: editorCategories.filter(cat => typeof cat === "number") });
        if (response.status === 200) {
            loadArticles();
            navigate({ to: "/admin/article/" + response.data.id });
        }
    };
    const handleEditTitleChange = (event) => {
        const value = event.target.value;
        setArticle({ ...article, title: { ...article.title, [language]: value } });
    };
    const handleEditContentChange = (value) => {
        setArticle({ ...article, content: { ...article.content, [language]: value } });
    };
    const openFeaturedImageFileSelector = () => {
        if (featuredImageFileSelector.current) {
            featuredImageFileSelector.current.click();
        }
    };
    const removeFeaturedImage = () => {
        setArticle({ ...article, photo: null });
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
                    setArticle({ ...article, photo: response.data.path });
                }, 1000);
            }
            else {
                console.error(response);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (article.title) {
            const title = article.title["en"] ? article.title["en"] : article.title["id"];
            setArticle({ ...article, slug: (0, slugify_1.default)(title) });
        }
    }, [article.title]);
    // [ Initialization ]
    (0, react_1.useEffect)(() => {
        loadCategories();
    }, []);
    // [ Render UI ]
    return (react_1.default.createElement("div", { className: `ArticleViewer Edit` },
        react_1.default.createElement("div", { className: "Article" },
            react_1.default.createElement("div", { className: "Title" },
                react_1.default.createElement("div", { className: "TitleEditor" },
                    react_1.default.createElement("label", { className: "EditLabel" },
                        "Title (",
                        language,
                        ")"),
                    react_1.default.createElement("textarea", { value: getTitle(), onChange: handleEditTitleChange, placeholder: "Enter title..." }))),
            react_1.default.createElement("div", { className: "FeaturedImage" },
                react_1.default.createElement("label", { className: "EditLabel" }, "Featured Image"),
                react_1.default.createElement("div", { className: "FeaturedImageEditor" },
                    react_1.default.createElement("div", { className: "Overlay" },
                        !article.photo && !isUploadingFeaturedImage && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(material_1.Icon, null, "image"),
                            react_1.default.createElement(material_1.Button, { onClick: () => { openFeaturedImageFileSelector(); } }, "Upload Image")),
                        article.photo && !isUploadingFeaturedImage && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(material_1.Button, { className: "ChangeButton", variant: "contained", onClick: () => { openFeaturedImageFileSelector(); } }, "Change Image"),
                            react_1.default.createElement(material_1.Button, { className: "ChangeButton", variant: "contained", color: "error", onClick: () => { removeFeaturedImage(); } }, "Remove")),
                        !article.photo && isUploadingFeaturedImage && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(material_1.CircularProgress, null))),
                    article.photo && react_1.default.createElement("img", { src: article.photo }),
                    react_1.default.createElement("input", { ref: featuredImageFileSelector, onChange: handleFeaturedImageFileSelector, type: "file" }))),
            react_1.default.createElement("div", { className: "Content" },
                react_1.default.createElement("label", { className: "EditLabel" },
                    "Content (",
                    language,
                    ")"),
                react_1.default.createElement(TypoEditor_1.default, { value: getContent(), onUpdate: handleEditContentChange, options: {
                        input: "html",
                        showToolbar: false,
                        showOtherInput: false,
                        showPreview: false,
                        showEditorToolbar: false,
                    } }))),
        react_1.default.createElement("div", { className: "Sidebar" },
            react_1.default.createElement("div", { className: "SidebarPanel" },
                react_1.default.createElement("div", { className: "Title" },
                    react_1.default.createElement("div", { className: "Label" }, "Article"),
                    react_1.default.createElement("div", { className: "TitleActions" },
                        react_1.default.createElement(material_1.Button, { variant: "outlined", onClick: () => { saveEditArticle(); } }, "Save"))),
                react_1.default.createElement("div", { className: "Content" },
                    react_1.default.createElement("div", { className: "ContentRow" },
                        react_1.default.createElement("div", { className: "Label" }, "Slug"),
                        react_1.default.createElement("div", { className: "Value" }, article.slug)))),
            react_1.default.createElement("div", { className: "SidebarPanel" },
                react_1.default.createElement("div", { className: "Title" },
                    react_1.default.createElement("div", { className: "Label" }, "Category")),
                react_1.default.createElement("div", { className: "Content" },
                    react_1.default.createElement("p", null, "Please select one or more categories."),
                    react_1.default.createElement(material_1.FormGroup, { className: "Options" }, categories && categories.map(category => (react_1.default.createElement("label", { className: "Option", key: category.id },
                        react_1.default.createElement(material_1.Checkbox, { size: "small", value: category.id, checked: editorCategories.includes(category.id), onChange: handleCategoryChange }),
                        react_1.default.createElement("div", { className: "Text" }, category.title))))))))));
}
exports.default = ArticleCreate;
