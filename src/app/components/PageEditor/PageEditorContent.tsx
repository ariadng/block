import React, { useState } from "react";
import Block from "../../block/Block";
import BlockViewer from "../../block/BlockViewer";
import "./PageEditorContent.scss";

interface Props {
	content: Block | null;
}

export default function PageEditorContent ({
	content,
}: Props) {

	const [ editMode, setEditMode ] = useState<boolean>(true);

	return (
		<div className="PageEditorContent">
			{content && (
				<BlockViewer block={content} editMode={editMode} />
			)}		
		</div>
	);

}