const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: './dist/js/build.js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.
				    extract({
				       loader: 'css!sass'
				    })
				
			},
		],
	},
	plugins: [
	    new ExtractTextPlugin('./dist/css/style.css')
	],
	watch: true,
};