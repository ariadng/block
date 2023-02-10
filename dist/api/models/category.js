"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryModel {
    // List categories
    static async index() {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                slug: true,
                title: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                title: "asc"
            }
        });
        return categories;
    }
    // Create new category
    static async store(data) {
        if (!(await this.slugAvailable(data.slug ? data.slug : "")))
            return null;
        const category = await prisma.category.create({ data: {
                slug: data.slug ? data.slug : "",
                title: data.title ? data.title : "",
            } });
        if (category === null)
            return null;
        return {
            id: category.id,
            slug: category.slug,
            title: category.title,
        };
    }
    // Get category by id
    static async get(id) {
        const categoryId = (typeof id === "string") ? parseInt(id) : id;
        const category = await prisma.category.findFirst({
            where: {
                id: categoryId,
            },
            select: {
                id: true,
                slug: true,
                title: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return category;
    }
    // Get category by slug
    static async getBySlug(slug) {
        const category = await prisma.category.findFirst({
            where: {
                slug: slug,
            },
            select: {
                id: true,
                slug: true,
                title: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return category;
    }
    // Update category by id
    static async update(id, data) {
        const categoryId = (typeof id === "string") ? parseInt(id) : id;
        const categoryExists = (await this.get(categoryId)) !== null;
        if (!categoryExists)
            return null;
        let updated = {};
        if (typeof data.slug !== "undefined" && (await this.slugAvailable(data.slug, categoryId)))
            updated["slug"] = data.slug;
        if (typeof data.title !== "undefined")
            updated["title"] = data.title;
        const category = await prisma.category.update({
            where: {
                id: categoryId,
            },
            data: {
                slug: updated.slug ? updated.slug : undefined,
                title: updated.title ? updated.title : undefined,
            },
        });
        return category;
    }
    // Delete category by id
    static async delete(id) {
        const categoryId = (typeof id === "string") ? parseInt(id) : id;
        const category = await this.get(categoryId);
        if (category === null)
            return null;
        // Clear article's categoryId
        // await prisma.article.updateMany({
        // 	where: {
        // 		categoryId: categoryId,
        // 	},
        // 	data: {
        // 		categoryId: null,
        // 	}
        // })
        // Delete category
        const deletedcategory = await prisma.category.delete({
            where: {
                id: categoryId,
            },
        });
        return deletedcategory;
    }
    // Check whether a slug has been used
    static async slugAvailable(slug, id) {
        const category = await prisma.category.findFirst({
            where: {
                slug: slug,
            },
        });
        if (category === null)
            return true;
        if (typeof id === "undefined")
            return false;
        if (category.id === id)
            return true;
        return false;
    }
}
exports.default = CategoryModel;
