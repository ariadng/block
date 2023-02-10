"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleContentRouter = void 0;
const express_1 = require("express");
const article_1 = __importDefault(require("../models/article"));
const router = (0, express_1.Router)();
exports.ArticleContentRouter = router;
// Get article by slug
router.get('/:slug', async (req, res) => {
    const slug = req.params.slug;
    const article = await article_1.default.getBySlug(slug);
    if (article === null)
        return res.json({
            status: 404,
            message: `Failed to get article with slug ${slug}`,
            data: null,
        });
    return res.json({
        status: 200,
        message: `Get article with slug ${slug} success`,
        data: article,
    });
});
