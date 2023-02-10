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
const react_1 = __importStar(require("react"));
const react_location_1 = require("@tanstack/react-location");
const material_1 = require("@mui/material");
require("./admin.style.scss");
const SecuredAPI_1 = __importDefault(require("../utils/SecuredAPI"));
const admin_context_1 = require("./admin.context");
const Auth_1 = __importDefault(require("../utils/Auth"));
function AdminLayout() {
    const navigate = (0, react_location_1.useNavigate)();
    const router = (0, react_location_1.useRouter)();
    const [user, setUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (user !== null && !isLoading) {
            if (router.state.location.href === "/admin")
                navigate({ to: "/admin/page" });
        }
        else if (user === null && !isLoading) {
            navigate({ to: "/admin" });
        }
    }, [user, isLoading]);
    const logout = async () => {
        setIsLoading(true);
        await SecuredAPI_1.default.get("auth/logout");
        localStorage.clear();
        setUser(null);
        navigate({ to: "/admin" });
    };
    // [ Set initial data ]
    // Set user
    const loadUser = async () => {
        const userData = await Auth_1.default.getUser();
        setUser(userData);
    };
    // Initialize
    (0, react_1.useEffect)(() => {
        loadUser();
    }, []);
    // User changed
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [user]);
    const handleLanguageSwitch = (event, value) => {
        if (value !== null)
            setLanguage(value);
    };
    // [ Admin Context ]
    // - Language
    const [language, setLanguage] = (0, react_1.useState)("en");
    // - Data
    const [users, setUsers] = (0, react_1.useState)([]);
    const [articles, setArticles] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [pages, setPages] = (0, react_1.useState)([]);
    // - State
    const [isLoadingUsers, setIsLoadingUsers] = (0, react_1.useState)(false);
    const [isLoadingArticles, setIsLoadingArticles] = (0, react_1.useState)(false);
    const [isLoadingCategories, setIsLoadingCategories] = (0, react_1.useState)(false);
    const [isLoadingPages, setIsLoadingPages] = (0, react_1.useState)(false);
    const contextValue = {
        user: user,
        setUser: setUser,
        // - Language
        language: language,
        setLanguage: setLanguage,
        list: {
            // - Data
            users: users,
            articles: articles,
            categories: categories,
            pages: pages,
            // - Actions
            loadUsers: async () => {
                const response = await SecuredAPI_1.default.get("user");
                setUsers(response.data);
            },
            loadArticles: async () => {
                const response = await SecuredAPI_1.default.get("article");
                setArticles(response.data);
            },
            loadCategories: async () => {
                const response = await SecuredAPI_1.default.get("category");
                setCategories(response.data);
            },
            loadPages: async () => {
                const response = await SecuredAPI_1.default.get("page");
                setPages(response.data);
            },
            // - State
            isLoadingUsers: isLoadingUsers,
            isLoadingArticles: isLoadingArticles,
            isLoadingCategories: isLoadingCategories,
            isLoadingPages: isLoadingPages,
        }
    };
    if (isLoading)
        return (react_1.default.createElement("div", { className: "AdminLayout" },
            react_1.default.createElement("div", { className: "Loading" },
                react_1.default.createElement(material_1.CircularProgress, null))));
    return (react_1.default.createElement(admin_context_1.AdminContext.Provider, { value: contextValue },
        react_1.default.createElement("div", { className: "AdminLayout" },
            user && react_1.default.createElement("div", { className: "AppBar" },
                react_1.default.createElement("div", { className: "Brand" },
                    react_1.default.createElement("div", { className: "Title" }, "Transisi")),
                react_1.default.createElement("div", { className: "Menu" },
                    react_1.default.createElement(react_location_1.Link, { to: "/admin/page", className: "MenuItem", getActiveProps: () => ({ className: 'Active' }) },
                        react_1.default.createElement(material_1.Icon, null, "auto_stories"),
                        react_1.default.createElement("span", { className: "Label" }, "Pages")),
                    react_1.default.createElement(react_location_1.Link, { to: "/admin/article", className: "MenuItem", getActiveProps: () => ({ className: 'Active' }) },
                        react_1.default.createElement(material_1.Icon, null, "newspaper"),
                        react_1.default.createElement("span", { className: "Label" }, "Articles")),
                    react_1.default.createElement(react_location_1.Link, { to: "/admin/user", className: "MenuItem", getActiveProps: () => ({ className: 'Active' }) },
                        react_1.default.createElement(material_1.Icon, null, "people"),
                        react_1.default.createElement("span", { className: "Label" }, "Users")),
                    react_1.default.createElement(react_location_1.Link, { to: "/admin/settings", className: "MenuItem", getActiveProps: () => ({ className: 'Active' }) },
                        react_1.default.createElement(material_1.Icon, null, "settings"),
                        react_1.default.createElement("span", { className: "Label" }, "Settings"))),
                react_1.default.createElement("div", { className: "Actions" },
                    react_1.default.createElement(material_1.ToggleButtonGroup, { value: language, exclusive: true, onChange: handleLanguageSwitch, size: "small" },
                        react_1.default.createElement(material_1.ToggleButton, { value: "en" }, "English"),
                        react_1.default.createElement(material_1.ToggleButton, { value: "id" }, "Bahasa Indonesia")),
                    react_1.default.createElement(react_location_1.Link, { to: "/admin/account", className: "MenuItem", getActiveProps: () => ({ className: 'Active' }) },
                        react_1.default.createElement(material_1.Icon, null, "account_circle"),
                        react_1.default.createElement("span", { className: "Label" }, user.name)),
                    react_1.default.createElement(material_1.Button, { variant: "text", onClick: () => { logout(); } }, "Logout"))),
            react_1.default.createElement("div", { className: "AppContent" },
                react_1.default.createElement(react_location_1.Outlet, null)))));
}
exports.default = AdminLayout;
