import { Request, Response, Router } from "express";
import { getAccount, updateAccount } from "../auth/account.routes";
import { AdminMiddleware, AuthMiddleware } from "../auth/auth.middleware";
import { AuthRouter } from "../auth/auth.routes";
import { FileRouter } from "../resources/file.resource";
import { UserRouter } from "../resources/user.resource";

import multer from "multer";
import { v4 as uuid } from "uuid";
import { PageRouter } from "../resources/page.resource";
import { PageContentRouter } from "../content/page.content";
import { ArticleRouter } from "../resources/article.resource";

const router = Router();
const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'files/');
		},
		filename: (req, file, cb) => {
			cb(null, uuid().replaceAll('-', '') + '.' + file.mimetype.split('/')[1]);
		}
	})
});

router.get('/', (req: Request, res: Response) => res.send("API"));
router.use('/auth', AuthRouter);
router.use('/file', AuthMiddleware, upload.single("file"), FileRouter);
router.use('/user', AuthMiddleware, AdminMiddleware, UserRouter);
router.use('/page', AuthMiddleware, AdminMiddleware, PageRouter);
router.use('/article', AuthMiddleware, AdminMiddleware, ArticleRouter);

router.use('/content/page', PageContentRouter);

// Account
router.get('/auth/account', AuthMiddleware, getAccount);
router.put('/auth/account', AuthMiddleware, updateAccount);

export { router as ApiRouter };