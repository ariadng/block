export default interface BlockBackgroundInterface {
	type: "solid" | "linear" | "radial" | "image",
	// Type: Solid
	color?: "string",
	// Type: Image
	imageUrl?: "string",
	imageSize?: "cover" | "contain" | {
		width?: number,
		height?: number,
	},
	position?: {
		x?: number,
		y?: number,
	},
	// Type: Gradient (linear, radial)
	gradientAngle?: number,
	gradientStops?: {
		position: number,
		color: string,
		opacity?: number,
	}[],
}