import React from "react";
import View from "../View/View";
import ViewProps from "../View/ViewProps";
import "./SectionView.scss";

export default function SectionView (props: ViewProps) {

	// *** Props Management *** //
	const { className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["SectionView"];
		return result.join(' ');
	};

	// *** JSX Element *** //
	return (
		<View className={getClassName()} {...otherProps} />
	);

}