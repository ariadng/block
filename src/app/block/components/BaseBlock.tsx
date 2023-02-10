import React from "react";
import BaseBlockInterface from "../interfaces/BaseBlockInterface";

export default function BaseBlock ({
	id,
	alignment,
	style,
	children,
	className,
}: BaseBlockInterface) {

	// Get className.
	const getClassName = () : string => {
		let result = "Block";
		if (className) result += " " + className;
		return result;
	};

	// Return the block component.
	return (
		<div className={getClassName()}>
			{children}
		</div>
	);
}