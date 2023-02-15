import React, { useEffect, useRef, useState } from "react";
import Block from "../Block";
import SecuredAPI from "../../utils/SecuredAPI";
import "./ComponentEditor.scss"
import ComponentEditorContent from "./ComponentEditorContent";
import ComponentEditorToolbar from "./ComponentEditorToolbar";
import { ComponentEditorContext, ComponentEditorContextInterface } from "./ComponentEditorContext";

interface Props {
	component?: {
		name: string,
		content: Block,
	},
	slug?: string,
}

export default function ComponentEditor ({
	component,
	slug,
}: Props) {

	const getDefaultComponent = (): any | null => {
		const name = "NewComponent";
		const contentObject = {
			type: "ComponentView",
		};
		const blockObject = Block.objectToBlockInterface(contentObject);
		return {
			name,
			content: blockObject ? new Block(blockObject) : null,
		};
	};

	const [ data, setData ] = useState<any | null>(getDefaultComponent());

	const getContent = (): Block | null => {
		if (!data) return null;
		return data.content;
	};

	// --- Insert Component
	const [insertType, setInsertType] = useState<string|null>(null);
	const handleInsert = (id: string, type: string) => {
		if (!id || id === "") return;
		if (!data.content) return;

		const targetBlock = data.content.id === id ? data.content : data.content.findChild(id);
		if (!targetBlock) return;

		let componentBlock: Block | null = null;

		// TextView
		if (type === "TextView") {
			const object = Block.objectToBlockInterface({
				type: "TextView",
				props: {
					text: {
						"en": "Example text",
						"id": "Contoh teks",
					}
				}
			});
			if (!object) return;
			componentBlock = new Block(object);
		}

		// Insert
		if (!componentBlock) return;
		const updatedContent = targetBlock.addChild(componentBlock);
		
		// Update
		if (data.content.id === id) {
			setData({...data, content: updatedContent});
		} else {
			setData({...data, content: data.content.replaceChild(id, updatedContent)});
		}
	}

	// ---

	const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
		const element = event.target as HTMLElement;
		const id = element.id;
		// Insert component
		if (insertType) {
			handleInsert(id, insertType);
			setInsertType(null);
		}
	};

	const contextValue: ComponentEditorContextInterface = {
		insertType: insertType,
		setInsertType: setInsertType,
		insert: handleInsert,
	}

	return (
		<ComponentEditorContext.Provider value={contextValue}>
			<div className="ComponentEditor Full" onClick={handleClick}>
				<ComponentEditorToolbar />
				<ComponentEditorContent content={getContent()} />
			</div>
		</ComponentEditorContext.Provider>
	)

}