import React, { useEffect, useRef, useState } from "react";
import Block from "../../block/Block";
import SecuredAPI from "../../utils/SecuredAPI";
import "./PageEditor.scss"
import PageEditorContent from "./PageEditorContent";
import PageEditorToolbar from "./PageEditorToolbar";

interface Props {
	pageId: string | number,
}

export default function PageEditor ({
	pageId,
}: Props) {

	const [ page, setPage ] = useState<any | null>(null);
	const [ content, setContent ] = useState<Block | null>(null);

	const loadPage = async () => {
		const response = await SecuredAPI.get("page/" + pageId);
		if (response.status === 200) {
			setPage(response.data);
			setContent(new Block(response.data.content));
		}
	};

	useEffect(() => {
		loadPage();
	}, []);

	return (
		<div className="PageEditor Full">

			<PageEditorToolbar />
			<PageEditorContent content={content} />
			
		</div>
	)

}