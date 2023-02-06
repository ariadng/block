import { Request, Response, Router } from "express";
import ArticleModel from "../models/article";

const router = Router();

// Get article by slug
router.get('/:slug', async (req: Request, res: Response) => {
	const slug = req.params.slug;
	const article = await ArticleModel.getBySlug(slug);
	if (article === null) return res.json({
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
export { router as ArticleContentRouter };