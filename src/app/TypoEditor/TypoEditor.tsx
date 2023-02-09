import React, { useEffect, useRef, useState } from "react";
import "./TypoEditor.scss";
import TypoInsert from "./TypoInsert";
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
	const [ rawHtml, setRawHtml ] = useState<string>((value !== "") ? TypoUtils.markdownToHTML(value) : "<p></p>");
	const [ html, setHtml ] = useState<string>(TypoUtils.markdownToHTML(value));

	const htmlContentEditorRef = useRef<HTMLDivElement>(null);

	// Insert Tool
	const [ showInsert, setShowInsert ] = useState<boolean>(false);
	const [ insertPosition, setInsertPosition ] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

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
			const newElement = document.createElement("p");
			newElement.appendChild(document.createTextNode(""));
			TypoUtils.insertElementAfterCursor(newElement);
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

	const handleDocumentSelectionChange = (event: Event) => {
		if (htmlContentEditorRef.current) {
			const element = TypoUtils.getSelectionParentElement();
			const parent = htmlContentEditorRef.current.parentElement;
			console.log(TypoUtils.isSelectionEmptyParagraph(), TypoUtils.getSelectionParentElement()?.innerText)
			if (parent && htmlContentEditorRef.current.contains(element) && TypoUtils.isSelectionEmptyParagraph()) {
				const pos = TypoUtils.getSelectionRelativePosition(parent);
				if (pos) {
					setShowInsert(true);
					setInsertPosition({
						top: pos.top,
						left: pos.left,
					});
				}
			} else {
				setShowInsert(false);
			}
		}
	};

	// Add event listeners
	useEffect(() => {
		document.addEventListener("selectionchange", handleDocumentSelectionChange);
		return () => {
			document.removeEventListener("selectionchange", handleDocumentSelectionChange);
		}
	}, []);

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
					<TypoInsert show={showInsert} position={insertPosition} />
					<div ref={htmlContentEditorRef} className="ContentEditor" dangerouslySetInnerHTML={{__html: rawHtml}} contentEditable={editorOptions.input === "html"} suppressContentEditableWarning={true} onInput={handleHTMLChange} onKeyDown={handleHTMLKeyDown}></div>
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