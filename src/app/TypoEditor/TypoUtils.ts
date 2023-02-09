import Showdown from "showdown";
import sanitizeHtml from "sanitize-html";

const converter = new Showdown.Converter();

export default class TypoUtils {

	public static markdownToHTML (input: string): string {
		const htmlString = converter.makeHtml(input);
		return htmlString;
	}

	public static htmlToMarkdown (input: string): string {
		const markdownString = converter.makeMarkdown(input);
		return markdownString;
	}

	public static sanitizeHTML (input: string): string {
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
		const sanitizedHtml = sanitizeHtml(input, sanitizeConf);
		return sanitizedHtml;
	}

	public static getSelection (): Selection | null {
		if (window && window.getSelection) {
			return window.getSelection();
		} else if (document && document.getSelection) {
			return document.getSelection();
		} else if (document && (document as any).selection) {
			return (document as any).selection.createRange().text;
		}
		return null;
	}

	public static setSelection (range: Range) {
		if (window && window.getSelection) {
			window.getSelection()?.removeAllRanges();
    		window.getSelection()?.addRange(range);
		} else if (document && document.getSelection) {
			document.getSelection()?.removeAllRanges();
    		document.getSelection()?.addRange(range);
		} else if (document && (document as any).selection) {
			(document as any).getSelection()?.removeAllRanges();
    		(document as any).getSelection()?.addRange(range);
		}
		return null;
	}

	public static getSelectionPosition () {
		const selection = this.getSelection();
		if (!selection) return null;

		const range = selection.getRangeAt(0);
		const bounds = range.getBoundingClientRect();

		const top = bounds.top;
		const left = bounds.left;
		const width = bounds.width;
		const height = bounds.height;
	}

	public static insertElementAfterCursor (element: HTMLElement) {
		const selection = this.getSelection();
		if (!selection) return;

		const anchorNode = selection.anchorNode;
		if (!anchorNode) return;

		const container = (anchorNode.nodeType !== Node.TEXT_NODE && anchorNode.nodeType !== Node.COMMENT_NODE) ? anchorNode as HTMLElement : anchorNode.parentElement;
		if (!container) return;

		if (container.classList.contains("ContentEditor")) {
			const parent = container;
			parent.appendChild(element);
			return;
		}

		const parent = container.parentElement;
		if (!parent) return;
		
		parent.insertBefore(element, container.nextSibling);
		
		let range = new Range();
		
		if (!element.firstChild) return;
		range.setStart(element.firstChild, 0);
		range.setEnd(element.firstChild, 0);

		TypoUtils.setSelection(range);
	}

}