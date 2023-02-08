import React, { useEffect, useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";
import "./Typo.style.scss";

interface Props {
	value: string,
	onChange?: Function,
}

export function Typo ({ value, onChange }: Props) {

	const defaultValue = useRef(value);

	const [ html, setHtml ] = useState<string>("");
	const [ content, setContent ] = useState<any>({});

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

	useEffect(() => {
		if (onChange) onChange(html);
	}, [html])

	return (
		<div className="Typo">
			{html}
			{ (defaultValue.current === "") && <div className="Placeholder">Type something...</div> }
			<div
				className="TypoEditor"
				contentEditable
				suppressContentEditableWarning
				dangerouslySetInnerHTML={{__html: defaultValue.current}}
				onBlur={handleOnBlur}
				onInput={handleOnInput}
			></div>
		</div>
	);

}