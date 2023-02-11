import React, { useState } from "react";
import Button from "../Button/Button";
import "./PageEditorToolbar.scss"

export default function PageEditorToolbar () {

	const [ isInsertMenuOpen, setIsInsertMenuOpen ] = useState<boolean>(true);
	
	const getClassName = () : string => {
		let name = "PageEditorToolbarContainer";
		if (isInsertMenuOpen) name += " InsertMenuOpen";
		return name;
	};

	const toggleInsertMenu = () : void => {
		setIsInsertMenuOpen(!isInsertMenuOpen);
	};

	return (
		<div className={getClassName()}>

			<div className="PageEditorToolbar">
				<div className="Leading">
					<Button leadingIcon="arrow_back" />
				</div>
				<div className="Center">
					<Button leadingIcon="tune" />
					<Button className="InsertMenuToggle" leadingIcon="add" color="primary" onClick={() => { toggleInsertMenu() }} />
					<Button leadingIcon="palette" />
				</div>
				<div className="Trailing">
					<Button leadingIcon="translate" />
					<Button leadingIcon="devices" />
					<Button leadingIcon="settings" />
					<Button label="Save" color="primary" />
				</div>
			</div>

			<div className="PageEditorInsertMenu">
				<Button leadingIcon="dashboard" />
				<Button leadingIcon="text_fields" />
				<Button leadingIcon="image" />
				<Button leadingIcon="mic" />
				<Button leadingIcon="movie" />
				<Button leadingIcon="smart_button" />
			</div>

		</div>
	)

}