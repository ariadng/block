import { PrismaClient, User } from "@prisma/client";
import { AES } from "crypto-js";
import slugify from "slugify";
import { getAppKey } from "../auth/auth.utils";

const prisma = new PrismaClient();

interface ComponentInterface {
    slug?: string;
    name?: string;
    content?: any;
}

export default class ComponentModel {

	// List components
	public static async index(): Promise<ComponentInterface[]> {
		const components = await prisma.customComponent.findMany({
			orderBy: {
				name: "asc"
			}
		});
		return components;
	}

	// Create new component
	public static async store(data: ComponentInterface) {
		if (!(await this.slugAvailable(data.slug ? data.slug : ""))) return null;
		const component = await prisma.customComponent.create({data: {
			slug: data.slug ? data.slug : slugify(data.name ? data.name : ""),
			name: data.name ? data.name : "",
			content: data.content ? data.content : {},
		}});
		if (component === null) return null;
		return component;
	}

	// Get component by slug
	public static async get(slug: string): Promise<ComponentInterface|null> {
		const component = await prisma.customComponent.findFirst({
			where: {
				slug,
			},
		});
		return component;
	}

	// Update component by slug
	public static async update(slug: string, data: ComponentInterface): Promise<ComponentInterface|null> {
		const exists = (await this.get(slug)) !== null;
		if (!exists) return null;
		let updated: ComponentInterface = {};
		if (typeof data.slug !== "undefined" && (await this.slugAvailable(data.slug, slug))) updated["slug"] = data.slug;
		if (typeof data.name !== "undefined") updated["name"] = data.name;
		if (typeof data.content !== "undefined") updated["content"] = data.content;
		const component = await prisma.customComponent.update({
			where: {
				slug,
			},
			data: {
				slug: updated.slug ? updated.slug : undefined,
				name: updated.name ? updated.name : undefined,
				content: updated.content ? updated.content : undefined,
			},
		});
		return component;
	}

	// Delete component by slug
	public static async delete(slug: string): Promise<ComponentInterface|null> {
		const component = await this.get(slug);
		if (component === null) return null;

		// Delete component
		const deletedcomponent = await prisma.customComponent.delete({
			where: {
				slug,
			},
		});
		return deletedcomponent;
	}

	// Check whether a slug has been used
	public static async slugAvailable(slug: string, currentSlug?: string): Promise<boolean> {
		if (slug === currentSlug) return true;
		const component = await prisma.customComponent.findFirst({
			where: {
				slug: slug,
			},
		});
		if (component === null) return true;
		return false;
	}

}