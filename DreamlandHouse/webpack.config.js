const path = require("path");

module.exports = {
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "index.bundle.js",
		publicPath: "/",
	},
	devServer: {
		port: 3000,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpg)$/i,
				type: "asset",
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // Inline images under 10KB
					},
				},
				generator: {
					filename: "images/[name]-[hash][ext]",
				},
			},
		],
	},
};
