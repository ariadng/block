import BlockText from "../../interfaces/BlockText";
import ViewProps from "../View/ViewProps";

export default interface ButtonViewProps extends ViewProps {
	label?: BlockText,
	color?: "Default" | "Primary" | "Accent" | "OnPrimary",
	variant?: "Default" | "Outlined",
	tooltip?: BlockText,
}