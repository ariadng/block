"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = require("express");
const category_1 = __importDefault(require("../models/category"));
const validate_1 = __importDefault(require("../utils/validate"));
const router = (0, express_1.Router)();
exports.CategoryRouter = router;
// List all categories
router.get('/', async (req, res) => {
    const categories = await category_1.default.index();
    return res.json({
        status: 200,
        message: "Get categories success",
        data: categories,
    });
});
// Create new category
router.post('/', async (req, res) => {
    // Validate request body
    const validation = (0, validate_1.default)(req.body, {
        slug: "required",
        title: "required",
    });
    // Invalid request
    if (validation.invalid)
        return res.json({
            status: 400,
            errors: validation.errors,
            message: "Invalid request",
        });
    // Get request body
    const { slug, title } = req.body;
    // Create new category
    const category = await category_1.default.store({
        slug, title
    });
    // Failed to create new category
    if (category === null)
        return res.json({
            status: 500,
            message: "Create new category failed",
        });
    // All is well
    return res.json({
        status: 200,
        message: "Create new category success",
        data: category,
    });
});
// Get category by id
router.get('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await category_1.default.get(categoryId);
    if (category === null)
        return res.json({
            status: 404,
            message: `Failed to get category with id ${categoryId}`,
            data: null,
        });
    return res.json({
        status: 200,
        message: `Get category with id ${categoryId} success`,
        data: category,
    });
});
// Update category by id
router.put('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    // Check if category exists
    const categoryExists = (await category_1.default.get(categoryId)) !== null;
    if (!categoryExists)
        return res.json({
            status: 404,
            message: `There is no category with id ${categoryId}`,
            data: null,
        });
    // Get request body
    const { slug, title } = req.body;
    // Update category
    const category = await category_1.default.update(categoryId, {
        slug, title
    });
    // Failed to update category
    if (category === null)
        return res.json({
            status: 500,
            message: `Update category with id ${categoryId} failed`,
        });
    // All is well
    return res.json({
        status: 200,
        message: `Update category with id ${categoryId} success`,
        data: category,
    });
});
// Delete category by id
router.delete('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await category_1.default.delete(categoryId);
    if (category === null)
        return res.json({
            status: 404,
            message: `Failed to delete category with id ${categoryId}`,
            data: null,
        });
    return res.json({
        status: 200,
        message: `Delete category with id ${categoryId} success`,
        data: category,
    });
});
