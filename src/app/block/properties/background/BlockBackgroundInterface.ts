export default interface BlockBackgroundInterface {
	type: "solid" | "linear" | "radial" | "image",
	// Type: Solid
	fillColor?: "string",
	// Type: Image
	imageUrl?: "string",
	imageSize?: "cover" | {
		width?: string | number,
		height?: string | number,
	}
}