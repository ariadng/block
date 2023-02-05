import { Request, Response, Router } from "express";
import { AuthRouter } from "../auth/auth.routes";

const router = Router();

router.get('/', (req: Request, res: Response) => res.send("API"));
router.use('/auth', AuthRouter);

export { router as ApiRouter };