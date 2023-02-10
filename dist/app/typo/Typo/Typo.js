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
exports.Typo = void 0;
const react_1 = __importStar(require("react"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const Tooltip_1 = require("../Tooltip/Tooltip");
const turndown_1 = __importDefault(require("turndown"));
const showdown_1 = __importDefault(require("showdown"));
require("./Typo.scss");
function Typo({ value, onChange }) {
    const turndownService = new turndown_1.default();
    const converter = new showdown_1.default.Converter();
    const defaultValue = (0, react_1.useRef)(value);
    const editorElement = (0, react_1.useRef)(null);
    const caretPos = (0, react_1.useRef)(null);
    const caretRange = (0, react_1.useRef)(null);
    const [markdown, setMarkdown] = (0, react_1.useState)(value);
    const [html, setHtml] = (0, react_1.useState)(converter.makeHtml(value));
    const [tooltipElement, setTooltipElement] = (0, react_1.useState)(null);
    const [tooltipPos, setTooltipPos] = (0, react_1.useState)({ top: 0, left: 0 });
    const [tooltipVisible, setTooltipVisible] = (0, react_1.useState)(false);
    const getCaret = (el) => {
        let caretAt = 0;
        const sel = window.getSelection();
        if (sel && sel.rangeCount == 0) {
            return caretAt;
        }
        if (!sel)
            return 0;
        const range = sel.getRangeAt(0);
        const preRange = range.cloneRange();
        preRange.selectNodeContents(el);
        preRange.setEnd(range.endContainer, range.endOffset);
        caretAt = preRange.toString().length;
        return caretAt;
    };
    const setCaret = (range, offset) => {
        let sel = window.getSelection();
        if (!sel)
            return;
        sel.removeAllRanges();
        sel.addRange(range);
    };
    const sanitize = (input) => {
        const sanitizeConf = {
            allowedTags: ["b", "i", "a", "p", "h2", "h3"],
            allowedAttributes: {
                p: ["class", "data-id"],
                a: ["class", "href"]
            },
            transformTags: {
                'div': 'p',
            },
        };
        let sanitizedHtml = (0, sanitize_html_1.default)(input, sanitizeConf);
        setHtml(sanitizedHtml);
        setMarkdown(converter.makeMarkdown(sanitizedHtml));
    };
    const handleOnBlur = (event) => {
        sanitize(event.currentTarget.innerHTML);
    };
    const handleOnInput = (event) => {
        caretPos.current = getCaret(editorElement.current);
        const selection = window.getSelection();
        if (selection)
            caretRange.current = selection?.getRangeAt(0);
        sanitize(event.currentTarget.innerHTML);
    };
    const handleOnClick = (event) => {
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
                const left = bounds.left - parent.left + (width / 2) - (tooltip.width / 2);
                setTooltipPos({ top, left });
                setTooltipVisible(true);
            }
            else {
                setTooltipVisible(false);
            }
        }
        else {
            setTooltipVisible(false);
        }
    };
    (0, react_1.useEffect)(() => {
    }, [value]);
    (0, react_1.useEffect)(() => {
        if (editorElement.current && caretRange.current) {
            setCaret(caretRange.current, caretPos.current);
            editorElement.current.focus();
        }
        if (onChange)
            onChange(html);
    }, [html]);
    return (react_1.default.createElement("div", { className: "Typo" },
        react_1.default.createElement("div", { ref: editorElement, className: "TypoEditor", contentEditable: true, suppressContentEditableWarning: true, dangerouslySetInnerHTML: { __html: html }, onBlur: handleOnBlur, onInput: handleOnInput, onClick: handleOnClick }),
        react_1.default.createElement("div", { className: "TypoMarkdown" },
            react_1.default.createElement("pre", null, markdown)),
        react_1.default.createElement("div", { className: "TypoHTML" },
            react_1.default.createElement("pre", null, html)),
        react_1.default.createElement(Tooltip_1.Tooltip, { setRef: (ref) => { setTooltipElement(ref); }, top: tooltipPos.top, left: tooltipPos.left, visible: tooltipVisible })));
}
exports.Typo = Typo;
