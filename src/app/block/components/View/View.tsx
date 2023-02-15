import React, { Children, useRef, useState } from "react";
import Block from "../../Block";
import BlockContext from "../../BlockContext";
import { useContext } from "react";
import "./View.scss";
import ViewProps from "./ViewProps";
import ViewInsert from "./ViewInsert";

export default function View (props: ViewProps) {

	const { view, editMode, hoveredId, setHoveredId, selectedIds, setSelectedIds } = useContext(BlockContext);

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
	const handleOnClick: React.MouseEventHandler = (event) => {
		if (editMode && block) {
			event.stopPropagation();
			setSelectedIds([block.id]);
		}
	}

	// *** States *** //
	const elementRef = useRef(null);
	const isHovered = (): boolean => {
		if (!block) return false;
		if (block.id === hoveredId) return true;
		return false;
	};
	const getHoverIndicator = () => {
		if (!elementRef.current) return <></>;
		const element = elementRef.current as HTMLElement;
		const rect = element.getBoundingClientRect();
		return <div className="HoverIndicator" style={{
			width: rect.width,
			height: rect.height,
			top: rect.top,
			left: rect.left,
		}}></div>;
	}
	const isSelected = (): boolean => {
		if (!block) return false;
		if (selectedIds.includes(block.id)) return true;
		return false;
	};
	const getSelectedIndicator = () => {
		if (!elementRef.current) return <></>;
		const element = elementRef.current as HTMLElement;
		const { width, height, top, left } = element.getBoundingClientRect();
		return (
			<div className="SelectedIndicator" style={{width, height, top, left}}>
				<div className="DragPoint TopLeft" style={{top: (-4), left: (-4)}}></div>
				<div className="DragPoint TopRight" style={{top: (-4), left: (width-6)}}></div>
				<div className="DragPoint BottomLeft" style={{top: (height-6), left: (-4)}}></div>
				<div className="DragPoint BottomRight" style={{top: (height-6), left: (width-6)}}></div>
			</div>
		);
	}

	// *** JSX Element *** //
	const getElement = () => {

		let childrenList = [children];

		let element =  React.createElement(tag ? tag : "div", {
			className: getClassName(),
			style: getStyle(),
			children,
			ref: elementRef,
			// onClick: handleOnClick,
			onMouseOver: handleMouseOver,
			onMouseLeave: handleMouseLeave,
			...otherProps,
		}, [...childrenList]);
		return element;
	};

	return (
		<React.Fragment>
			{getElement()}
			{editMode && isHovered() && getHoverIndicator()}
			{/* {editMode && isSelected() && getSelectedIndicator()} */}
		</React.Fragment>
	);

}