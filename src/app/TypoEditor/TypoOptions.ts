export interface TypoOptions {
	input?: "markdown" | "html",
	showToolbar?: boolean,
	showPreview?: boolean,
	showOtherInput?: boolean,
	showEditorToolbar?: boolean,
}

export const TypoOptionsDefault: TypoOptions = {
	input: "markdown",
	showToolbar: true,
	showPreview: true,
	showOtherInput: true,
	showEditorToolbar: true,
}