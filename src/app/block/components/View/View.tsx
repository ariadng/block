import React, { Children } from "react";
import Block from "../../Block";
import BlockContext from "../../BlockContext";
import { useContext } from "react";
import "./View.scss";
import ViewProps from "./ViewProps";
import ViewInsert from "./ViewInsert";

export default function View (props: ViewProps) {

	const { view } = useContext(BlockContext);

	// *** Props Management *** //
	const { tag, alignment, style, children, className, ...otherProps } = props;

	// *** Alignment *** //
	const getAlignmentClassName = () => {
		if (!alignment) return "";
		const alignmentObject = Block.getAlignment(alignment, view);
		let alignmentClassName: string[] = [];
		alignmentClassName.push("Alignment_Layout_" + alignmentObject.layout);
		alignmentClassName.push("Alignment_MainAxis_" + alignmentObject.mainAxis);
		alignmentClassName.push("Alignment_CrossAxis_" + alignmentObject.crossAxis);
		return alignmentClassName.join(' ');
	};

	getAlignmentClassName();

	// *** Style *** //
	const getStyle = () => {
		if (!style) return {};
		const styleObject = Block.getStyle(style, view);
		return styleObject;
	};

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["View"];
		if (className) result.push(className);
		result.push(getAlignmentClassName());
		return result.join(' ');
	};

	// *** JSX Element *** //
	const getElement = () => {

		let childrenList = [children];

		let element =  React.createElement(tag ? tag : "div", {
			className: getClassName(),
			style: getStyle(),
			children,
			...otherProps,
		}, [...childrenList]);
		return element;
	};

	return (
		<>
			{getElement()}
		</>
	);

}