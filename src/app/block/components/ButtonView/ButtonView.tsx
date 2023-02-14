import React from "react";
import Block from "../../Block";
import BlockAlignment from "../../interfaces/BlockAlignment";
import TextView from "../TextView/TextView";
import View from "../View/View";
import "./ButtonView.scss";
import ButtonViewProps from "./ButtonViewProps";

export default function ButtonView (props: ButtonViewProps) {

	// *** Props Management *** //
	const { block, label, color, variant, className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["ButtonView"];
		result.push("Color" + (color ? color : "Default"));
		result.push("Variant" + (variant ? variant : "Default"));
		return result.join(' ');
	};

	const getBlock = (): Block | null => {
		
		if (!block) return null;

		let updatedBlock: Block = Block.copy(block);

		// ## Alignment
		// Alignment value.
		let alignment: BlockAlignment = {
			default: {
				layout: "Horizontal",
				mainAxis: "Start",
				crossAxis: "Center",
				gap: 8,
			},
			mobile: {},
			tablet: {},
			desktop: {},
			ultrawide: {},
		};
		updatedBlock = updatedBlock.updateAlignment(alignment);

		// ## Block
		// Return the updated block.
		return updatedBlock;

	};
	// *** JSX Element *** //
	return (
		<View block={getBlock()} tag="button" className={getClassName()} {...otherProps}>
			{label && <TextView text={label} className="Label" />}
		</View>
	);

}