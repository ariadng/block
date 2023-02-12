import React from "react";
import BlockAlignment from "../../interfaces/BlockAlignment";
import View from "../View/View";
import ViewProps from "../View/ViewProps";
import "./VerticalView.scss";

export default function VerticalView (props: ViewProps) {

	// *** Props Management *** //
	const { className, alignment, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["VerticalView"];
		return result.join(' ');
	};

	// *** Alignment *** //
	const getAlignment = () => {
		const viewAlignment: BlockAlignment = {
			default: {
				layout: "Vertical",
				mainAxis: "Start",
				crossAxis: "Start",
				gap: alignment && alignment['default'] ? alignment['default'].gap : 0,
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
		<View alignment={getAlignment()} className={getClassName()} {...otherProps} />
	);

}