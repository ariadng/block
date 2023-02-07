import React, { createContext, Dispatch } from "react";

export interface AdminContextInterface {
	user: null | any,
	setUser: any,
} 

export const AdminContext = createContext({
	user: null,
	setUser: (data: any) => {},
});