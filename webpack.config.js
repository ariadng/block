const path = require("path");

module.exports = {
	mode	: "development",
	entry	: "./src/app/index.tsx",
	output	: {
		path	: path.resolve(__dirname, "public"),
		filename: "main.js",
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
	}
};