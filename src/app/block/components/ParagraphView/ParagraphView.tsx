import React from "react";
import BlockContext from "../../BlockContext";
import { useContext } from "react";
import TextView from "../TextView/TextView";
import "./ParagraphView.scss";
import ParagraphViewProps from "./ParagraphViewProps";

export default function ParagraphView (props: ParagraphViewProps) {

	const { language } = useContext(BlockContext);

	// *** Props Management *** //
	const { className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["ParagraphView"];
		return result.join(' ');
	};
	
	// *** Values *** //
	const getTag = () => {
		return "p";
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