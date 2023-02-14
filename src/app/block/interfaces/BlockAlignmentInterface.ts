export default interface BlockAlignmentInterface {
	layout: "Horizontal" | "Vertical" | "Grid" | "Default",
	mainAxis: "Start" | "Center" | "End" | "Stretch" | "Default" | "Spaced",
	crossAxis: "Start" | "Center" | "End" | "Stretch" | "Default",
	gap: number,
}

export const BlockAlignmentInterfaceDefault: BlockAlignmentInterface = {
	layout: "Default",
	mainAxis: "Default",
	crossAxis: "Default",
	gap: 0,
}