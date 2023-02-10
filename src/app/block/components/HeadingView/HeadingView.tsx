import React from "react";
import BlockContext from "../../BlockContext";
import { useContext } from "react";
import TextView from "../TextView/TextView";
import "./HeadingView.scss";
import HeadingViewProps from "./HeadingViewProps";

export default function HeadingView (props: HeadingViewProps) {

	const { language } = useContext(BlockContext);

	// *** Props Management *** //
	const { level, className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["HeadingView"];
		return result.join(' ');
	};
	
	// *** Values *** //
	const getTag = () => {
		if 		(level === 1) 	return "h1";
		else if (level === 2) 	return "h2";
		else if (level === 3) 	return "h3";
		else if (level === 4) 	return "h4";
		else if (level === 5) 	return "h5";
		else if (level === 6) 	return "h6";
		else 					return "span";
	};
	
	// *** JSX Element *** //
	return (
		<TextView
			tag={getTag()}
			className={getClassName()}
			{...otherProps}
		/>
	);

}