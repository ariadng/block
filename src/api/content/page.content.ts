import { Request, Response, Router } from "express";
import PageModel from "../models/page";

const router = Router();

// Get page by slug
router.get('/:slug', async (req: Request, res: Response) => {
	const slug = req.params.slug;
	const page = await PageModel.getBySlug(slug);
	if (page === null) return res.json({
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
export { router as PageContentRouter };