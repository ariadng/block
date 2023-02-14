import React from "react";
import BlockAlignment from "../../interfaces/BlockAlignment";
import LayoutViewProps from "../LayoutView/LayoutViewProps";
import View from "../View/View";
import "./HorizontalView.scss";

export default function HorizontalView (props: LayoutViewProps) {

	// *** Props Management *** //
	const { className, alignment, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["HorizontalView"];
		return result.join(' ');
	};

	// *** Alignment *** //
	const getAlignment = () => {
		const viewAlignment: BlockAlignment = {
			default: {
				layout: "Horizontal",
				mainAxis: alignment && alignment['default'] ? alignment['default'].mainAxis :"Start",
				crossAxis: alignment && alignment['default'] ? alignment['default'].crossAxis :"Start",
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