import React from "react";
import BlockContext from "../../BlockContext";
import { useContext } from "react";
import View from "../View/View";
import "./TextView.scss";
import TextViewProps from "./TextViewProps";

export default function TextView (props: TextViewProps) {

	const { language } = useContext(BlockContext);

	// *** Props Management *** //
	const { tag, text, className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["TextView"];
		if (className) result.push(className);
		return result.join(' ');
	};
	
	// *** Values *** //
	const getTag = () => {
		return tag ? tag : "span";
	};
	const getText = () => {
		return text[language];
	};
	
	// *** JSX Element *** //
	return (
		<View
			tag={getTag()}
			className={getClassName()}
			{...otherProps}
		>
			{ getText() }
		</View>
	);

}