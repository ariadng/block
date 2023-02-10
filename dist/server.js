"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
// * Imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./api/routes");
const path_1 = __importDefault(require("path"));
// * Configurations
function config(app) {
    // Environment variables
    dotenv_1.default.config();
    // Body parser middleware
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    // CORS
    app.use((0, cors_1.default)());
    // Static Files
    app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../files')));
    app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
}
// * Load routes
function loadRoutes(app) {
    app.use('/api', routes_1.ApiRouter);
    // Catch all requests that don't match any route
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
    });
}
// * Start server
function start() {
    const app = (0, express_1.default)();
    const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
    config(app);
    loadRoutes(app);
    app.listen(port, '0.0.0.0', () => {
        console.log(`[Server] Running on port ${port}...`);
    });
}
exports.start = start;
