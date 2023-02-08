import { Request, Response, Router } from "express";
import { DateTime } from "luxon";
import ArticleModel from "../models/article";
import validate from "../utils/validate";

const router = Router();

// List all articles
router.get('/', async (req: Request, res: Response) => {
	const articles = await ArticleModel.index();
	return res.json({
		status: 200,
		message: "Get articles success",
		data: articles,
	});
});


// Create new article
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
	const { slug, title, content, summary, authorId, photo } = req.body;

	// Create new article
	const article = await ArticleModel.store({
		slug, title, content, summary, authorId, photo
	});

	// Failed to create new article
	if (article === null) return res.json({
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
router.get('/:articleId', async (req: Request, res: Response) => {
	const articleId = req.params.articleId;
	const article = await ArticleModel.get(articleId);
	if (article === null) return res.json({
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
router.put('/:articleId', async (req: Request, res: Response) => {
	const articleId = req.params.articleId;

	// Check if article exists
	const articleExists = (await ArticleModel.get(articleId)) !== null;
	if (!articleExists) return res.json({
		status: 404,
		message: `There is no article with id ${articleId}`,
		data: null,
	});

	// Get request body
	const { slug, title, content, summary, authorId, photo, categoryIds } = req.body;

	// Update article
	const article = await ArticleModel.update(articleId, {
		slug, title, content, summary, authorId, photo, categoryIds
	});

	// Failed to update article
	if (article === null) return res.json({
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
router.put('/:articleId/archive', async (req: Request, res: Response) => {
	const articleId = req.params.articleId;

	// Check if article exists
	const articleExists = (await ArticleModel.get(articleId)) !== null;
	if (!articleExists) return res.json({
		status: 404,
		message: `There is no article with id ${articleId}`,
		data: null,
	});

	// Update article
	const article = await ArticleModel.update(articleId, {
		publishedAt: null,
		deletedAt: DateTime.now().toJSDate(),
	});

	// Failed to archive article
	if (article === null) return res.json({
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
router.put('/:articleId/unarchive', async (req: Request, res: Response) => {
	const articleId = req.params.articleId;

	// Check if article exists
	const articleExists = (await ArticleModel.get(articleId)) !== null;
	if (!articleExists) return res.json({
		status: 404,
		message: `There is no article with id ${articleId}`,
		data: null,
	});

	// Update article
	const article = await ArticleModel.update(articleId, {
		deletedAt: null,
	});

	// Failed to unarchive article
	if (article === null) return res.json({
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
router.put('/:articleId/publish', async (req: Request, res: Response) => {
	const articleId = req.params.articleId;

	// Check if article exists
	const articleExists = (await ArticleModel.get(articleId)) !== null;
	if (!articleExists) return res.json({
		status: 404,
		message: `There is no article with id ${articleId}`,
		data: null,
	});

	// Update article
	const article = await ArticleModel.update(articleId, {
		publishedAt: DateTime.now().toJSDate(),
	});

	// Failed to publish article
	if (article === null) return res.json({
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
router.put('/:articleId/unpublish', async (req: Request, res: Response) => {
	const articleId = req.params.articleId;

	// Check if article exists
	const articleExists = (await ArticleModel.get(articleId)) !== null;
	if (!articleExists) return res.json({
		status: 404,
		message: `There is no article with id ${articleId}`,
		data: null,
	});

	// Update article
	const article = await ArticleModel.update(articleId, {
		publishedAt: null,
	});

	// Failed to unpublish article
	if (article === null) return res.json({
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
router.delete('/:articleId', async (req: Request, res: Response) => {
	const articleId = req.params.articleId;
	const article = await ArticleModel.delete(articleId);
	if (article === null) return res.json({
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

export { router as ArticleRouter };