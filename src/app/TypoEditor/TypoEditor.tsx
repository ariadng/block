import React, { useEffect, useRef, useState } from "react";
import "./TypoEditor.scss";
import TypoUtils from "./TypoUtils";

interface Props {
	value: string,
	onUpdate: (value: string) => void,
}

export default function TypoEditor ({
	value, onUpdate
}: Props) {

	// Content Data

	const [ markdown, setMarkdown ] = useState<string>(value);
	const [ html, setHtml ] = useState<string>(TypoUtils.markdownToHTML(value));

	// Markdown Editing

	const handleMarkdownChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		event.preventDefault();
		const markdown = event.target.value;
		setMarkdown(markdown);
	}

	useEffect(() => {
		if (markdown !== value) {
			if (onUpdate) onUpdate(markdown);
			setHtml(TypoUtils.markdownToHTML(markdown));
		}
	}, [markdown]);

	return (
		<div className="TypoEditor">

			{/* Toolbar */}
			<div className="Toolbar">
				<div className="Title">Toolbar</div>
				<div className="Actions">Actions</div>
			</div>

			{/* Editor */}
			<div className="Editors">
				{/* Markdown */}
				<div className="Editor MarkdownEditor">
					<div className="EditorToolbar">
						<div className="EditorName">Markdown</div>
					</div>
					<textarea className="ContentEditor" value={markdown} onChange={handleMarkdownChange} />
				</div>
				
				{/* HTML */}
				<div className="Editor HTMLPreview">
					<div className="EditorToolbar">
						<div className="EditorName">Preview</div>
					</div>
					<div className="ContentEditor" dangerouslySetInnerHTML={{__html: html}}></div>
				</div>
			</div>
		
		</div>
	);
}