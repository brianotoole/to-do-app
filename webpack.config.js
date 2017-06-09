const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: './dist/js/build.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.
				    extract({
              fallback: 'style-loader',
              use: ['css-loader','sass-loader']
				    })

			},
		],
	},
	plugins: [
	    new ExtractTextPlugin('./dist/css/style.css')
      //new BrowserSyncPlugin({
      //        open: 'external',
      //        proxy: 'localhost',
      //        port: 3000,
      //        files: ['src/**/*.{html,js,css}']
      //    })
	]
};
