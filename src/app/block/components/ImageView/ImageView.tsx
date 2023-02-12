import React, { CSSProperties } from "react";
import Block from "../../Block";
import BlockAlignment from "../../interfaces/BlockAlignment";
import BlockStyle from "../../interfaces/BlockStyle";
import TextView from "../TextView/TextView";
import View from "../View/View";
import "./ImageView.scss";
import { ImageViewProps } from "./ImageViewProps";

export default function ImageView (props: ImageViewProps) {

	// *** Props Management *** //
	const { src, width, height, sizing, style, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["ImageView"];
		return result.join(' ');
	};
	
	// *** Alignment *** //
	const getAlignment = () => {
		const viewAlignment: BlockAlignment = {
			default: {
				layout: "Vertical",
				mainAxis: "Start",
				crossAxis: "Stretch",
				gap: 0,
			},
			mobile: {},
			tablet: {},
			desktop: {},
			ultrawide: {},
		}
		return viewAlignment;
	}

	// *** Style *** //

	const getViewStyle = (): BlockStyle => {
		let styles: BlockStyle[] = [];
		let styleDefault: CSSProperties = {};

		// Width and Height
		if (typeof width !== "undefined" || typeof height !== "undefined") {
			// Width
			if (width === "auto") styleDefault.width = "auto";
			else if (width === "full") styleDefault.width = "100%";
			else styleDefault.width = width;
			// Height
			if (height === "auto") styleDefault.height = "auto";
			else if (height === "full") styleDefault.height = "100%";
			else styleDefault.height = height;
		}

		styles.push({ default: styleDefault, mobile: {}, tablet: {}, desktop: {}, ultrawide: {} });
		if (style) styles.push(style);
		return Block.mergeStyles(...styles);
	};

	const getImageStyle = (): CSSProperties => {
		let imageStyle: CSSProperties = {};
		// Width and Height
		if (typeof width !== "undefined" || typeof height !== "undefined") {
			imageStyle.width = "100%";
			imageStyle.height = "100%";
			imageStyle.objectFit = "cover";
		}
		return imageStyle;
	};

	// *** JSX Element *** //
	return (
		<View alignment={getAlignment()} style={getViewStyle()} className={getClassName()} {...otherProps}>
			<img src={src} style={getImageStyle()} />
		</View>
	);

}