"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRouter = void 0;
const express_1 = require("express");
const luxon_1 = require("luxon");
const page_1 = __importDefault(require("../models/page"));
const validate_1 = __importDefault(require("../utils/validate"));
const router = (0, express_1.Router)();
exports.PageRouter = router;
// List all pages
router.get('/', async (req, res) => {
    const pages = await page_1.default.index();
    return res.json({
        status: 200,
        message: "Get pages success",
        data: pages,
    });
});
// Create new page
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
    const { slug, title, content, summary } = req.body;
    // Create new page
    const page = await page_1.default.store({
        slug, title, content, summary
    });
    // Failed to create new page
    if (page === null)
        return res.json({
            status: 500,
            message: "Create new page failed",
        });
    // All is well
    return res.json({
        status: 200,
        message: "Create new page success",
        data: page,
    });
});
// Get page by id
router.get('/:pageId', async (req, res) => {
    const pageId = req.params.pageId;
    const page = await page_1.default.get(pageId);
    if (page === null)
        return res.json({
            status: 404,
            message: `Failed to get page with id ${pageId}`,
            data: null,
        });
    return res.json({
        status: 200,
        message: `Get page with id ${pageId} success`,
        data: page,
    });
});
// Update page by id
router.put('/:pageId', async (req, res) => {
    const pageId = req.params.pageId;
    // Check if page exists
    const pageExists = (await page_1.default.get(pageId)) !== null;
    if (!pageExists)
        return res.json({
            status: 404,
            message: `There is no page with id ${pageId}`,
            data: null,
        });
    // Get request body
    const { slug, title, content, summary } = req.body;
    // Update page
    const page = await page_1.default.update(pageId, {
        slug, title, content, summary
    });
    // Failed to update page
    if (page === null)
        return res.json({
            status: 500,
            message: `Update page with id ${pageId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Update page with id ${pageId} success`,
        data: page,
    });
});
// Archive page by id
router.put('/:pageId/archive', async (req, res) => {
    const pageId = req.params.pageId;
    // Check if page exists
    const pageExists = (await page_1.default.get(pageId)) !== null;
    if (!pageExists)
        return res.json({
            status: 404,
            message: `There is no page with id ${pageId}`,
            data: null,
        });
    // Update page
    const page = await page_1.default.update(pageId, {
        publishedAt: null,
        deletedAt: luxon_1.DateTime.now().toJSDate(),
    });
    // Failed to archive page
    if (page === null)
        return res.json({
            status: 500,
            message: `Archive page with id ${pageId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Archive page with id ${pageId} success`,
        data: page,
    });
});
// Unarchive page by id
router.put('/:pageId/unarchive', async (req, res) => {
    const pageId = req.params.pageId;
    // Check if page exists
    const pageExists = (await page_1.default.get(pageId)) !== null;
    if (!pageExists)
        return res.json({
            status: 404,
            message: `There is no page with id ${pageId}`,
            data: null,
        });
    // Update page
    const page = await page_1.default.update(pageId, {
        deletedAt: null,
    });
    // Failed to unarchive page
    if (page === null)
        return res.json({
            status: 500,
            message: `Unarchive page with id ${pageId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Unarchive page with id ${pageId} success`,
        data: page,
    });
});
// Publish page by id
router.put('/:pageId/publish', async (req, res) => {
    const pageId = req.params.pageId;
    // Check if page exists
    const pageExists = (await page_1.default.get(pageId)) !== null;
    if (!pageExists)
        return res.json({
            status: 404,
            message: `There is no page with id ${pageId}`,
            data: null,
        });
    // Update page
    const page = await page_1.default.update(pageId, {
        publishedAt: luxon_1.DateTime.now().toJSDate(),
    });
    // Failed to publish page
    if (page === null)
        return res.json({
            status: 500,
            message: `Publish page with id ${pageId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Publish page with id ${pageId} success`,
        data: page,
    });
});
// Unpublish page by id
router.put('/:pageId/unpublish', async (req, res) => {
    const pageId = req.params.pageId;
    // Check if page exists
    const pageExists = (await page_1.default.get(pageId)) !== null;
    if (!pageExists)
        return res.json({
            status: 404,
            message: `There is no page with id ${pageId}`,
            data: null,
        });
    // Update page
    const page = await page_1.default.update(pageId, {
        publishedAt: null,
    });
    // Failed to unpublish page
    if (page === null)
        return res.json({
            status: 500,
            message: `Unpublish page with id ${pageId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Unpublish page with id ${pageId} success`,
        data: page,
    });
});
// Delete page by id
router.delete('/:pageId', async (req, res) => {
    const pageId = req.params.pageId;
    const page = await page_1.default.delete(pageId);
    if (page === null)
        return res.json({
            status: 404,
            message: `Failed to delete page with id ${pageId}`,
            data: null,
        });
    return res.json({
        status: 200,
        message: `Delete page with id ${pageId} success`,
        data: page,
    });
});
