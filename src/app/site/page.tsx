import { useMatch } from "@tanstack/react-location";
import React, { useEffect, useState } from "react";
import Block from "../block/Block";
import BlockViewer from "../block/BlockViewer";
import API from "../utils/API";
import SiteLayout from "./layout";

export default function SitePage () {

	const { params: {slug} } = useMatch();
	const [ page, setPage ] = useState<any|null>(null);
	const [ content, setContent ] = useState<Block|null>(null);

	// Load page data
	const loadPage = async () => {
		const pageSlug = slug ? slug : 'home';
		const response = await API.get('content/page/' + pageSlug);
		// Success
		if (response.status === 200) {
			setPage(response.data);
		}
		// Handle 404 Not Found
		else {}
	};

	// Initialize
	const initialize = async () => {
		loadPage();
	};

	// Trigger initialization on every slug change
	useEffect(() => {
		initialize();
	}, [slug]);

	// Handle page content conversion
	useEffect(() => {
		if (page && page.content) {
			const contentObject = Block.objectToBlockInterface(page.content);
			if (contentObject === null) return;
			const contentBlock = new Block(contentObject);
			if (contentBlock === null) return;
			setContent(contentBlock);
		}
	}, [page]);

	// Still loading...
	if (page === null) return <></>;

	// All is well.
	return (
		<SiteLayout>
			<div className="SitePage">
				<p>{page.title['en']}</p>
				<p>{typeof page.content}</p>
				<p>{content?.toString()}</p>
				{/* { block && <BlockViewer block={block} /> } */}
			</div>
		</SiteLayout>
	);

}