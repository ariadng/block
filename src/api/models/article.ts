import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ArticleInterface {
	id?: number;
    slug?: string;
    title?: any;
    content?: any;
    summary?: string;
    photo?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    publishedAt?: Date | null;
    deletedAt?: Date | null;
	authorId?: number | null;
	// Category
	categoryIds?: number[],
	categories?: any;
}

export default class ArticleModel {

	// List articles
	public static async index(): Promise<ArticleInterface[]> {
		const articles = await prisma.article.findMany({
			select: {
				id: true,
				slug: true,
				title: true,
				summary: true,
				createdAt: true,
				updatedAt: true,
				publishedAt: true,
				deletedAt: true,
				authorId: true,
				photo: true,
				categories: true,
			},
			orderBy: {
				title: "asc"
			}
		});
		return articles;
	}

	// Create new article
	public static async store(data: ArticleInterface) {
		if (!(await this.slugAvailable(data.slug ? data.slug : ""))) return null;
		const article = await prisma.article.create({
			data: {
				slug: data.slug ? data.slug : "",
				title: data.title ? data.title : {},
				content: data.content ? data.content : null,
				summary: data.summary ? data.summary : "",
				authorId: data.authorId ? data.authorId : null,
				photo: data.photo ? data.photo : null,
				categories: {
					create: data.categoryIds ? data.categoryIds.map(catId => ({ categoryId: catId })) : [],
				},
			},
			include: {
				categories: {
					include: {
						category: true,
					}
				},
			}
		});
		if (article === null) return null;
		return {
			id: article.id,
			slug: article.slug,
			title: article.title,
			content: article.content,
			summary: article.summary,
			authorId: article.authorId,
			photo: article.photo,
			categories: article.categories,
		}
	}

	// Get article by id
	public static async get(id: number | string): Promise<ArticleInterface|null> {
		const articleId = (typeof id === "string") ? parseInt(id) : id;
		const article = await prisma.article.findFirst({
			where: {
				id: articleId,
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
				authorId: true,
				photo: true,
				categories: {
					include: {
						category: true,
					}
				},
			}
		});
		return article;
	}

	// Get article by slug
	public static async getBySlug(slug: string): Promise<ArticleInterface|null> {
		const article = await prisma.article.findFirst({
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
				authorId: true,
				photo: true,
				categories: {
					include: {
						category: true,
					}
				},
			}
		});
		return article;
	}

	// Update article by id
	public static async update(id: number | string, data: ArticleInterface): Promise<ArticleInterface|null> {
		const articleId = (typeof id === "string") ? parseInt(id) : id;
		const oldArticle = await this.get(articleId);
		if (!oldArticle) return null;
		let updated: ArticleInterface = {};
		if (typeof data.slug !== "undefined" && (await this.slugAvailable(data.slug, articleId))) updated["slug"] = data.slug;
		if (typeof data.title !== "undefined") updated["title"] = data.title;
		if (typeof data.content !== "undefined") updated["content"] = data.content;
		if (typeof data.summary !== "undefined") updated["summary"] = data.summary;
		if (typeof data.publishedAt !== "undefined") updated["publishedAt"] = data.publishedAt;
		if (typeof data.deletedAt !== "undefined") updated["deletedAt"] = data.deletedAt;
		if (typeof data.authorId !== "undefined") updated["authorId"] = data.authorId;
		if (typeof data.photo !== "undefined") updated["photo"] = data.photo;
		updated["categoryIds"] = data.categoryIds ? data.categoryIds : oldArticle.categories.map((cat: any) => cat.category.id);
		const article = await prisma.article.update({
			where: {
				id: articleId,
			},
			data: {
				slug: typeof updated.slug !== "undefined" ? updated.slug : undefined,
				title: typeof updated.title !== "undefined" ? updated.title : undefined,
				content: typeof updated.content !== "undefined" ? updated.content : undefined,
				summary: typeof updated.summary !== "undefined" ? updated.summary : undefined,
				photo: typeof updated.photo !== "undefined" ? updated.photo : undefined,
				authorId: typeof updated.authorId !== "undefined" ? updated.authorId : undefined,
				publishedAt: typeof updated.publishedAt !== "undefined" ? updated.publishedAt : undefined,
				deletedAt: typeof updated.deletedAt !== "undefined" ? updated.deletedAt : undefined,
				categories: {
					deleteMany: {},
					create: updated.categoryIds ? updated.categoryIds.map(catId => ({ categoryId: catId })) : [],
				},
			},
			include: {
				categories: {
					include: {
						category: true,
					}
				},
			}
		});
		return article;
	}

	// Delete article by id
	public static async delete(id: number | string): Promise<ArticleInterface|null> {
		const articleId = (typeof id === "string") ? parseInt(id) : id;

		const article = await this.get(articleId);
		if (article === null) return null;
		// if (article.deletedAt === null) return null;

		await prisma.categoriesOnArticles.deleteMany({
			where: {
				articleId: articleId,
			}
		});

		// Delete article
		const deletedArticle = await prisma.article.delete({
			where: {
				id: articleId,
			},
		});
		return deletedArticle;
	}

	// Check whether a slug has been used
	public static async slugAvailable(slug: string, id?: number): Promise<boolean> {
		const article = await prisma.article.findFirst({
			where: {
				slug: slug,
			},
		});
		if (article === null) return true;
		if (typeof id === "undefined") return false;
		if (article.id === id) return true;
		return false;
	}

}