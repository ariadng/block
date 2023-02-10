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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const react_1 = __importStar(require("react"));
require("./Tooltip.scss");
function Tooltip({ setRef, top, left, visible, }) {
    const tooltipRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (tooltipRef.current !== null) {
            if (setRef)
                setRef(tooltipRef);
        }
    }, [tooltipRef]);
    return (react_1.default.createElement("div", { ref: tooltipRef, className: `Tooltip ${visible ? 'Visible' : 'Invisible'}`, style: {
            top: top ? top + "px" : 0,
            left: left ? left + "px" : 0,
        } },
        react_1.default.createElement("div", { className: "Group" },
            react_1.default.createElement("button", null,
                react_1.default.createElement("div", { className: "Icon" }, "format_bold")),
            react_1.default.createElement("button", null,
                react_1.default.createElement("div", { className: "Icon" }, "format_italic"))),
        react_1.default.createElement("div", { className: "Group" },
            react_1.default.createElement("button", null,
                react_1.default.createElement("div", { className: "Icon" }, "format_paragraph")),
            react_1.default.createElement("button", null,
                react_1.default.createElement("div", { className: "Icon" }, "title")),
            react_1.default.createElement("button", null,
                react_1.default.createElement("div", { className: "Icon" }, "format_list_bulleted")),
            react_1.default.createElement("button", null,
                react_1.default.createElement("div", { className: "Icon" }, "format_list_numbered")),
            react_1.default.createElement("button", null,
                react_1.default.createElement("div", { className: "Icon" }, "format_quote")))));
}
exports.Tooltip = Tooltip;
