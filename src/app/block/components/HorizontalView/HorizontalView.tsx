import React from "react";
import Block from "../../Block";
import BlockAlignment from "../../interfaces/BlockAlignment";
import LayoutViewProps from "../LayoutView/LayoutViewProps";
import View from "../View/View";
import "./HorizontalView.scss";

export default function HorizontalView (props: LayoutViewProps) {

	// *** Props Management *** //
	const { block, className, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["HorizontalView"];
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
				mainAxis: block.alignment && block.alignment['default'] ? block.alignment['default'].mainAxis :"Start",
				crossAxis: block.alignment && block.alignment['default'] ? block.alignment['default'].crossAxis :"Start",
				gap: block.alignment && block.alignment['default'] ? block.alignment['default'].gap : 0,
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
		<View block={getBlock()} className={getClassName()} {...otherProps} />
	);

}