import BlockText from "@/block/interfaces/BlockText";
import ViewProps from "../View/ViewProps";

export default interface TextViewProps extends ViewProps {
	text: BlockText,
}