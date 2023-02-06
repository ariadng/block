import { Request, Response, Router } from "express";
import { DateTime } from "luxon";
import CategoryModel from "../models/category";
import validate from "../utils/validate";

const router = Router();

// List all categories
router.get('/', async (req: Request, res: Response) => {
	const categories = await CategoryModel.index();
	return res.json({
		status: 200,
		message: "Get categories success",
		data: categories,
	});
});


// Create new category
router.post('/', async (req: Request, res: Response) => {

	// Validate request body
	const validation = validate(req.body, {
		slug: "required",
		title: "required",
	});

	// Invalid request
	if (validation.invalid) return res.json({
		status: 400,
		errors: validation.errors,
		message: "Invalid request",
	});

	// Get request body
	const { slug, title } = req.body;

	// Create new category
	const category = await CategoryModel.store({
		slug, title
	});

	// Failed to create new category
	if (category === null) return res.json({
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
router.get('/:categoryId', async (req: Request, res: Response) => {
	const categoryId = req.params.categoryId;
	const category = await CategoryModel.get(categoryId);
	if (category === null) return res.json({
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
router.put('/:categoryId', async (req: Request, res: Response) => {
	const categoryId = req.params.categoryId;

	// Check if category exists
	const categoryExists = (await CategoryModel.get(categoryId)) !== null;
	if (!categoryExists) return res.json({
		status: 404,
		message: `There is no category with id ${categoryId}`,
		data: null,
	});

	// Get request body
	const { slug, title } = req.body;

	// Update category
	const category = await CategoryModel.update(categoryId, {
		slug, title
	});

	// Failed to update category
	if (category === null) return res.json({
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
router.delete('/:categoryId', async (req: Request, res: Response) => {
	const categoryId = req.params.categoryId;
	const category = await CategoryModel.delete(categoryId);
	if (category === null) return res.json({
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

export { router as CategoryRouter };