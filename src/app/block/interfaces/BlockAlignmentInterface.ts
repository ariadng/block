export default interface BlockAlignmentInterface {
	layout: "Horizontal" | "Vertical" | "Grid",
	mainAxis: "Start" | "Center" | "End" | "Stretch",
	crossAxis: "Start" | "Center" | "End" | "Stretch",
}

export const BlockAlignmentInterfaceDefault: BlockAlignmentInterface = {
	layout: "Vertical",
	mainAxis: "Start",
	crossAxis: "Stretch",
}