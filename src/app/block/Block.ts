import React from "react";
import { CSSProperties } from "react";
import { v4 as uuid } from "uuid";
import ViewInsert from "./components/View/ViewInsert";
import BlockAlignment, { BlockAlignmentDefault } from "./interfaces/BlockAlignment";
import BlockAlignmentInterface from "./interfaces/BlockAlignmentInterface";
import BlockInterface from "./interfaces/BlockInterface";
import BlockProps from "./interfaces/BlockProps";
import BlockStyle, { BlockStyleDefault } from "./interfaces/BlockStyle";
import BlockView from "./interfaces/BlockView";
import ComponentMap from "./interfaces/ComponentMap";

export default class Block {

	// Required properties.
	public type: string;
	public id: string;
	public props: BlockProps;
	public alignment: BlockAlignment;
	public style: BlockStyle;
	public children: Block[];
	
	// Optional properties.
	private name?: string;

	// --- Creates a new Block instance.
	constructor (value: BlockInterface) {
		// Process main block value.
		this.type = value.type;
		this.id = value.id ? value.id : uuid();
		this.props = value.props ? value.props : {};
		this.alignment = value.alignment ? value.alignment : BlockAlignmentDefault;
		this.style = value.style ? value.style : BlockStyleDefault;
		const children: Block[] = [];
		// Process the children.
		for (let child of value.children) {
			const childBlock = new Block(child);
			children.push(childBlock);
		}
		this.children = children;
	}

	// --- Get the name.
	public getName (): string {
		return this.name ? this.name : this.type; 
	}

	// --- Update props.
	public updateProps (updated: {[key: string]: any}): Block {
		this.props = {...this.props, ...updated};
		return this;
	}

	// --- Update alignment.
	public updateAlignment (updated: BlockAlignment): Block {
		this.alignment = {...this.alignment, ...updated};
		return this;
	}
	public updateViewAlignment (view: BlockView, updated: BlockAlignmentInterface): Block {
		this.alignment[view] = { ...this.alignment[view], ...updated };
		return this;
	}

	// --- Update style.
	public updateStyle (updated: BlockStyle): Block {
		this.style = {...this.style, ...updated};
		return this;
	}
	public updateViewStyle (view: BlockView, updated: BlockStyle): Block {
		this.style[view] = { ...this.style[view], ...updated };
		return this;
	}

	// --- Get alignment.
	public getAlignment (view: BlockView = BlockView.Default): BlockAlignmentInterface {
		return Block.getAlignment(this.alignment, view);
	}

	// --- Get style.
	public getStyle (view: BlockView = BlockView.Default): CSSProperties {
		let style = Block.getStyle(this.style, this.alignment, view);
		return style;
	}

	// *** [ Children Block ] *** //

	// --- Find a child by id.
	public findChild (id: string, deep: boolean = true) : Block | null {
		let block: Block | null | undefined;
		// Direct descendant.
		block = this.children.find(child => child.id === id);
		if (block) return block;
		// Deep search.
		if (deep) {
			for (let child of this.children) {
				block = child.findChild(id);
				if (block) return block;
			}
		}
		// Not found.
		return null;
	}

	// --- Get a route to a child.
	public getRoute (id: string, precursor: string[] = []): string[] | null {
		const route: string[] = precursor;
		let block = this.findChild(id, false);
		if (block) return [...route, id];
		else {
			// Deep search.
			for (let child of this.children) {
				const childRoute = child.getRoute(id, [child.id]);
				if (childRoute) return childRoute;
			}
		}
		return null;
	}

	// --- Check whether an id does exist.
	public checkId (id: string) : boolean {
		return this.findChild(id) ? true : false;
	}

	// --- Generate unique id.
	public generateId (predefined?: string) : string {
		let id = predefined ? predefined : uuid();
		if (this.checkId(id)) id = this.generateId();
		return id;
	}

	// --- Add a new child.
	public addChild (child: Block, atIndex?: number): Block {
		// Process input block.
		const childId = this.generateId(child.id);
		let newChild = child;
		child.id = childId;
		// Add to children list.
		if (typeof atIndex !== "undefined") {
			this.children.splice(atIndex, 0, newChild);
		} else {
			this.children.push(newChild);
		}
		// Return this block.
		return this;
	}

	// --- Replace a child.
	public replaceChild (id: string, replaceWith: Block): Block {
		const route = this.getRoute(id);
		if (route) {
			let directParent: Block | null;
			if (route.length === 1) {
				this.children[0] = replaceWith;
			} else {
				directParent = this.findChild(route[route.length - 2]);
				if (directParent) {
					const childIndex = directParent.children.findIndex(child => child.id === id);
					if (childIndex >= 0) {
						directParent.children[childIndex] = replaceWith;
					}
				}
			}
		}
		// Return this block.
		return this;
	}

	// --- Remove a child.
	public removeChild (id: string): Block {
		const route = this.getRoute(id);
		if (route) {
			let directParent: Block | null;
			if (route.length === 1) {
				this.children = this.children.filter(child => child.id !== id);
			} else {
				directParent = this.findChild(route[route.length - 2]);
				if (directParent) directParent.children = directParent.children.filter(child => child.id !== id);
			}
		}
		// Return this block.
		return this;
	}

	// *** [ Type Conversion ] *** //

	// --- To JavaScript object.
	public toObject () : BlockInterface {
		let object: BlockInterface = {
			type: this.type,
			id: this.id,
			props: this.props,
			alignment: this.alignment,
			style: this.style,
			children: [],
		};
		for (let child of this.children) {
			object.children.push(child.toObject());
		}
		return object;
	}

	// --- To JSON string.
	public toString () : string {
		const object = this.toObject();
		return JSON.stringify(object);
	}

	// --- To React component.
	public toReactComponent () : React.DOMElement<React.DOMAttributes<Element>, Element> | null {
		// Component type.
		const type = ComponentMap[this.type];
		if (typeof type === "undefined") return null;

		// Component properties.
		const props = {
			...this.props,
			key: this.id,
			id: this.id,
			alignment: this.alignment,
			style: this.style,
		};

		
		// Children.
		const children: React.ReactNode[] = [];
		for (let child of this.children) {
			const childComponent = child.toReactComponent();
			if (childComponent !== null) {
				children.push(childComponent);
			}
		}
		
		// Return the component.
		const component = React.createElement(type, props, children);
		return component;
	}

	// *** [ Static Utilities ] *** //

	// --- Merge styles.
	public static mergeStyles (...styles: BlockStyle[]) {
		let mergedStyle: BlockStyle = {
			default: {},
			mobile: {},
			tablet: {},
			desktop: {},
			ultrawide: {},
		};

		for (let style of styles) {
			if (style.default) mergedStyle.default = { ...mergedStyle.default, ...style.default };
			if (style.mobile) mergedStyle.mobile = { ...mergedStyle.mobile, ...style.mobile };
			if (style.tablet) mergedStyle.tablet = { ...mergedStyle.tablet, ...style.tablet };
			if (style.desktop) mergedStyle.desktop = { ...mergedStyle.desktop, ...style.desktop };
			if (style.ultrawide) mergedStyle.ultrawide = { ...mergedStyle.ultrawide, ...style.ultrawide };
		}

		return mergedStyle;
	}

	// --- Get alignment.
	public static getAlignment (blockAlignment: BlockAlignment, view: BlockView = BlockView.Default): BlockAlignmentInterface {
		// Default
		let alignment = blockAlignment[BlockView.Default];
		if (view === BlockView.Default) return alignment;
		// Mobile
		alignment = { ...alignment, ...blockAlignment[BlockView.Mobile] };
		if (view === BlockView.Mobile) return alignment;
		// Tablet
		alignment = { ...alignment, ...blockAlignment[BlockView.Tablet] };
		if (view === BlockView.Tablet) return alignment;
		// Desktop
		alignment = { ...alignment, ...blockAlignment[BlockView.Desktop] };
		if (view === BlockView.Desktop) return alignment;
		// Ultrawide
		alignment = { ...alignment, ...blockAlignment[BlockView.Ultrawide] };
		return alignment;
	}

	// --- Get style.
	public static getStyle (blockStyle: BlockStyle, blockAlignment?: BlockAlignment, view: BlockView = BlockView.Default): CSSProperties {
		// Default
		let style = blockStyle[BlockView.Default];
		if (view === BlockView.Default) return style;
		// Mobile
		style = { ...style, ...blockStyle[BlockView.Mobile] };
		if (view === BlockView.Mobile) return style;
		// Tablet
		style = { ...style, ...blockStyle[BlockView.Tablet] };
		if (view === BlockView.Tablet) return style;
		// Desktop
		style = { ...style, ...blockStyle[BlockView.Desktop] };
		if (view === BlockView.Desktop) return style;
		// Ultrawide
		style = { ...style, ...blockStyle[BlockView.Ultrawide] };

		// Add style from alignment
		let styleFromAlignment: CSSProperties = {};
		
		if (blockAlignment) {
			const alignment = Block.getAlignment(blockAlignment, view);
			// Flex Direction (Layout)
			if (alignment.layout === "Vertical") styleFromAlignment.flexDirection = "column";
			else if (alignment.layout === "Horizontal") styleFromAlignment.flexDirection = "row";
			// Justify Content (Main Axis)
			if (alignment.mainAxis === "Start") styleFromAlignment.justifyContent = "flex-start";
			else if (alignment.mainAxis === "End") styleFromAlignment.justifyContent = "flex-end";
			else if (alignment.mainAxis === "Center") styleFromAlignment.justifyContent = "center";
			else if (alignment.mainAxis === "Stretch") styleFromAlignment.justifyContent = "stretch";
			else if (alignment.mainAxis === "Spaced") styleFromAlignment.justifyContent = "space-between";
			// Align Items (Cross Axis)
			if (alignment.crossAxis === "Start") styleFromAlignment.alignItems = "flex-start";
			else if (alignment.crossAxis === "End") styleFromAlignment.alignItems = "flex-end";
			else if (alignment.crossAxis === "Center") styleFromAlignment.alignItems = "center";
			else if (alignment.crossAxis === "Stretch") styleFromAlignment.alignItems = "stretch";
			// Gap
			if (alignment.gap) styleFromAlignment.gap = alignment.gap;
		}

		return { ...styleFromAlignment, ...style };
	}

	// *** [ Static Type Conversion ] *** //

	// --- JavaScript object to BlockInterface object.
	public static objectToBlockInterface (object: {[key: string]: any}) : BlockInterface | null {
		// Get field values.
		let type = object.type;
		let id = object.id;
		let props = object.props;
		let alignment = object.alignment;
		let style = object.style;
		let children: BlockInterface[] = [];
		
		// Check fields.
		if (!type) return null;
		if (!id) id = uuid();
		if (!props) props = {};
		if (!alignment) alignment = BlockAlignmentDefault;
		if (!style) style = BlockStyleDefault;

		// Process children.
		if (object.children instanceof Array) {
			for (let child of object.children) {
				const childBlock = this.objectToBlockInterface(child);
				if (childBlock) children.push(childBlock);
			}
		}
				
		return {
			type,
			id,
			props,
			alignment,
			style,
			children,
		};
	}

	// --- JSON string to Block instance.
	public static fromString(json: string): Block | null {

		try { JSON.parse(json) }
		catch(e) { return null }

		const object = Block.objectToBlockInterface(JSON.parse(json));
		if (!object) return null;

		const block = new Block(object);
		return block;

	}

}