import BlockText from "../../interfaces/BlockText";
import ViewProps from "../View/ViewProps";

export default interface TimelineViewProps extends ViewProps {
	variant?: "dotted",
	points?: {
		title: BlockText,
		leadingText?: BlockText,
		secondaryText?: BlockText,
	}[],
}