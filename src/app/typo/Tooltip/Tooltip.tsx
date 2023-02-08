import React, { RefObject, useEffect, useRef } from "react";
import "./Tooltip.scss";

interface Props {
	setRef?: (ref: RefObject<HTMLDivElement>) => void,
	top?: number,
	left?: number,
	visible?: boolean,
}

export function Tooltip ({
	setRef,
	top,
	left,
	visible,
}: Props) {

	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (tooltipRef.current !== null) {
			if (setRef) setRef(tooltipRef);
		}
	}, [tooltipRef])

	return (
		<div ref={tooltipRef} className={`Tooltip ${visible ? 'Visible' : 'Invisible'}`} style={{
			top: top ? top + "px" : 0,
			left: left ? left + "px" : 0,
		}}>
			Tooltip
		</div>
	);
}