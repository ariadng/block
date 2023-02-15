import React, { useState } from "react";
import Block from "../Block";
import BlockViewer from "../BlockViewer";
import "./ComponentEditorContent.scss";

interface Props {
	content: Block | null;
}

export default function ComponentEditorContent ({
	content,
}: Props) {

	const [ editMode, setEditMode ] = useState<boolean>(true);

	return (
		<div className="ComponentEditorContent">
			{content && (
				<BlockViewer block={content} editMode={editMode} />
			)}		
		</div>
	);

}