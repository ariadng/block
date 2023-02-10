import React from "react";
import BlockAlignment from "../../interfaces/BlockAlignment";
import BlockStyle from "../../interfaces/BlockStyle";

export default interface ViewProps {
	// Custom View props.
	type?: string,
	tag?: string,
	id?: string,
	alignment?: BlockAlignment,
	style?: BlockStyle,
	// From ReactJS.
	className?: string,
	children?: React.ReactNode,
}