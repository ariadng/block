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

	return (
		<div ref={element} className={`TypoInsert ${show ? 'Visible' : 'Invisible'} ${isOpen ? 'Opened' : 'Closed'}`} style={{
			top: position.top + 5,
			left: position.left - 25,
		}}>
			<button className="PlusButton" onClick={() => {setIsOpen(!isOpen)}}>
				<div className="Icon">add</div>
			</button>
		</div>
	);

}