import React, { useEffect, useRef, useState } from "react";
import SecuredAPI from "../utils/SecuredAPI";
import "./TypoInsert.scss";
import TypoUtils from "./TypoUtils";

interface Props {
	show: boolean,
	position: {
		top: number,
		left: number,
	},
	onUpdate: () => void,
}

export default function TypoInsert ({
	show, position, onUpdate
}: Props) {

	const element = useRef<HTMLDivElement>(null);

	const [ isOpen, setIsOpen ] = useState<boolean>(false);

	const imageSelector = useRef<HTMLInputElement>(null);
	const videoSelector = useRef<HTMLInputElement>(null);
	const audioSelector = useRef<HTMLInputElement>(null);

	const openImageSelector = () => {
		if (imageSelector.current) {
			imageSelector.current.click();
		}
	};

	const handleImageSelector: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			let formData = new FormData();
			formData.set("file", file);
			const response = await SecuredAPI.post("file", formData);
			if (response.status === 200) {
				const imagePath = response.data.path;
				let elementToReplace = TypoUtils.getSelectionParentElement();
				if (!elementToReplace) return;
				let parent = elementToReplace.parentElement;
				if (!parent) return;
				let newElement = document.createElement("div");
				newElement.classList.add("ContentImage");
				let contentElement = document.createElement("img");
				contentElement.src = imagePath;
				newElement.appendChild(contentElement);
				parent.replaceChild(newElement, elementToReplace);
				const emptyParagraph = document.createElement("p");
				emptyParagraph.appendChild(document.createTextNode(""));
				TypoUtils.insertElementAfterCursor(emptyParagraph);
				if (onUpdate) onUpdate();
				setIsOpen(false);
			} else {
				console.error(response);
			}
		}
	};

	const openVideoSelector = () => {
		if (videoSelector.current) {
			videoSelector.current.click();
		}
	};

	const handleVideoSelector: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			let formData = new FormData();
			formData.set("file", file);
			const response = await SecuredAPI.post("file", formData);
			if (response.status === 200) {
				const filePath = response.data.path;
				let elementToReplace = TypoUtils.getSelectionParentElement();
				if (!elementToReplace) return;
				let parent = elementToReplace.parentElement;
				if (!parent) return;
				let newElement = document.createElement("div");
				newElement.classList.add("ContentVideo");
				let contentElement = document.createElement("video");
				contentElement.controls = true;
				contentElement.src = filePath;
				newElement.appendChild(contentElement);
				parent.replaceChild(newElement, elementToReplace);
				const emptyParagraph = document.createElement("p");
				emptyParagraph.appendChild(document.createTextNode(""));
				TypoUtils.insertElementAfterCursor(emptyParagraph);
				if (onUpdate) onUpdate();
				setIsOpen(false);
			} else {
				console.error(response);
			}
		}
	};

	const openAudioSelector = () => {
		if (audioSelector.current) {
			audioSelector.current.click();
		}
	};

	const handleAudioSelector: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			let formData = new FormData();
			formData.set("file", file);
			const response = await SecuredAPI.post("file", formData);
			if (response.status === 200) {
				const filePath = response.data.path;
				let elementToReplace = TypoUtils.getSelectionParentElement();
				if (!elementToReplace) return;
				let parent = elementToReplace.parentElement;
				if (!parent) return;
				let newElement = document.createElement("div");
				newElement.classList.add("ContentAudio");
				let contentElement = document.createElement("audio");
				contentElement.controls = true;
				contentElement.src = filePath;
				newElement.appendChild(contentElement);
				parent.replaceChild(newElement, elementToReplace);
				const emptyParagraph = document.createElement("p");
				emptyParagraph.appendChild(document.createTextNode(""));
				TypoUtils.insertElementAfterCursor(emptyParagraph);
				if (onUpdate) onUpdate();
				setIsOpen(false);
			} else {
				console.error(response);
			}
		}
	};

	useEffect(() => {
		if (!show) setIsOpen(false);
	}, [show])

	return (
		<div ref={element} className={`TypoInsert ${show ? 'Visible' : 'Invisible'} ${isOpen ? 'Opened' : 'Closed'}`} style={{
			top: position.top + 5,
			left: position.left - 25,
		}}>

			<input ref={imageSelector} onChange={handleImageSelector} type="file" accept="image/*" />
			<input ref={videoSelector} onChange={handleVideoSelector} type="file" accept="video/*" />
			<input ref={audioSelector} onChange={handleAudioSelector} type="file" accept="audio/*" />

			<button className="PlusButton" onClick={() => {setIsOpen(!isOpen)}}>
				<div className="Icon">add</div>
			</button>
			<div className="Menu">
				<div className="button MenuItem" onClick={() => { openImageSelector() }}>
					<div className="Icon">image</div>
					<div className="Label">Image</div>
				</div>
				<div className="button MenuItem" onClick={() => { openVideoSelector() }}>
					<div className="Icon">play_arrow</div>
					<div className="Label">Video</div>
				</div>
				<div className="button MenuItem" onClick={() => { openAudioSelector() }}>
					<div className="Icon">mic</div>
					<div className="Label">Audio</div>
				</div>
			</div>
		</div>
	);

}