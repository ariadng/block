import { Request, Response, Router } from "express";
import { DateTime } from "luxon";
import ComponentModel from "../models/component";
import validate from "../utils/validate";

const router = Router();

// List all components
router.get('/', async (req: Request, res: Response) => {
	const components = await ComponentModel.index();
	return res.json({
		status: 200,
		message: "Get components success",
		data: components,
	});
});


// Create new component
router.post('/', async (req: Request, res: Response) => {

	// Validate request body
	const validation = validate(req.body, {
		name: "required",
		content: "required",
	});

	// Invalid request
	if (validation.invalid) return res.json({
		status: 400,
		errors: validation.errors,
		message: "Invalid request",
	});

	// Get request body
	const { name, content } = req.body;

	// Create new component
	const component = await ComponentModel.store({
		name, content
	});

	// Failed to create new component
	if (component === null) return res.json({
		status: 500,
		message: "Create new component failed",
	});

	// All is well
	return res.json({
		status: 200,
		message: "Create new component success",
		data: component,
	});

	
});

// Get component by slug
router.get('/:slug', async (req: Request, res: Response) => {
	const slug = req.params.slug;
	const component = await ComponentModel.get(slug);
	if (component === null) return res.json({
		status: 404,
		message: `Failed to get component with slug ${slug}`,
		data: null,
	});
	return res.json({
		status: 200,
		message: `Get component with slug ${slug} success`,
		data: component,
	});
});

// Update component by slug
router.put('/:slug', async (req: Request, res: Response) => {
	const slug = req.params.slug;

	// Check if component exists
	const componentExists = (await ComponentModel.get(slug)) !== null;
	if (!componentExists) return res.json({
		status: 404,
		message: `There is no component with slug ${slug}`,
		data: null,
	});

	// Get request body
	const { name, content } = req.body;

	// Update component
	const component = await ComponentModel.update(slug, {
		name, content
	});

	// Failed to update page
	if (component === null) return res.json({
		status: 500,
		message: `Update component with slug ${slug} failed`,
	});

	// All is well
	return res.json({
		status: 200,
		message: `Update page with slug ${slug} success`,
		data: slug,
	});
});

// Delete component by slug
router.delete('/:slug', async (req: Request, res: Response) => {
	const slug = req.params.slug;
	const component = await ComponentModel.delete(slug);
	if (component === null) return res.json({
		status: 404,
		message: `Failed to delete component with slug ${slug}`,
		data: null,
	});

	return res.json({
		status: 200,
		message: `Delete component with slug ${slug} success`,
		data: component,
	});
});

export { router as ComponentRouter };