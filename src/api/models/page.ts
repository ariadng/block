import { PrismaClient, User } from "@prisma/client";
import { AES } from "crypto-js";
import { getAppKey } from "../auth/auth.utils";

const prisma = new PrismaClient();

interface PageInterface {
	id?: number;
    slug?: string;
    title?: any;
    content?: any;
    summary?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    publishedAt?: Date | null;
    deletedAt?: Date | null;
}

export default class PageModel {

	// List pages
	public static async index(): Promise<PageInterface[]> {
		const pages = await prisma.page.findMany({
			select: {
				id: true,
				slug: true,
				title: true,
				summary: true,
				createdAt: true,
				updatedAt: true,
				publishedAt: true,
				deletedAt: true,
			},
			orderBy: {
				title: "asc"
			}
		});
		return pages;
	}

	// Create new page
	public static async store(data: PageInterface) {
		if (!(await this.slugAvailable(data.slug ? data.slug : ""))) return null;
		const page = await prisma.page.create({data: {
			slug: data.slug ? data.slug : "",
			title: data.title ? data.title : {},
			content: data.content ? data.content : {},
			summary: data.summary ? data.summary : "",
		}});
		if (page === null) return null;
		return {
			id: page.id,
			slug: page.slug,
			title: page.title,
			content: page.content,
			summary: page.summary,
		}
	}

	// Get page by id
	public static async get(id: number | string): Promise<PageInterface|null> {
		const pageId = (typeof id === "string") ? parseInt(id) : id;
		const page = await prisma.page.findFirst({
			where: {
				id: pageId,
			},
			select: {
				id: true,
				slug: true,
				title: true,
				content: true,
				summary: true,
				createdAt: true,
				updatedAt: true,
				deletedAt: true,
				publishedAt: true,
			}
		});
		return page;
	}

	// Get page by slug
	public static async getBySlug(slug: string): Promise<PageInterface|null> {
		const page = await prisma.page.findFirst({
			where: {
				slug: slug,
			},
			select: {
				id: true,
				slug: true,
				title: true,
				content: true,
				summary: true,
				createdAt: true,
				updatedAt: true,
				deletedAt: true,
				publishedAt: true,
			}
		});
		return page;
	}

	// Update page by id
	public static async update(id: number | string, data: PageInterface): Promise<PageInterface|null> {
		const pageId = (typeof id === "string") ? parseInt(id) : id;
		const pageExists = (await PageModel.get(pageId)) !== null;
		if (!pageExists) return null;
		let updated: PageInterface = {};
		if (typeof data.slug !== "undefined" && (await PageModel.slugAvailable(data.slug, pageId))) updated["slug"] = data.slug;
		if (typeof data.title !== "undefined") updated["title"] = data.title;
		if (typeof data.content !== "undefined") updated["content"] = data.content;
		if (typeof data.summary !== "undefined") updated["summary"] = data.summary;
		if (typeof data.publishedAt !== "undefined") updated["publishedAt"] = data.publishedAt;
		if (typeof data.deletedAt !== "undefined") updated["deletedAt"] = data.deletedAt;
		const page = await prisma.page.update({
			where: {
				id: pageId,
			},
			data: {
				slug: updated.slug ? updated.slug : undefined,
				title: updated.title ? updated.title : undefined,
				content: updated.content ? updated.content : undefined,
				summary: updated.summary ? updated.summary : undefined,
				publishedAt: typeof updated.publishedAt !== "undefined" ? updated.publishedAt : undefined,
				deletedAt: typeof updated.deletedAt !== "undefined" ? updated.deletedAt : undefined,
			},
		});
		return page;
	}

	// Delete page by id
	public static async delete(id: number | string): Promise<PageInterface|null> {
		const pageId = (typeof id === "string") ? parseInt(id) : id;

		const page = await this.get(pageId);
		if (page === null) return null;
		if (page.deletedAt === null) return null;

		// Delete page
		const deletedPage = await prisma.page.delete({
			where: {
				id: pageId,
			},
		});
		return deletedPage;
	}

	// Check whether a slug has been used
	public static async slugAvailable(slug: string, id?: number): Promise<boolean> {
		const page = await prisma.page.findFirst({
			where: {
				slug: slug,
			},
		});
		if (page === null) return true;
		if (typeof id === "undefined") return false;
		if (page.id === id) return true;
		return false;
	}

}