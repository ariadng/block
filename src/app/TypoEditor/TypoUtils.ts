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
			allowedTags: ["b", "i", "a", "p", "h2", "h3", "h4", "h5", "h6", "div", "img"],
			allowedAttributes: {
				p: [ "class", "data-id" ],
				a: [ "class", "href" ],
				img: [ "class", "src" ],
				div: [ "class" ],
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

	public static getSelectionPosition (): null | { top: number, left: number, width: number, height: number } {
		const element = this.getSelectionParentElement();
		if (!element) return null;
		const bounds = element.getBoundingClientRect();
		return bounds;
	}

	public static getSelectionRelativePosition (reference: HTMLElement) : null | { top: number, left: number, width: number, height: number } {
		const selectionPosition = this.getSelectionPosition();
		if (!selectionPosition) return null;
		const refBounds = reference.getBoundingClientRect();
		const top = selectionPosition.top - refBounds.top;
		const left = selectionPosition.left - refBounds.left;
		const width = selectionPosition.width;
		const height = selectionPosition.height;
		return { top, left, width, height };
	}

	public static getSelectionElement () : HTMLElement | null {
		const selection = this.getSelection();
		if (!selection) return null;
		const anchorNode = selection.anchorNode;
		if (!anchorNode) return null;
		return anchorNode as HTMLElement;
	}

	public static getSelectionParentElement () : HTMLElement | null {
		const anchorNode = this.getSelectionElement();
		if (!anchorNode) return null;
		const container = (anchorNode.nodeType !== Node.TEXT_NODE && anchorNode.nodeType !== Node.COMMENT_NODE) ? anchorNode as HTMLElement : anchorNode.parentElement;
		if (!container) return null;
		return container as HTMLElement;
	}

	public static setCursorToElement (element: HTMLElement) {
		let range = new Range();
		if (!element.firstChild) return;
		range.setStart(element.firstChild, 0);
		range.setEnd(element.firstChild, 0);
		TypoUtils.setSelection(range);
	}

	public static insertElementAfterCursor (element: HTMLElement) {
		const container = this.getSelectionParentElement();
		if (!container) return;
		if (container.classList.contains("ContentEditor")) {
			container.appendChild(element);
			return;
		}
		const parent = container.parentElement;
		if (!parent) return;
		parent.insertBefore(element, container.nextSibling);
		this.setCursorToElement(element);
	}

	public static isSelectionEmptyParagraph (): boolean {
		const element = this.getSelectionParentElement();
		if (!element) return false;
		if (element.tagName.toLowerCase() !== "p") return false;
		if (element.children.length > 1) return false;
		if (!element.firstChild) return true;
		if (element.innerText.trim() === "") return true;
		return false;
	}

}