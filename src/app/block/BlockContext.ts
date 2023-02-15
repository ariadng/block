import { createContext } from "react";
import BlockView from "./interfaces/BlockView";

export interface BlockContextInterface {
	hoveredId: string | null,
	setHoveredId: (id: string | null) => void,
	selectedIds: string[],
	setSelectedIds: (ids: string[]) => void,
	view: BlockView,
	language: string,
	setLanguage: (lang: string) => void,
	editMode?: boolean,
}

export const BlockContextDefault: BlockContextInterface = {
	hoveredId: null,
	setHoveredId: () => {},
	selectedIds: [],
	view: BlockView.Default,
	setSelectedIds: () => {},
	language: "en",
	setLanguage: () => {},
	editMode: false,
};

const BlockContext = createContext(BlockContextDefault);
export default BlockContext;