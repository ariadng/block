import { RefObject, useEffect, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import BlockView from "../interfaces/BlockView";

export default function useView (parent: RefObject<HTMLElement> | null) {

	const [ view, setView ] = useState<BlockView>(BlockView.Default);
	const [ viewportWidth, setViewportWidth ] = useState<number | null>(null);

	// Adjust view value when viewportWidth is changed.
	useEffect(() => {
		if 		(viewportWidth === null)	setView(BlockView.Default);
		else if	(viewportWidth <= 480)		setView(BlockView.Mobile);
		else if (viewportWidth <= 768) 		setView(BlockView.Tablet);
		else if (viewportWidth <= 1440) 	setView(BlockView.Desktop);
		else if (viewportWidth > 1440) 		setView(BlockView.Ultrawide);
	}, [viewportWidth]);

	// Detect parent's dimension change.
	useResizeObserver(parent, (entry) => setViewportWidth(entry.contentRect.width));

	return view;

}