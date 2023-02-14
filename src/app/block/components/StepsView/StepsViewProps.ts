import BlockText from "../../interfaces/BlockText";
import ViewProps from "../View/ViewProps";

export default interface StepsViewProps extends ViewProps {
	steps?: {
		image?: string,
		text: BlockText
	}[],
}