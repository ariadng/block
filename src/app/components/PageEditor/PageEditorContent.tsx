import React from "react";
import Block from "../../block/Block";
import "./PageEditorContent.scss";

interface Props {
	content: Block | null;
}

export default function PageEditorContent ({
	content,
}: Props) {

	return (
		<div className="PageEditorContent">
			{content && content.toReactComponent()}		
		</div>
	);

}