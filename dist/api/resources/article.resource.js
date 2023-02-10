"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRouter = void 0;
const express_1 = require("express");
const luxon_1 = require("luxon");
const article_1 = __importDefault(require("../models/article"));
const validate_1 = __importDefault(require("../utils/validate"));
const router = (0, express_1.Router)();
exports.ArticleRouter = router;
// List all articles
router.get('/', async (req, res) => {
    const articles = await article_1.default.index();
    return res.json({
        status: 200,
        message: "Get articles success",
        data: articles,
    });
});
// Create new article
router.post('/', async (req, res) => {
    // Validate request body
    const validation = (0, validate_1.default)(req.body, {
        slug: "required",
        title: "required",
        content: "required",
    });
    // Invalid request
    if (validation.invalid)
        return res.json({
            status: 400,
            errors: validation.errors,
            message: "Invalid request",
        });
    // Get request body
    const { slug, title, content, summary, authorId, photo, categoryIds } = req.body;
    // Create new article
    const article = await article_1.default.store({
        slug, title, content, summary, authorId, photo, categoryIds,
    });
    // Failed to create new article
    if (article === null)
        return res.json({
            status: 500,
            message: "Create new article failed",
        });
    // All is well
    return res.json({
        status: 200,
        message: "Create new article success",
        data: article,
    });
});
// Get article by id
router.get('/:articleId', async (req, res) => {
    const articleId = req.params.articleId;
    const article = await article_1.default.get(articleId);
    if (article === null)
        return res.json({
            status: 404,
            message: `Failed to get article with id ${articleId}`,
            data: null,
        });
    return res.json({
        status: 200,
        message: `Get article with id ${articleId} success`,
        data: article,
    });
});
// Update article by id
router.put('/:articleId', async (req, res) => {
    const articleId = req.params.articleId;
    // Check if article exists
    const articleExists = (await article_1.default.get(articleId)) !== null;
    if (!articleExists)
        return res.json({
            status: 404,
            message: `There is no article with id ${articleId}`,
            data: null,
        });
    // Get request body
    const { slug, title, content, summary, authorId, photo, categoryIds } = req.body;
    // Update article
    const article = await article_1.default.update(articleId, {
        slug, title, content, summary, authorId, photo, categoryIds
    });
    // Failed to update article
    if (article === null)
        return res.json({
            status: 500,
            message: `Update article with id ${articleId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Update article with id ${articleId} success`,
        data: article,
    });
});
// Archive article by id
router.put('/:articleId/archive', async (req, res) => {
    const articleId = req.params.articleId;
    // Check if article exists
    const articleExists = (await article_1.default.get(articleId)) !== null;
    if (!articleExists)
        return res.json({
            status: 404,
            message: `There is no article with id ${articleId}`,
            data: null,
        });
    // Update article
    const article = await article_1.default.update(articleId, {
        publishedAt: null,
        deletedAt: luxon_1.DateTime.now().toJSDate(),
    });
    // Failed to archive article
    if (article === null)
        return res.json({
            status: 500,
            message: `Archive article with id ${articleId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Archive article with id ${articleId} success`,
        data: article,
    });
});
// Unarchive article by id
router.put('/:articleId/unarchive', async (req, res) => {
    const articleId = req.params.articleId;
    // Check if article exists
    const articleExists = (await article_1.default.get(articleId)) !== null;
    if (!articleExists)
        return res.json({
            status: 404,
            message: `There is no article with id ${articleId}`,
            data: null,
        });
    // Update article
    const article = await article_1.default.update(articleId, {
        deletedAt: null,
    });
    // Failed to unarchive article
    if (article === null)
        return res.json({
            status: 500,
            message: `Unarchive article with id ${articleId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Unarchive article with id ${articleId} success`,
        data: article,
    });
});
// Publish article by id
router.put('/:articleId/publish', async (req, res) => {
    const articleId = req.params.articleId;
    // Check if article exists
    const articleExists = (await article_1.default.get(articleId)) !== null;
    if (!articleExists)
        return res.json({
            status: 404,
            message: `There is no article with id ${articleId}`,
            data: null,
        });
    // Update article
    const article = await article_1.default.update(articleId, {
        publishedAt: luxon_1.DateTime.now().toJSDate(),
    });
    // Failed to publish article
    if (article === null)
        return res.json({
            status: 500,
            message: `Publish article with id ${articleId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Publish article with id ${articleId} success`,
        data: article,
    });
});
// Unpublish article by id
router.put('/:articleId/unpublish', async (req, res) => {
    const articleId = req.params.articleId;
    // Check if article exists
    const articleExists = (await article_1.default.get(articleId)) !== null;
    if (!articleExists)
        return res.json({
            status: 404,
            message: `There is no article with id ${articleId}`,
            data: null,
        });
    // Update article
    const article = await article_1.default.update(articleId, {
        publishedAt: null,
    });
    // Failed to unpublish article
    if (article === null)
        return res.json({
            status: 500,
            message: `Unpublish article with id ${articleId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Unpublish article with id ${articleId} success`,
        data: article,
    });
});
// Delete article by id
router.delete('/:articleId', async (req, res) => {
    const articleId = req.params.articleId;
    const article = await article_1.default.delete(articleId);
    if (article === null)
        return res.json({
            status: 404,
            message: `Failed to delete article with id ${articleId}`,
            data: null,
        });
    return res.json({
        status: 200,
        message: `Delete article with id ${articleId} success`,
        data: article,
    });
});
