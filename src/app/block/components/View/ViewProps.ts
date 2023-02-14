import React from "react";
import BlockAlignment from "../../interfaces/BlockAlignment";
import BlockBackgroundInterface from "../../properties/background/BlockBackgroundInterface";
import BlockStyle from "../../interfaces/BlockStyle";
import Block from "../../Block";

export default interface ViewProps {
	block?: Block | null,
	// Custom View props.
	type?: string,
	tag?: string,
	id?: string,
	alignment?: BlockAlignment,
	backgrounds?: BlockBackgroundInterface[],
	style?: BlockStyle,
	// From ReactJS.
	className?: string,
	children?: React.ReactNode,
}