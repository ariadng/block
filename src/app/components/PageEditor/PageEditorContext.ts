import { createContext } from "react";

export interface PageEditorContextInterface {

}

export const PageEditorContextDefault: PageEditorContextInterface = {

};

export const PageEditorContext = createContext<PageEditorContextInterface>(PageEditorContextDefault);