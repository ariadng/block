import BlockAlignment from "./BlockAlignment";
import BlockStyle from "./BlockStyle";

export default interface BaseBlockInterface {
	id?: string,
	alignment?: BlockAlignment,
	style?: BlockStyle,
	children?: React.ReactNode,
	className?: string,
}