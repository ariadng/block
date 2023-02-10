import BlockAlignment from "./BlockAlignment";
import BlockProps from "./BlockProps";
import BlockStyle from "./BlockStyle";

export default interface BlockInterface {
	type: string,
	id: string,
	props: BlockProps,
	alignment: BlockAlignment,
	style: BlockStyle,
	children: BlockInterface[],
}