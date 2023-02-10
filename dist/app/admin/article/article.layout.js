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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const react_location_1 = require("@tanstack/react-location");
const admin_context_1 = require("../admin.context");
const luxon_1 = require("luxon");
require("./article.style.scss");
function ArticleLayout() {
    const navigate = (0, react_location_1.useNavigate)();
    const { language, list: { articles, loadArticles } } = (0, react_1.useContext)(admin_context_1.AdminContext);
    const [searchText, setSearchText] = (0, react_1.useState)("");
    const init = async () => {
        await loadArticles();
    };
    (0, react_1.useEffect)(() => {
        init();
    }, []);
    const getFilteredArticles = () => {
        return articles.filter(article => getArticleTitle(article).toLowerCase().includes(searchText));
    };
    const handleSearchInput = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setSearchText(value);
    };
    const goToCreate = () => {
        navigate({ to: "/admin/article/create" });
    };
    const getArticleTitle = (article) => {
        return article.title[language];
    };
    return (react_1.default.createElement("div", { className: "ArticleLayout" },
        react_1.default.createElement("div", { className: "ArticleList" },
            react_1.default.createElement("div", { className: "Search" },
                react_1.default.createElement(material_1.TextField, { value: searchText, onChange: handleSearchInput, label: "Search...", variant: "outlined", size: "small", type: "search", fullWidth: true }),
                react_1.default.createElement(material_1.Button, { variant: "contained", onClick: () => { goToCreate(); } },
                    react_1.default.createElement(material_1.Icon, null, "add"),
                    react_1.default.createElement("span", { className: "Label" }, "Add New"))),
            react_1.default.createElement("div", { className: "Rows" }, getFilteredArticles().map(article => (react_1.default.createElement(react_location_1.Link, { to: `/admin/article/${article.id}`, className: "ArticleRow", key: article.id, getActiveProps: () => ({ className: 'Active' }) },
                react_1.default.createElement("span", { className: "Photo" },
                    react_1.default.createElement("span", { className: "Thumbnail" }, article.photo && react_1.default.createElement("img", { src: article.photo }))),
                react_1.default.createElement("span", { className: "Details" },
                    react_1.default.createElement("span", { className: "Name" }, getArticleTitle(article)),
                    react_1.default.createElement("span", { className: "Meta" },
                        react_1.default.createElement("span", { className: "MetaItem" },
                            react_1.default.createElement(material_1.Icon, null, "schedule"),
                            react_1.default.createElement("span", { className: "label" }, luxon_1.DateTime.fromISO(article.updatedAt).toLocaleString(luxon_1.DateTime.DATETIME_MED))),
                        article.publishedAt && react_1.default.createElement("span", { className: "MetaItem" },
                            react_1.default.createElement(material_1.Icon, null, "public"),
                            react_1.default.createElement("span", { className: "label" }, "Published")),
                        !article.publishedAt && react_1.default.createElement("span", { className: "MetaItem" },
                            react_1.default.createElement(material_1.Icon, null, "edit_note"),
                            react_1.default.createElement("span", { className: "label" }, "Draft"))))))))),
        react_1.default.createElement("div", { className: "ArticleView" },
            react_1.default.createElement(react_location_1.Outlet, null))));
}
exports.default = ArticleLayout;
