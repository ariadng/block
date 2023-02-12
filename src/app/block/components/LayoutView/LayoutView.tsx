import React, { useContext } from "react";
import BlockContext from "../../BlockContext";
import View from "../View/View";
import ViewProps from "../View/ViewProps";
import "./LayoutView.scss";
import LayoutViewProps from "./LayoutViewProps";

export default function LayoutView (props: LayoutViewProps) {

	const { view } = useContext(BlockContext);

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