const path = require("path");

module.exports = {
	mode	: "development",
	entry	: "./src/app/index.js",
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
			".json"
		]
	},
	module	: {
		rules	: [
			{
				test	: /\.(js|jsx)$/,
				exclude	: /node_modules/,
				use		: "babel-loader"
			}
		]
	}
};