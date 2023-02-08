const path = require("path");
const DotEnv = require("dotenv-webpack");

module.exports = {
	mode	: "development",
	entry	: "./src/app/index.tsx",
	output	: {
		path		: path.resolve(__dirname, "public"),
		filename	: "main.js",
		publicPath	: '/',
	},
	target		: "web",
	devServer	: {
		port	: 4000,
		static	: [
			"./public"
		],
		open		: true,
		hot			: true,
		liveReload	: true,
		proxy		: {
			'/api': {
				target: 'http://localhost:4000',
				router: () => 'http://localhost:3000',
				secure: false,
				changeOrigin: true,
			},
			'/static': {
				target: 'http://localhost:4000',
				router: () => 'http://localhost:3000',
				secure: false,
				changeOrigin: true,
			}
		},
		historyApiFallback: true,
	},
	resolve	: {
		extensions	: [
			".js", ".jsx",
			".ts", ".tsx",
			".json"
		]
	},
	module	: {
		rules	: [
			{
				test	: /\.(js|ts)x?$/,
				exclude	: /node_modules/,
				use		: "babel-loader"
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
				// Creates `style` nodes from JS strings
				"style-loader",
				// Translates CSS into CommonJS
				"css-loader",
				// Compiles Sass to CSS
				"sass-loader",
				],
			},
		]
	},
	plugins: [
		new DotEnv({ systemvars: true }),
	]
};