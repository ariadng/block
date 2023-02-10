"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.FileRouter = router;
// Upload file
router.post('/', async (req, res) => {
    if (req.file)
        return res.json({
            status: 200,
            data: {
                path: '/static/' + req.file.filename,
            }
        });
    // Failed
    return res.json({
        status: 500,
    });
});
