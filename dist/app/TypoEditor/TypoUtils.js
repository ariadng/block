"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const showdown_1 = __importDefault(require("showdown"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const converter = new showdown_1.default.Converter();
class TypoUtils {
    static markdownToHTML(input) {
        const htmlString = converter.makeHtml(input);
        return htmlString;
    }
    static htmlToMarkdown(input) {
        const markdownString = converter.makeMarkdown(input);
        return markdownString;
    }
    static sanitizeHTML(input) {
        const sanitizeConf = {
            allowedTags: ["b", "i", "a", "p", "h2", "h3", "h4", "h5", "h6", "div", "img", "video", "audio"],
            allowedAttributes: {
                p: ["class", "data-id"],
                a: ["class", "href"],
                img: ["class", "src"],
                video: ["class", "src", "controls"],
                audio: ["class", "src", "controls"],
                div: ["class"],
            },
        };
        const sanitizedHtml = (0, sanitize_html_1.default)(input, sanitizeConf);
        return sanitizedHtml;
    }
    static getSelection() {
        if (window && window.getSelection) {
            return window.getSelection();
        }
        else if (document && document.getSelection) {
            return document.getSelection();
        }
        else if (document && document.selection) {
            return document.selection.createRange().text;
        }
        return null;
    }
    static setSelection(range) {
        if (window && window.getSelection) {
            window.getSelection()?.removeAllRanges();
            window.getSelection()?.addRange(range);
        }
        else if (document && document.getSelection) {
            document.getSelection()?.removeAllRanges();
            document.getSelection()?.addRange(range);
        }
        else if (document && document.selection) {
            document.getSelection()?.removeAllRanges();
            document.getSelection()?.addRange(range);
        }
        return null;
    }
    static getSelectionCursorPosition() {
        const selection = this.getSelection();
        if (!selection)
            return null;
        const range = selection.getRangeAt(0);
        return range;
    }
    static getSelectionPosition() {
        const element = this.getSelectionParentElement();
        if (!element)
            return null;
        const bounds = element.getBoundingClientRect();
        return bounds;
    }
    static getSelectionRelativePosition(reference) {
        const selectionPosition = this.getSelectionPosition();
        if (!selectionPosition)
            return null;
        const refBounds = reference.getBoundingClientRect();
        const top = selectionPosition.top - refBounds.top;
        const left = selectionPosition.left - refBounds.left;
        const width = selectionPosition.width;
        const height = selectionPosition.height;
        return { top, left, width, height };
    }
    static getSelectionElement() {
        const selection = this.getSelection();
        if (!selection)
            return null;
        const anchorNode = selection.anchorNode;
        if (!anchorNode)
            return null;
        return anchorNode;
    }
    static getSelectionParentElement() {
        const anchorNode = this.getSelectionElement();
        if (!anchorNode)
            return null;
        const container = (anchorNode.nodeType !== Node.TEXT_NODE && anchorNode.nodeType !== Node.COMMENT_NODE) ? anchorNode : anchorNode.parentElement;
        if (!container)
            return null;
        return container;
    }
    static setCursorToElement(element) {
        let range = new Range();
        if (!element.firstChild)
            return;
        range.setStart(element.firstChild, 0);
        range.setEnd(element.firstChild, 0);
        TypoUtils.setSelection(range);
    }
    static setSelectionToEnd() {
        const element = this.getSelectionElement();
        if (!element)
            return;
        const parent = this.getSelectionParentElement();
        if (!parent)
            return;
        let range = new Range();
        range.setStart(element, 0);
        range.setEnd(element, parent.childNodes.length);
        console.log(parent);
        console.log(parent.childNodes);
        // console.log(range.cloneContents())
    }
    static insertElementAfterCursor(element) {
        const container = this.getSelectionParentElement();
        if (!container)
            return;
        if (container.classList.contains("ContentEditor")) {
            container.appendChild(element);
            this.setCursorToElement(element);
            return;
        }
        const parent = container.parentElement;
        if (!parent)
            return;
        parent.insertBefore(element, container.nextSibling);
        this.setCursorToElement(element);
    }
    static isSelectionEmptyParagraph() {
        const element = this.getSelectionParentElement();
        if (!element)
            return false;
        if (element.tagName.toLowerCase() !== "p")
            return false;
        if (element.children.length > 1)
            return false;
        if (!element.firstChild)
            return true;
        if (element.innerText.trim() === "")
            return true;
        return false;
    }
}
exports.default = TypoUtils;
