import { createContext } from "react";

export interface ComponentEditorContextInterface {
	insertType: string | null,
	setInsertType: Function,
	insert: Function,
}

export const ComponentEditorContextDefault: ComponentEditorContextInterface = {
	insertType: null,
	setInsertType: () => {},
	insert: () => {},
};

export const ComponentEditorContext = createContext<ComponentEditorContextInterface>(ComponentEditorContextDefault);