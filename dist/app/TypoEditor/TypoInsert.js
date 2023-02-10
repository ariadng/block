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
const SecuredAPI_1 = __importDefault(require("../utils/SecuredAPI"));
require("./TypoInsert.scss");
const TypoUtils_1 = __importDefault(require("./TypoUtils"));
function TypoInsert({ show, position, onUpdate }) {
    const element = (0, react_1.useRef)(null);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const imageSelector = (0, react_1.useRef)(null);
    const videoSelector = (0, react_1.useRef)(null);
    const audioSelector = (0, react_1.useRef)(null);
    const openImageSelector = () => {
        if (imageSelector.current) {
            imageSelector.current.click();
        }
    };
    const handleImageSelector = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            let formData = new FormData();
            formData.set("file", file);
            const response = await SecuredAPI_1.default.post("file", formData);
            if (response.status === 200) {
                const imagePath = response.data.path;
                let elementToReplace = TypoUtils_1.default.getSelectionParentElement();
                if (!elementToReplace)
                    return;
                let parent = elementToReplace.parentElement;
                if (!parent)
                    return;
                let newElement = document.createElement("div");
                newElement.classList.add("ContentImage");
                let contentElement = document.createElement("img");
                contentElement.src = imagePath;
                newElement.appendChild(contentElement);
                parent.replaceChild(newElement, elementToReplace);
                const emptyParagraph = document.createElement("p");
                emptyParagraph.appendChild(document.createTextNode(""));
                TypoUtils_1.default.insertElementAfterCursor(emptyParagraph);
                if (onUpdate)
                    onUpdate();
                setIsOpen(false);
            }
            else {
                console.error(response);
            }
        }
    };
    const openVideoSelector = () => {
        if (videoSelector.current) {
            videoSelector.current.click();
        }
    };
    const handleVideoSelector = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            let formData = new FormData();
            formData.set("file", file);
            const response = await SecuredAPI_1.default.post("file", formData);
            if (response.status === 200) {
                const filePath = response.data.path;
                let elementToReplace = TypoUtils_1.default.getSelectionParentElement();
                if (!elementToReplace)
                    return;
                let parent = elementToReplace.parentElement;
                if (!parent)
                    return;
                let newElement = document.createElement("div");
                newElement.classList.add("ContentVideo");
                let contentElement = document.createElement("video");
                contentElement.controls = true;
                contentElement.src = filePath;
                newElement.appendChild(contentElement);
                parent.replaceChild(newElement, elementToReplace);
                const emptyParagraph = document.createElement("p");
                emptyParagraph.appendChild(document.createTextNode(""));
                TypoUtils_1.default.insertElementAfterCursor(emptyParagraph);
                if (onUpdate)
                    onUpdate();
                setIsOpen(false);
            }
            else {
                console.error(response);
            }
        }
    };
    const openAudioSelector = () => {
        if (audioSelector.current) {
            audioSelector.current.click();
        }
    };
    const handleAudioSelector = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            let formData = new FormData();
            formData.set("file", file);
            const response = await SecuredAPI_1.default.post("file", formData);
            if (response.status === 200) {
                const filePath = response.data.path;
                let elementToReplace = TypoUtils_1.default.getSelectionParentElement();
                if (!elementToReplace)
                    return;
                let parent = elementToReplace.parentElement;
                if (!parent)
                    return;
                let newElement = document.createElement("div");
                newElement.classList.add("ContentAudio");
                let contentElement = document.createElement("audio");
                contentElement.controls = true;
                contentElement.src = filePath;
                newElement.appendChild(contentElement);
                parent.replaceChild(newElement, elementToReplace);
                const emptyParagraph = document.createElement("p");
                emptyParagraph.appendChild(document.createTextNode(""));
                TypoUtils_1.default.insertElementAfterCursor(emptyParagraph);
                if (onUpdate)
                    onUpdate();
                setIsOpen(false);
            }
            else {
                console.error(response);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (!show)
            setIsOpen(false);
    }, [show]);
    return (react_1.default.createElement("div", { ref: element, className: `TypoInsert ${show ? 'Visible' : 'Invisible'} ${isOpen ? 'Opened' : 'Closed'}`, style: {
            top: position.top + 5,
            left: position.left - 25,
        } },
        react_1.default.createElement("input", { ref: imageSelector, onChange: handleImageSelector, type: "file", accept: "image/*" }),
        react_1.default.createElement("input", { ref: videoSelector, onChange: handleVideoSelector, type: "file", accept: "video/*" }),
        react_1.default.createElement("input", { ref: audioSelector, onChange: handleAudioSelector, type: "file", accept: "audio/*" }),
        react_1.default.createElement("button", { className: "PlusButton", onClick: () => { setIsOpen(!isOpen); } },
            react_1.default.createElement("div", { className: "Icon" }, "add")),
        react_1.default.createElement("div", { className: "Menu" },
            react_1.default.createElement("div", { className: "button MenuItem", onClick: () => { openImageSelector(); } },
                react_1.default.createElement("div", { className: "Icon" }, "image"),
                react_1.default.createElement("div", { className: "Label" }, "Image")),
            react_1.default.createElement("div", { className: "button MenuItem", onClick: () => { openVideoSelector(); } },
                react_1.default.createElement("div", { className: "Icon" }, "play_arrow"),
                react_1.default.createElement("div", { className: "Label" }, "Video")),
            react_1.default.createElement("div", { className: "button MenuItem", onClick: () => { openAudioSelector(); } },
                react_1.default.createElement("div", { className: "Icon" }, "mic"),
                react_1.default.createElement("div", { className: "Label" }, "Audio")))));
}
exports.default = TypoInsert;
