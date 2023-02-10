"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContentRouter = void 0;
const express_1 = require("express");
const page_1 = __importDefault(require("../models/page"));
const router = (0, express_1.Router)();
exports.PageContentRouter = router;
// Get page by slug
router.get('/:slug', async (req, res) => {
    const slug = req.params.slug;
    const page = await page_1.default.getBySlug(slug);
    if (page === null)
        return res.json({
            status: 404,
            message: `Failed to get page with slug ${slug}`,
            data: null,
        });
    return res.json({
        status: 200,
        message: `Get page with slug ${slug} success`,
        data: page,
    });
});
