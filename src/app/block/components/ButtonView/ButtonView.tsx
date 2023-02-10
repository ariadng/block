import React from "react";
import BlockAlignment from "../../interfaces/BlockAlignment";
import TextView from "../TextView/TextView";
import View from "../View/View";
import "./ButtonView.scss";
import ButtonViewProps from "./ButtonViewProps";

export default function ButtonView (props: ButtonViewProps) {

	// *** Props Management *** //
	const { label, color, className, alignment, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["ButtonView"];
		result.push("Color" + (color ? color : "Default"));
		return result.join(' ');
	};
	
	// *** Alignment *** //
	const getAlignment = () => {
		const buttonAlignment: BlockAlignment = {
			default: {
				layout: "Horizontal",
				mainAxis: "Start",
				crossAxis: "Center",
			},
			mobile: {},
			tablet: {},
			desktop: {},
			ultrawide: {},
		}
		return buttonAlignment;
	}

	// *** JSX Element *** //
	return (
		<View tag="button" alignment={getAlignment()} className={getClassName()} {...otherProps}>
			{label && <TextView text={label} className="Label" />}
		</View>
	);

}