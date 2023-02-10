"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminContext = void 0;
const react_1 = require("react");
exports.AdminContext = (0, react_1.createContext)({
    user: { id: null, name: "", email: "" },
    setUser: (data) => { },
    language: "en",
    setLanguage: () => { },
    list: {
        // - Data
        users: [],
        articles: [],
        categories: [],
        pages: [],
        // - Actions
        loadUsers: async () => { },
        loadArticles: async () => { },
        loadCategories: async () => { },
        loadPages: async () => { },
        // - State
        isLoadingUsers: false,
        isLoadingArticles: false,
        isLoadingCategories: false,
        isLoadingPages: false,
    }
});
