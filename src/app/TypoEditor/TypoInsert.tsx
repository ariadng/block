import React, { useEffect, useRef, useState } from "react";
import "./TypoInsert.scss";

interface Props {
	show: boolean,
	position: {
		top: number,
		left: number,
	}
}

export default function TypoInsert ({
	show, position,
}: Props) {

	const element = useRef<HTMLDivElement>(null);

	const [ isOpen, setIsOpen ] = useState<boolean>(false);

	useEffect(() => {
		if (!show) setIsOpen(false);
	}, [show])

	return (
		<div ref={element} className={`TypoInsert ${show ? 'Visible' : 'Invisible'} ${isOpen ? 'Opened' : 'Closed'}`} style={{
			top: position.top + 5,
			left: position.left - 25,
		}}>
			<button className="PlusButton" onClick={() => {setIsOpen(!isOpen)}}>
				<div className="Icon">add</div>
			</button>
			<div className="Menu">
				<div className="button MenuItem">
					<div className="Icon">image</div>
					<div className="Label">Image</div>
				</div>
				<div className="button MenuItem">
					<div className="Icon">play_arrow</div>
					<div className="Label">Video</div>
				</div>
				<div className="button MenuItem">
					<div className="Icon">mic</div>
					<div className="Label">Audio</div>
				</div>
				<div className="button MenuItem">
					<div className="Icon">data_object</div>
					<div className="Label">Embed</div>
				</div>
			</div>
		</div>
	);

}