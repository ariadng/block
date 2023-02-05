import { Request, Response, Router } from "express";
import { AdminMiddleware, AuthMiddleware } from "../auth/auth.middleware";
import { AuthRouter } from "../auth/auth.routes";
import { UserRouter } from "../resources/user.resource";

const router = Router();

router.get('/', (req: Request, res: Response) => res.send("API"));
router.use('/auth', AuthRouter);
router.use('/user', AuthMiddleware, AdminMiddleware, UserRouter);

export { router as ApiRouter };