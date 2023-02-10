import React, { CSSProperties, useRef, useState } from "react";
import Block from "./Block";
import BlockContext, { BlockContextInterface } from "./BlockContext";
import useView from "./hooks/useView";
import "./BlockViewer.scss";

interface Props {
	block: Block,
	editMode?: boolean,
	width?: number,
	height?: number,
}

export default function BlockViewer ({ block, editMode, width, height }: Props) {

	const getStyle = (): CSSProperties => {
		let style: CSSProperties = {};
		if (typeof width !== "undefined") style.width = width;
		if (typeof height !== "undefined") style.height = height;
		return style;
	}

	const parentRef = useRef<HTMLDivElement>(null);
	const view = useView(parentRef);

	// -- State
	const [ hoveredId, setHoveredId ] = useState<string|null>(null);

	// --- Site Language
	const [ language, setLanguage ] = useState("en");

	const contextValue: BlockContextInterface = {
		hoveredId, setHoveredId, view, language, setLanguage, editMode,
	}

	// --- ClassName
	const getClassName = () : string => {
		const classNames = ["BlockViewer"];
		if (editMode) classNames.push("EditMode")
		return classNames.join(" ");
	};

	return (
		<div ref={parentRef} className={getClassName()} style={getStyle()}>
			<BlockContext.Provider value={contextValue}>
				{block.toReactComponent()}
			</BlockContext.Provider>
		</div>
	);

}