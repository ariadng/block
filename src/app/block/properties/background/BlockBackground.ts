import { CSSProperties } from "react";
import Color from "color";
import BlockBackgroundInterface from "./BlockBackgroundInterface";

export default class BlockBackground {

	public static convertToStyle(backgrounds: BlockBackgroundInterface[]): CSSProperties {
		let style: CSSProperties = {};
		
		let images: string[] = [];
		let sizes: string[] = [];
		let repeats: string[] = [];
		let positions: string[] = [];

		for (let background of backgrounds) {
			// Type: Solid
			if (background.type === "solid") {
				const color = background.color ? background.color : "transparent";
				const image = `linear-gradient(0deg, ${color}, ${color})`;
				const size = `cover`;
				const repeat = `no-repeat`;
				images.push(image);
				sizes.push(size);
				repeats.push(repeat);
				positions.push(`0px 0px`);
			}
			// Type: Image
			else if (background.type === "image") {
				const imageUrl = background.imageUrl ? background.imageUrl : `/images/transparent.svg`;
				const repeat = background.imageUrl ? `no-repeat` : `repeat`;
				
				let size = background.imageUrl ? `contain` : `24px 24px`;
				if (background.imageSize) {
					if (typeof background.imageSize === "string") size = background.imageSize;
					else {
						const width = background.imageSize.width ? background.imageSize.width + 'px' : 'auto';
						const height = background.imageSize.height ? background.imageSize.height + 'px' : 'auto';
						size = `${width} ${height}`;
					}
				}

				let position = `0px 0px`;
				if (typeof background.position !== "undefined") {
					const horizontal = background.position.x ? background.position.x : 0;
					const vertical = background.position.y ? background.position.y : 0;
					position = `${horizontal}px ${vertical}px`;
				}
				
				const image = `url(${imageUrl})`;
				images.push(image);
				sizes.push(size);
				repeats.push(repeat);
				positions.push(position);
			}
			// Type: Linear Gradient
			else if (background.type === "linear") {
				const angle = background.gradientAngle ? background.gradientAngle : 180;
				const stops = background.gradientStops ? background.gradientStops : [];
				const size = `cover`;
				const repeat = `no-repeat`;

				const gradientStops = stops.length > 0 ? stops.map(stop => (
					`${Color(stop.color).alpha(typeof stop.opacity !== "undefined" ? stop.opacity : 1)} ${stop.position ? stop.position * 100 + '%' : ''}`
				)) : [`transparent`, `transparent`];
				
				const image = `linear-gradient(${angle}deg, ${gradientStops.join(', ')})`;

				images.push(image);
				sizes.push(size);
				repeats.push(repeat);
				positions.push(`0px 0px`);
			}
		}

		// Combine the backgrounds.
		style.backgroundImage = images.join(', ');
		style.backgroundSize = sizes.join(', ');
		style.backgroundRepeat = repeats.join(', ');
		style.backgroundPosition = positions.join(', ');

		return style;
	}

}