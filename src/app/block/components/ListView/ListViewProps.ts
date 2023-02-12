import BlockInterface from "../../interfaces/BlockInterface";
import BlockText from "../../interfaces/BlockText";
import ViewProps from "../View/ViewProps";

export default interface ListViewProps extends ViewProps {
	type?: "bulleted" | "numbered",
	items?: BlockText[],
}