import React, { Children, useRef, useState } from "react";
import Block from "../../Block";
import BlockContext from "../../BlockContext";
import { useContext } from "react";
import "./View.scss";
import ViewProps from "./ViewProps";
import ViewInsert from "./ViewInsert";

export default function View (props: ViewProps) {

	const { view, hoveredId, setHoveredId } = useContext(BlockContext);

	// *** Props Management *** //
	const { block, tag, alignment, style, children, className, ...otherProps } = props;

	// *** Style *** //
	const getStyle = () => {
		if (!style) return {};
		const styleObject = block ? Block.getStyle(block, view) : {};
		return styleObject;
	};

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["View"];
		if (className) result.push(className);
		if (hoveredId === props.id) result.push("State_Hovered");
		return result.join(' ');
	};

	// *** Events *** //
	const handleMouseOver: React.MouseEventHandler = (event) => {
		event.stopPropagation();
		if (props.id) setHoveredId(props.id);
	}
	const handleMouseLeave: React.MouseEventHandler = (event) => {
		event.stopPropagation();
		if (props.id === hoveredId) setHoveredId(null);
	}

	// *** JSX Element *** //
	const getElement = () => {

		let childrenList = [children];

		let element =  React.createElement(tag ? tag : "div", {
			className: getClassName(),
			style: getStyle(),
			children,
			onMouseOver: handleMouseOver,
			onMouseLeave: handleMouseLeave,
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