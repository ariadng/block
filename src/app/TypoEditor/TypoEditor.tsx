import React, { useEffect, useRef, useState } from "react";
import "./TypoEditor.scss";
import { TypoOptions, TypoOptionsDefault } from "./TypoOptions";
import TypoUtils from "./TypoUtils";

interface Props {
	value: string,
	onUpdate: (value: string) => void,
	options?: TypoOptions,
}

export default function TypoEditor ({
	value, onUpdate, options
}: Props) {

	// Editor Config

	const editorOptions: TypoOptions = options ? { ...TypoOptionsDefault, ...options } : TypoOptionsDefault;

	// Content Data

	const [ markdown, setMarkdown ] = useState<string>(value);
	const [ rawHtml, setRawHtml ] = useState<string>(TypoUtils.markdownToHTML(value));
	const [ html, setHtml ] = useState<string>(TypoUtils.markdownToHTML(value));

	// Markdown Editing

	const handleMarkdownChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		event.preventDefault();
		if (editorOptions.input === "markdown") {
			const markdown = event.target.value;
			setMarkdown(markdown);
		}
	}

	useEffect(() => {
		if (markdown !== value) {
			if (onUpdate) onUpdate(markdown);
			setHtml(TypoUtils.markdownToHTML(markdown));
			if (editorOptions.input === "markdown") {
				setRawHtml(TypoUtils.markdownToHTML(markdown));
			}
		}
	}, [markdown]);

	// HTML Editing

	const handleHTMLKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			const selection = TypoUtils.getSelection();
			if (!selection) return;

			const anchorNode = selection.anchorNode;
			if (!anchorNode) return;

			const container = (anchorNode.nodeType !== Node.TEXT_NODE && anchorNode.nodeType !== Node.COMMENT_NODE) ? anchorNode as HTMLElement : anchorNode.parentElement;
			if (!container) return;

			const newElement = document.createElement("p");
			newElement.appendChild(document.createTextNode(""));

			if (container.classList.contains("ContentEditor")) {
				return;
			}
			
			const parent = container.parentElement;
			if (!parent) return;
			
			parent.insertBefore(newElement, container.nextSibling);
			
			let range = new Range();
			
			if (!newElement.firstChild) return;
			range.setStart(newElement.firstChild, 0);
			range.setEnd(newElement.firstChild, 0);

			TypoUtils.setSelection(range);

			// console.log(selection)
		}
	}

	const handleHTMLChange: React.FormEventHandler<HTMLDivElement> = (event) => {
		if (editorOptions.input === "html") {
			const unsanitizedHtml = event.currentTarget.innerHTML;
			const sanitizedHtml = TypoUtils.sanitizeHTML(unsanitizedHtml);
			const markdownString = TypoUtils.htmlToMarkdown(sanitizedHtml);
			setMarkdown(markdownString);
		}
	};

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
				
				{/* HTML Editor */}
				<div className="Editor HTMLPreview">
					<div className="EditorToolbar">
						<div className="EditorName">HTML</div>
					</div>
					<div className="ContentEditor" dangerouslySetInnerHTML={{__html: rawHtml}} contentEditable={editorOptions.input === "html"} suppressContentEditableWarning={true} onInput={handleHTMLChange} onKeyDown={handleHTMLKeyDown}></div>
				</div>

				{/* HTML Preview */}
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