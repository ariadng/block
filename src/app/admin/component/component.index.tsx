import React, { useContext } from "react";
import { AdminContext } from "../admin.context";

export default function ComponentIndex () {

	const { list: { components } } = useContext(AdminContext);

	return (
		<div className="ComponentCenter">
			{ components.length > 0 && <p>Please select a component.</p> }
			{ components.length === 0 && <p>There is no component. Please add a new one.</p> }
		</div>
	);
}