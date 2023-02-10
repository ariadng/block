import { useMatch } from "@tanstack/react-location";
import React from "react";
import PageEditor from "../../components/PageEditor/PageEditor";
import "./page.view.scss"

export default function PageViewer () {

	const { params: {pageId} } = useMatch();

	return (
		<div className="PageViewer">
			<PageEditor pageId={pageId} />
		</div>
	)

}