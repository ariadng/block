import React from "react";
import BlockContext from "../../BlockContext";
import { useContext } from "react";
import TextView from "../TextView/TextView";
import "./ListView.scss";
import ListViewProps from "./ListViewProps";
import View from "../View/View";
import Block from "../../Block";
import BlockText from "../../interfaces/BlockText";

export default function ListView (props: ListViewProps) {

	const { language } = useContext(BlockContext);

	// *** Props Management *** //
	const { className, type, items, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["ListView"];
		return result.join(' ');
	};
	
	// *** Values *** //
	const getTag = () => {
		if (type === "bulleted") return "ul";
		else return "ol";
	};
	
	// *** List Items *** //
	const getListItems = () : string[] => {
		if (!items) return [];
		const listItems: string[] = [];
		for (let item of items) {
			listItems.push(item[language]);
		}
		return listItems;
	};
	
	// *** JSX Element *** //
	return (
		<View
			tag={getTag()}
			className={getClassName()}
			{...otherProps}
		>
			{items && getListItems().map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</View>
	);

}