"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const express_1 = require("express");
const account_routes_1 = require("../auth/account.routes");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_routes_1 = require("../auth/auth.routes");
const file_resource_1 = require("../resources/file.resource");
const user_resource_1 = require("../resources/user.resource");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const page_resource_1 = require("../resources/page.resource");
const page_content_1 = require("../content/page.content");
const article_resource_1 = require("../resources/article.resource");
const article_content_1 = require("../content/article.content");
const category_resource_1 = require("../resources/category.resource");
const router = (0, express_1.Router)();
exports.ApiRouter = router;
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'files/');
        },
        filename: (req, file, cb) => {
            cb(null, (0, uuid_1.v4)().replaceAll('-', '') + '.' + file.mimetype.split('/')[1]);
        }
    })
});
router.get('/', (req, res) => res.send("API"));
router.use('/auth', auth_routes_1.AuthRouter);
router.use('/file', auth_middleware_1.AuthMiddleware, upload.single("file"), file_resource_1.FileRouter);
router.use('/user', auth_middleware_1.AuthMiddleware, auth_middleware_1.AdminMiddleware, user_resource_1.UserRouter);
router.use('/page', auth_middleware_1.AuthMiddleware, auth_middleware_1.AdminMiddleware, page_resource_1.PageRouter);
router.use('/article', auth_middleware_1.AuthMiddleware, auth_middleware_1.AdminMiddleware, article_resource_1.ArticleRouter);
router.use('/category', auth_middleware_1.AuthMiddleware, auth_middleware_1.AdminMiddleware, category_resource_1.CategoryRouter);
// Content
router.use('/content/page', page_content_1.PageContentRouter);
router.use('/content/article', article_content_1.ArticleContentRouter);
// Account
router.get('/auth/account', auth_middleware_1.AuthMiddleware, account_routes_1.getAccount);
router.put('/auth/account', auth_middleware_1.AuthMiddleware, account_routes_1.updateAccount);
