import { Request, Response, Router } from "express";
import { DateTime } from "luxon";
import PageModel from "../models/page";
import validate from "../utils/validate";

const router = Router();

// List all pages
router.get('/', async (req: Request, res: Response) => {
	const pages = await PageModel.index();
	return res.json({
		status: 200,
		message: "Get pages success",
		data: pages,
	});
});


// Create new page
router.post('/', async (req: Request, res: Response) => {

	// Validate request body
	const validation = validate(req.body, {
		slug: "required",
		title: "required",
		content: "required",
	});

	// Invalid request
	if (validation.invalid) return res.json({
		status: 400,
		errors: validation.errors,
		message: "Invalid request",
	});

	// Get request body
	const { slug, title, content, summary } = req.body;

	// Create new page
	const page = await PageModel.store({
		slug, title, content, summary
	});

	// Failed to create new page
	if (page === null) return res.json({
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
router.get('/:pageId', async (req: Request, res: Response) => {
	const pageId = req.params.pageId;
	const page = await PageModel.get(pageId);
	if (page === null) return res.json({
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
router.put('/:pageId', async (req: Request, res: Response) => {
	const pageId = req.params.pageId;

	// Check if page exists
	const pageExists = (await PageModel.get(pageId)) !== null;
	if (!pageExists) return res.json({
		status: 404,
		message: `There is no page with id ${pageId}`,
		data: null,
	});

	// Get request body
	const { slug, title, content, summary } = req.body;

	// Update page
	const page = await PageModel.update(pageId, {
		slug, title, content, summary
	});

	// Failed to update page
	if (page === null) return res.json({
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
router.put('/:pageId/archive', async (req: Request, res: Response) => {
	const pageId = req.params.pageId;

	// Check if page exists
	const pageExists = (await PageModel.get(pageId)) !== null;
	if (!pageExists) return res.json({
		status: 404,
		message: `There is no page with id ${pageId}`,
		data: null,
	});

	// Update page
	const page = await PageModel.update(pageId, {
		publishedAt: null,
		deletedAt: DateTime.now().toJSDate(),
	});

	// Failed to archive page
	if (page === null) return res.json({
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
router.put('/:pageId/unarchive', async (req: Request, res: Response) => {
	const pageId = req.params.pageId;

	// Check if page exists
	const pageExists = (await PageModel.get(pageId)) !== null;
	if (!pageExists) return res.json({
		status: 404,
		message: `There is no page with id ${pageId}`,
		data: null,
	});

	// Update page
	const page = await PageModel.update(pageId, {
		deletedAt: null,
	});

	// Failed to unarchive page
	if (page === null) return res.json({
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
router.put('/:pageId/publish', async (req: Request, res: Response) => {
	const pageId = req.params.pageId;

	// Check if page exists
	const pageExists = (await PageModel.get(pageId)) !== null;
	if (!pageExists) return res.json({
		status: 404,
		message: `There is no page with id ${pageId}`,
		data: null,
	});

	// Update page
	const page = await PageModel.update(pageId, {
		publishedAt: DateTime.now().toJSDate(),
	});

	// Failed to publish page
	if (page === null) return res.json({
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
router.put('/:pageId/unpublish', async (req: Request, res: Response) => {
	const pageId = req.params.pageId;

	// Check if page exists
	const pageExists = (await PageModel.get(pageId)) !== null;
	if (!pageExists) return res.json({
		status: 404,
		message: `There is no page with id ${pageId}`,
		data: null,
	});

	// Update page
	const page = await PageModel.update(pageId, {
		publishedAt: null,
	});

	// Failed to unpublish page
	if (page === null) return res.json({
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
router.delete('/:pageId', async (req: Request, res: Response) => {
	const pageId = req.params.pageId;
	const page = await PageModel.delete(pageId);
	if (page === null) return res.json({
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

export { router as PageRouter };