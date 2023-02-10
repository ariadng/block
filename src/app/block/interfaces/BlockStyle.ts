import { CSSProperties } from "react";

export default interface BlockStyle {
	default: CSSProperties,
	mobile: CSSProperties,
	tablet: CSSProperties,
	desktop: CSSProperties,
	ultrawide: CSSProperties,
}

export const BlockStyleDefault: BlockStyle = {
	default: {},
	mobile: {},
	tablet: {},
	desktop: {},
	ultrawide: {},
};