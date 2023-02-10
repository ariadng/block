import React, { CSSProperties, useRef, useState } from "react";
import Block from "./Block";
import BlockContext, { BlockContextInterface } from "./BlockContext";
import useView from "./hooks/useView";

interface Props {
	block: Block,
	width?: number,
	height?: number,
}

export default function BlockViewer ({ block, width, height }: Props) {

	const getStyle = (): CSSProperties => {
		let style: CSSProperties = {};
		if (typeof width !== "undefined") style.width = width;
		if (typeof height !== "undefined") style.height = height;
		return style;
	}

	const parentRef = useRef<HTMLDivElement>(null);
	const view = useView(parentRef);

	// --- Site Language
	const [ language, setLanguage ] = useState("en");

	const contextValue: BlockContextInterface = {
		view, language, setLanguage,
	}

	return (
		<div ref={parentRef} className="BlockViewer" style={getStyle()}>
			<BlockContext.Provider value={contextValue}>
				{block.toReactComponent()}
			</BlockContext.Provider>
		</div>
	);

}