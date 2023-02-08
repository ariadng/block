import React, { useContext } from "react";
import { AdminContext } from "../admin.context";

export default function ArticleIndex () {

	const { list: { articles } } = useContext(AdminContext);

	return (
		<div className="ArticleCenter">
			{ articles.length > 0 && <p>Please select an article.</p> }
			{ articles.length === 0 && <p>There is no article. Please add a new one.</p> }
		</div>
	);
}