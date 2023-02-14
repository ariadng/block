import BlockBackgroundInterface from "../properties/background/BlockBackgroundInterface";
import BlockAlignment from "./BlockAlignment";
import BlockProps from "./BlockProps";
import BlockStyle from "./BlockStyle";

export default interface BlockInterface {
	type: string,
	id: string,
	props: BlockProps,
	alignment: BlockAlignment,
	backgrounds: BlockBackgroundInterface[],
	style: BlockStyle,
	children: BlockInterface[],
}