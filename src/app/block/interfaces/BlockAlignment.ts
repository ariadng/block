import BlockAlignmentInterface, { BlockAlignmentInterfaceDefault } from "./BlockAlignmentInterface";

export default interface BlockAlignment {
	default: BlockAlignmentInterface,
	mobile: BlockAlignmentInterface | {},
	tablet: BlockAlignmentInterface | {},
	desktop: BlockAlignmentInterface | {},
	ultrawide: BlockAlignmentInterface | {},
}

export const BlockAlignmentDefault: BlockAlignment = {
	default: BlockAlignmentInterfaceDefault,
	mobile: {},
	tablet: {},
	desktop: {},
	ultrawide: {},
}