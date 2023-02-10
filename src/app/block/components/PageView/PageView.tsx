import React from "react";
import View from "../View/View";
import ViewProps from "../View/ViewProps";
import "./PageView.scss";

export default function PageView (props: ViewProps) {

	// *** Props Management *** //
	const { className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["PageView"];
		return result.join(' ');
	};

	// *** JSX Element *** //
	return (
		<View className={getClassName()} {...otherProps} />
	);

}