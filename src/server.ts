// * Imports
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApiRouter } from './api/routes';
import { AdminRouter } from './admin/routes';
import { SiteRouter } from './site/routes';

// * Configurations
function config (app: Express) {
	// Environment variables
	dotenv.config();
	// Body parser middleware
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	// CORS
	app.use(cors());
}

// * Load routes
function loadRoutes (app: Express) {
	app.use('/api', ApiRouter);
	// app.use('/admin', AdminRouter);
	app.use('/', SiteRouter);
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