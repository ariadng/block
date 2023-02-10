import { createContext } from "react";
import BlockView from "./interfaces/BlockView";

export interface BlockContextInterface {
	view: BlockView,
	language: string,
	setLanguage: (lang: string) => void,
}

export const BlockContextDefault: BlockContextInterface = {
	view: BlockView.Default,
	language: "en",
	setLanguage: () => {},
};

const BlockContext = createContext(BlockContextDefault);
export default BlockContext;