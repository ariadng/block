import BlockContext from "../../BlockContext";
import React, { useContext } from "react";
import "./TimelineView.scss";
import View from "../View/View";
import TimelineViewProps from "./TimelineViewProps";
import BlockText from "../../interfaces/BlockText";

export default function TimelineView (props: TimelineViewProps) {

	const { language } = useContext(BlockContext);

	// *** Props Management *** //
	const { className, variant, points, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["TimelineView"];
		return result.join(' ');
	};
	
	// *** Values *** //
	const getTag = () => {
		return "div";
	};

	const getText = (text: BlockText) => {
		return text[language] ? text[language] : "";
	};
	
	// *** JSX Element *** //
	return (
		<View
			tag={getTag()}
			className={getClassName()}
			{...otherProps}
		>
			<div className="Line"></div>
			{points && points.map((point, index) => (
				<div className="Point" key={index}>
					<div className="Dot"></div>
					{point.title && <div className="Title">{getText(point.title)}</div>}
					{point.leadingText && <div className="LeadingText">{getText(point.leadingText)}</div>}
					{point.secondaryText && <div className="SecondaryText">{getText(point.secondaryText)}</div>}
				</div>
			))}
		</View>
	);

}