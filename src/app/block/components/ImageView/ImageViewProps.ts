import ViewProps from "../View/ViewProps";

export interface ImageViewProps extends ViewProps {
	src?: string,
	width?: number | "auto" | "full",
	height?: number | "auto" | "full",
	sizing?: "auto" | "fill" | "fit" | "crop" | "tile",
}