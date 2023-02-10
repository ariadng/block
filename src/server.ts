// * Imports
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApiRouter } from './api/routes';
import path from 'path';

// * Configurations
function config (app: Express) {
	// Environment variables
	dotenv.config();
	// Body parser middleware
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	// CORS
	app.use(cors());
	// Static Files
	app.use('/static', express.static(path.join(__dirname, '../files')));
	app.use(express.static(path.join(__dirname, '../public')));
}

// * Load routes
function loadRoutes (app: Express) {
	app.use('/api', ApiRouter);
	// Catch all requests that don't match any route
    app.get("*", (req, res) => {
		res.sendFile(
			path.join(__dirname, "../public/index.html")
		);
    });
}

// * Start server
export function start () {
	const app: Express = express();
	const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
	config(app);
	loadRoutes(app);
	app.listen(port, '0.0.0.0', () => {
		console.log(`[Server] Running on port ${port}...`)
	});
}