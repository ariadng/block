import BlockText from "@/block/interfaces/BlockText";
import ViewProps from "../View/ViewProps";

export default interface ButtonViewProps extends ViewProps {
	label?: BlockText,
	color?: "Default" | "Primary" | "Accent",
}