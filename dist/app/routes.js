"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const admin_layout_1 = __importDefault(require("./admin/admin.layout"));
const article_create_1 = __importDefault(require("./admin/article/article.create"));
const article_index_1 = __importDefault(require("./admin/article/article.index"));
const article_layout_1 = __importDefault(require("./admin/article/article.layout"));
const article_view_1 = __importDefault(require("./admin/article/article.view"));
const editor_1 = __importDefault(require("./admin/editor"));
const login_page_1 = __importDefault(require("./admin/login/login.page"));
const user_create_1 = __importDefault(require("./admin/user/user.create"));
const user_index_1 = __importDefault(require("./admin/user/user.index"));
const user_layout_1 = __importDefault(require("./admin/user/user.layout"));
const user_view_1 = __importDefault(require("./admin/user/user.view"));
const AppRoutes = [
    { path: "/", element: "Site" },
    // Admin
    { path: "admin", element: react_1.default.createElement(admin_layout_1.default, null), children: [
            { path: "/", element: react_1.default.createElement(login_page_1.default, null) },
            { path: "page", element: "admin page" },
            { path: "article", element: react_1.default.createElement(article_layout_1.default, null), children: [
                    { path: "/", element: react_1.default.createElement(article_index_1.default, null) },
                    { path: "/create", element: react_1.default.createElement(article_create_1.default, null) },
                    { path: "/:articleId", element: react_1.default.createElement(article_view_1.default, null) },
                ] },
            { path: "user", element: react_1.default.createElement(user_layout_1.default, null), children: [
                    { path: "/", element: react_1.default.createElement(user_index_1.default, null) },
                    { path: "create", element: react_1.default.createElement(user_create_1.default, null) },
                    { path: "/:userId", element: react_1.default.createElement(user_view_1.default, null) },
                ] },
            { path: "settings", element: "admin settings" },
            { path: "account", element: "admin account" },
            { path: "editor", element: react_1.default.createElement(editor_1.default, null) },
        ] },
];
exports.default = AppRoutes;
