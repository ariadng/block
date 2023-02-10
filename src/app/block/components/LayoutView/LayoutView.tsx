import React from "react";
import View from "../View/View";
import ViewProps from "../View/ViewProps";
import "./LayoutView.scss";

export default function LayoutView (props: ViewProps) {

	// *** Props Management *** //
	const { className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["LayoutView"];
		return result.join(' ');
	};

	// *** JSX Element *** //
	return (
		<View className={getClassName()} {...otherProps} />
	);

}