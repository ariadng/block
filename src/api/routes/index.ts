import { Request, Response, Router } from "express";
import { getAccount, updateAccount } from "../auth/account.routes";
import { AdminMiddleware, AuthMiddleware } from "../auth/auth.middleware";
import { AuthRouter } from "../auth/auth.routes";
import { UserRouter } from "../resources/user.resource";

const router = Router();

router.get('/', (req: Request, res: Response) => res.send("API"));
router.use('/auth', AuthRouter);
router.use('/user', AuthMiddleware, AdminMiddleware, UserRouter);

// Account
router.get('/auth/account', AuthMiddleware, getAccount);
router.put('/auth/account', AuthMiddleware, updateAccount);

export { router as ApiRouter };