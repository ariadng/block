import React, { createContext, Dispatch } from "react";

export interface AdminContextInterface {
	user: null | any,
	setUser: any,

	language: string,
	setLanguage: Function,
	
	list: {
		// - Data
		users: any[],
		articles: any[],
		categories: any[],
		pages: any[],
		// - Actions
		loadUsers: () => void,
		loadArticles: () => void,
		loadCategories: () => void,
		loadPages: () => void,
		// - State
		isLoadingUsers: boolean,
		isLoadingArticles: boolean,
		isLoadingCategories: boolean,
		isLoadingPages: boolean,
	}
}

export const AdminContext = createContext<AdminContextInterface>({
	user: { id: null, name: "", email: "" },
	setUser: (data: any) => {},

	language: "en",
	setLanguage: () => {},

	list: {
		// - Data
		users: [],
		articles: [],
		categories: [],
		pages: [],
		// - Actions
		loadUsers: async () => {},
		loadArticles: async () => {},
		loadCategories: async () => {},
		loadPages: async () => {},
		// - State
		isLoadingUsers: false,
		isLoadingArticles: false,
		isLoadingCategories: false,
		isLoadingPages: false,
	}
});