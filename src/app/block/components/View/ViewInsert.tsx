import React from "react";
import Button from "../../../components/Button/Button";
import "./ViewInsert.scss";

export default function ViewInsert () {

	return (
		<div className="ViewInsert">
			<div className="Line"></div>
			<Button label="Section" leadingIcon="add" color="accent" shape="pill"/>
		</div>
	);

}