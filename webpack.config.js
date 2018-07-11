const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: "development", 
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
			}
		]
	},
    devtool: 'eval-sourcemap',
	plugins: [new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
		})],
    devServer: {
		contentBase: './src',
		port: 9000
	}
}