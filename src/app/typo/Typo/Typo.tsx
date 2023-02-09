import React, { RefObject, useEffect, useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Tooltip } from "../Tooltip/Tooltip";
import { v4 as uuid } from "uuid";
import TurndownService from 'turndown';
import Showdown from "showdown";
import "./Typo.scss";

interface Props {
	value: string,
	onChange?: Function,
}

export function Typo ({ value, onChange }: Props) {

	const turndownService = new TurndownService();
	const converter = new Showdown.Converter();

	const defaultValue = useRef(value);
	const editorElement = useRef<HTMLDivElement>(null);
	const caretPos = useRef<any>(null);
	const caretRange = useRef<Range|null>(null);
	
	const [ markdown, setMarkdown ] = useState<any>(value);
	const [ html, setHtml ] = useState<string>(converter.makeHtml(value));

	const [ tooltipElement, setTooltipElement ] = useState<RefObject<HTMLDivElement>|null>(null);

	const [ tooltipPos, setTooltipPos ] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
	const [ tooltipVisible, setTooltipVisible ] = useState<boolean>(false);

	const getCaret = (el: any) => {
		let caretAt = 0;
		const sel = window.getSelection();
		
		if (sel && sel.rangeCount == 0 ) { return caretAt; }
		if (!sel) return 0;

		const range = sel.getRangeAt(0);    
		const preRange = range.cloneRange();
		preRange.selectNodeContents(el);
		preRange.setEnd(range.endContainer, range.endOffset);
		caretAt = preRange.toString().length;

		return caretAt;   
	}

	const setCaret = (range: Range, offset: any) => {
		let sel = window.getSelection();
		if (!sel) return;
		sel.removeAllRanges();
		sel.addRange(range);
	}

	const sanitize = (input: string) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p", "h2", "h3"],
			allowedAttributes: {
				p: [ "class", "data-id" ],
				a: [ "class", "href" ]
			},
			transformTags: {
				'div': 'p',
			},
		};
		let sanitizedHtml = sanitizeHtml(input, sanitizeConf);
		setHtml(sanitizedHtml);
		setMarkdown(converter.makeMarkdown(sanitizedHtml));

	};

	const handleOnBlur: React.FocusEventHandler<HTMLDivElement> = (event) => {
		sanitize(event.currentTarget.innerHTML);
	};

	const handleOnInput: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
		caretPos.current = getCaret(editorElement.current);
		const selection = window.getSelection();
		if (selection) caretRange.current = selection?.getRangeAt(0);
		sanitize(event.currentTarget.innerHTML);
	};

	const handleOnClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
		const selection = window.getSelection();
		setTooltipVisible(false);
		if (selection && editorElement.current && tooltipElement && tooltipElement.current) {
			const start = Math.min(selection.anchorOffset, selection.focusOffset);
			const end = Math.max(selection.anchorOffset, selection.focusOffset);
			if (start < end) {
				const range = selection.getRangeAt(0);
				const bounds = range.getBoundingClientRect();
				const parent = editorElement.current.getBoundingClientRect();
				const tooltip = tooltipElement.current.getBoundingClientRect();
				const width = bounds.width;
				const height = bounds.height;
				const top = bounds.top - parent.top - tooltip.height - 16;
				const left = bounds.left - parent.left + (width/2) - (tooltip.width/2);
				setTooltipPos({top, left});
				setTooltipVisible(true);
			} else {
				setTooltipVisible(false);
			}
		} else {
			setTooltipVisible(false);
		}
	};

	useEffect(() => {
	}, [value])

	useEffect(() => {
		if (editorElement.current && caretRange.current) {
			setCaret(caretRange.current, caretPos.current);
    		editorElement.current.focus();
		}
		if (onChange) onChange(html);
	}, [html])

	return (
		<div className="Typo">
			{/* { (value === "") && <div className="Placeholder">Type something...</div> } */}
			<div
				ref={editorElement}
				className="TypoEditor"
				contentEditable
				suppressContentEditableWarning
				dangerouslySetInnerHTML={{__html: html}}
				onBlur={handleOnBlur}
				onInput={handleOnInput}
				onClick={handleOnClick}
			></div>
			<div className="TypoMarkdown">
				<pre>{markdown}</pre>
			</div>
			<div className="TypoHTML">
				<pre>{html}</pre>
			</div>
			<Tooltip setRef={(ref) => { setTooltipElement(ref)}} top={tooltipPos.top} left={tooltipPos.left} visible={tooltipVisible} />
		</div>
	);

}