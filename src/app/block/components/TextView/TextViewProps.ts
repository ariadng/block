import BlockText from "../../interfaces/BlockText";
import ViewProps from "../View/ViewProps";

export default interface TextViewProps extends ViewProps {
	text: BlockText,
}