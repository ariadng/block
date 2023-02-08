import React, { RefObject, useEffect, useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Tooltip } from "../Tooltip/Tooltip";
import "./Typo.scss";

interface Props {
	value: string,
	onChange?: Function,
}

export function Typo ({ value, onChange }: Props) {

	const defaultValue = useRef(value);
	const editorElement = useRef<HTMLDivElement>(null);
	
	const [ html, setHtml ] = useState<string>("");
	const [ content, setContent ] = useState<any>({});
	const [ tooltipElement, setTooltipElement ] = useState<RefObject<HTMLDivElement>|null>(null);

	const [ tooltipPos, setTooltipPos ] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
	const [ tooltipVisible, setTooltipVisible ] = useState<boolean>(false);

	const placeholder = `<p class="placeholder">Type something...</p>`;

	const sanitize = (input: string) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: {
				p: [ "class" ],
				a: [ "class", "href" ]
			},
			transformTags: {
				'div': 'p',
			}
		};
		let sanitizedHtml = sanitizeHtml(input, sanitizeConf);
		setHtml(sanitizedHtml);
	};

	const handleOnBlur: React.FocusEventHandler<HTMLDivElement> = (event) => {
		sanitize(event.currentTarget.innerHTML);
	};

	const handleOnInput: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
		sanitize(event.currentTarget.innerHTML);
	};

	const handleOnClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
		const selection = window.getSelection();
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
		if (onChange) onChange(html);
	}, [html])

	return (
		<div className="Typo">
			{ (defaultValue.current === "") && <div className="Placeholder">Type something...</div> }
			<div
				ref={editorElement}
				className="TypoEditor"
				contentEditable
				suppressContentEditableWarning
				dangerouslySetInnerHTML={{__html: defaultValue.current}}
				onBlur={handleOnBlur}
				onInput={handleOnInput}
				onClick={handleOnClick}
			></div>
			<Tooltip setRef={(ref) => { setTooltipElement(ref)}} top={tooltipPos.top} left={tooltipPos.left} visible={tooltipVisible} />
		</div>
	);

}