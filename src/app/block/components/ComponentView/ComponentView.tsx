import React from "react";
import View from "../View/View";
import ViewProps from "../View/ViewProps";
import "./ComponentView.scss";

export default function ComponentView (props: ViewProps) {

	// *** Props Management *** //
	const { className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["ComponentView"];
		return result.join(' ');
	};

	// *** JSX Element *** //
	return (
		<View className={getClassName()} {...otherProps} />
	);

}