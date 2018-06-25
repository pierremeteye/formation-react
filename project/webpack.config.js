const webpack = require('webpack'),
path = require('path');

let config = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "./main.js"
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: '/nodes_modules/',
			use : {
				loader: "babel-loader"
			}
		}
		],
	},
	devServer: {
		contentBase: path.resolve('.'),
		watchOptions: {
			ignored: ['node_modules', 'src']
		},
		historyApiFallback: true,
		inline: true,
		open: true,
		hot: true
	},
	devtool: "eval-source-map"
}

module.exports = config;