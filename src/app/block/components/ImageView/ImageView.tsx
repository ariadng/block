import React from "react";
import BlockAlignment from "../../interfaces/BlockAlignment";
import TextView from "../TextView/TextView";
import View from "../View/View";
import "./ImageView.scss";
import ImageViewProps from "./ImageViewProps";

export default function ImageView (props: ImageViewProps) {

	// *** Props Management *** //
	const { src, ...otherProps } = props;

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
			},
			mobile: {},
			tablet: {},
			desktop: {},
			ultrawide: {},
		}
		return viewAlignment;
	}

	// *** JSX Element *** //
	return (
		<View alignment={getAlignment()} className={getClassName()} {...otherProps}>
			<img src={src} />
		</View>
	);

}