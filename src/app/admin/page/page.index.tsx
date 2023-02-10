import React, { useContext } from "react";
import { AdminContext } from "../admin.context";

export default function PageIndex () {

	const { list: { pages } } = useContext(AdminContext);

	return (
		<div className="PageCenter">
			{ pages.length > 0 && <p>Please select a page.</p> }
			{ pages.length === 0 && <p>There is no page. Please add a new one.</p> }
		</div>
	);
}