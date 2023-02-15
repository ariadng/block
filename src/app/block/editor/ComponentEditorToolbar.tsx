import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import { ComponentEditorContext } from "./ComponentEditorContext";
import "./ComponentEditorToolbar.scss"

export default function ComponentEditorToolbar () {

	const { insertType, setInsertType, insert } = useContext(ComponentEditorContext);
	const [ isInsertMenuOpen, setIsInsertMenuOpen ] = useState<boolean>(false);
	
	const getClassName = () : string => {
		let name = "ComponentEditorToolbarContainer";
		if (isInsertMenuOpen) name += " InsertMenuOpen";
		return name;
	};

	const toggleInsertMenu = () : void => {
		setIsInsertMenuOpen(!isInsertMenuOpen);
	};

	const handleInsertStart = (type: string) => {
		setInsertType(type);
	};

	const handleSave = () => {

	};

	return (
		<div className={getClassName()}>

			<div className="ComponentEditorToolbar">
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
					<Button label="Save" color="primary" onClick={() => { handleSave() }} />
				</div>
			</div>

			<div className="ComponentEditorInsertMenu">
				<Button leadingIcon="table_rows" className={insertType === "VerticalView" ? "Active" : ""} onClick={() => { handleInsertStart("VerticalView") }} />
				<Button leadingIcon="view_column" className={insertType === "HorizontalView" ? "Active" : ""} onClick={() => { handleInsertStart("HorizontalView") }} />
				<Button leadingIcon="text_fields" className={insertType === "TextView" ? "Active" : ""} onClick={() => { handleInsertStart("TextView") }} />
				<Button leadingIcon="image" className={insertType === "ImageView" ? "Active" : ""} onClick={() => { handleInsertStart("ImageView") }} />
				<Button leadingIcon="mic" className={insertType === "AudioView" ? "Active" : ""} onClick={() => { handleInsertStart("AudioView") }} />
				<Button leadingIcon="movie" className={insertType === "VideoView" ? "Active" : ""} onClick={() => { handleInsertStart("VideoView") }} />
				<Button leadingIcon="smart_button" className={insertType === "ButtonView" ? "Active" : ""} onClick={() => { handleInsertStart("ButtonView") }}/>
			</div>

		</div>
	)

}