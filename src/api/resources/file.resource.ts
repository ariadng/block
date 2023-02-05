import { NextFunction, Request, Response, Router } from "express";

const router = Router();

// Upload file
router.post('/', async (req: Request, res: Response) => {
	return res.json({
		file: req.file,
		body: req.body
	})
});

export { router as FileRouter };