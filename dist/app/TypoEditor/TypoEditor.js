"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./TypoEditor.scss");
const TypoInsert_1 = __importDefault(require("./TypoInsert"));
const TypoOptions_1 = require("./TypoOptions");
const TypoUtils_1 = __importDefault(require("./TypoUtils"));
function TypoEditor({ value, onUpdate, options }) {
    // Editor Config
    const editorOptions = options ? { ...TypoOptions_1.TypoOptionsDefault, ...options } : TypoOptions_1.TypoOptionsDefault;
    // Content Data
    const [markdown, setMarkdown] = (0, react_1.useState)(value);
    const [rawHtml, setRawHtml] = (0, react_1.useState)((value !== "") ? TypoUtils_1.default.markdownToHTML(value) : "<p></p>");
    const [html, setHtml] = (0, react_1.useState)(TypoUtils_1.default.markdownToHTML(value));
    const htmlContentEditorRef = (0, react_1.useRef)(null);
    const htmlContentEditorScroll = (0, react_1.useRef)(0);
    const htmlContentEditorScrollPercentage = (0, react_1.useRef)(0);
    const markdownContentEditorRef = (0, react_1.useRef)(null);
    const htmlContentPreviewRef = (0, react_1.useRef)(null);
    // Insert Tool
    const [showInsert, setShowInsert] = (0, react_1.useState)(false);
    const [insertPosition, setInsertPosition] = (0, react_1.useState)({ top: 0, left: 0 });
    // Markdown Editing
    const handleMarkdownChange = (event) => {
        event.preventDefault();
        if (editorOptions.input === "markdown") {
            const markdown = event.target.value;
            setMarkdown(markdown);
        }
    };
    (0, react_1.useEffect)(() => {
        if (markdown !== value) {
            if (onUpdate)
                onUpdate(markdown);
            setHtml(TypoUtils_1.default.markdownToHTML(markdown));
            if (editorOptions.input === "markdown") {
                setRawHtml(TypoUtils_1.default.markdownToHTML(markdown));
            }
        }
    }, [markdown]);
    // HTML Editing
    const handleHTMLKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            const newElement = document.createElement("p");
            newElement.appendChild(document.createTextNode(""));
            TypoUtils_1.default.insertElementAfterCursor(newElement);
        }
    };
    const handleHTMLScroll = (event) => {
        if (htmlContentEditorRef.current !== null) {
            const scrollTop = htmlContentEditorRef.current.scrollTop - htmlContentEditorScroll.current;
            htmlContentEditorScroll.current = htmlContentEditorRef.current.scrollTop;
            setInsertPosition({
                top: insertPosition.top - scrollTop,
                left: insertPosition.left,
            });
            const htmlEditorContentHeight = htmlContentEditorRef.current.scrollHeight;
            const htmlEditorScrollPercentage = htmlContentEditorRef.current.scrollTop / htmlEditorContentHeight;
            htmlContentEditorScrollPercentage.current = htmlEditorScrollPercentage;
        }
    };
    const updateHTML = (input) => {
        if (input) {
            const sanitizedHtml = TypoUtils_1.default.sanitizeHTML(input);
            const markdownString = TypoUtils_1.default.htmlToMarkdown(sanitizedHtml);
            setMarkdown(markdownString);
        }
        else {
            if (!htmlContentEditorRef.current)
                return;
            const sanitizedHtml = TypoUtils_1.default.sanitizeHTML(htmlContentEditorRef.current.innerHTML);
            const markdownString = TypoUtils_1.default.htmlToMarkdown(sanitizedHtml);
            setMarkdown(markdownString);
        }
    };
    const handleHTMLChange = (event) => {
        if (editorOptions.input === "html") {
            const unsanitizedHtml = event.currentTarget.innerHTML;
            updateHTML(unsanitizedHtml);
        }
    };
    const handleDocumentSelectionChange = (event) => {
        TypoUtils_1.default.setSelectionToEnd();
        if (htmlContentEditorRef.current) {
            const element = TypoUtils_1.default.getSelectionParentElement();
            const parent = htmlContentEditorRef.current.parentElement;
            if (parent && htmlContentEditorRef.current.contains(element) && TypoUtils_1.default.isSelectionEmptyParagraph()) {
                const pos = TypoUtils_1.default.getSelectionRelativePosition(parent);
                if (pos) {
                    setShowInsert(true);
                    setInsertPosition({
                        top: pos.top,
                        left: pos.left,
                    });
                }
            }
            else {
                setShowInsert(false);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (htmlContentPreviewRef.current !== null) {
            const height = htmlContentPreviewRef.current.scrollHeight;
            htmlContentPreviewRef.current.scrollTo({
                top: height * htmlContentEditorScrollPercentage.current,
            });
        }
        if (markdownContentEditorRef.current !== null) {
            const height = markdownContentEditorRef.current.scrollHeight;
            markdownContentEditorRef.current.scrollTo({
                top: height * htmlContentEditorScrollPercentage.current,
            });
        }
    }, [htmlContentEditorScrollPercentage.current]);
    (0, react_1.useEffect)(() => {
        if (value !== markdown) {
            setRawHtml(TypoUtils_1.default.markdownToHTML(value));
            setMarkdown(value);
        }
    }, [value]);
    // Add event listeners
    (0, react_1.useEffect)(() => {
        document.addEventListener("selectionchange", handleDocumentSelectionChange);
        return () => {
            document.removeEventListener("selectionchange", handleDocumentSelectionChange);
        };
    }, []);
    return (react_1.default.createElement("div", { className: "TypoEditor" },
        editorOptions.showToolbar && react_1.default.createElement("div", { className: "Toolbar" },
            react_1.default.createElement("div", { className: "Title" }, "Toolbar"),
            react_1.default.createElement("div", { className: "Actions" },
                react_1.default.createElement("button", { onClick: () => { TypoUtils_1.default.setSelectionToEnd(); } }, "Select"))),
        react_1.default.createElement("div", { className: "Editors" },
            (editorOptions.input == "markdown" || editorOptions.showOtherInput) && react_1.default.createElement("div", { className: "Editor MarkdownEditor" },
                editorOptions.showEditorToolbar && react_1.default.createElement("div", { className: "EditorToolbar" },
                    react_1.default.createElement("div", { className: "EditorName" }, "Markdown")),
                react_1.default.createElement("textarea", { ref: markdownContentEditorRef, className: "ContentEditor", value: markdown, onChange: handleMarkdownChange })),
            (editorOptions.input == "html" || editorOptions.showOtherInput) && react_1.default.createElement("div", { className: "Editor HTMLPreview" },
                editorOptions.showEditorToolbar && react_1.default.createElement("div", { className: "EditorToolbar" },
                    react_1.default.createElement("div", { className: "EditorName" }, "HTML")),
                react_1.default.createElement(TypoInsert_1.default, { show: showInsert, position: insertPosition, onUpdate: () => { updateHTML(); } }),
                react_1.default.createElement("div", { ref: htmlContentEditorRef, className: "ContentEditor", dangerouslySetInnerHTML: { __html: rawHtml }, contentEditable: editorOptions.input === "html", suppressContentEditableWarning: true, onInput: handleHTMLChange, onKeyDown: handleHTMLKeyDown, onScroll: handleHTMLScroll })),
            editorOptions.showPreview && react_1.default.createElement("div", { className: "Editor HTMLPreview" },
                editorOptions.showEditorToolbar && react_1.default.createElement("div", { className: "EditorToolbar" },
                    react_1.default.createElement("div", { className: "EditorName" }, "Preview")),
                react_1.default.createElement("div", { ref: htmlContentPreviewRef, className: "ContentEditor", dangerouslySetInnerHTML: { __html: html } })))));
}
exports.default = TypoEditor;
