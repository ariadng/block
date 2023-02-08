import { NextFunction, Request, Response, Router } from "express";

const router = Router();

// Upload file
router.post('/', async (req: Request, res: Response) => {
	if (req.file) return res.json({
		status: 200,
		data: {
			path: '/static/' + req.file.filename,
		}
	});
	// Failed
	return res.json({
		status: 500,
	})
});

export { router as FileRouter };