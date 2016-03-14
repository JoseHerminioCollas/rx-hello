/* webpack.config.js */

module.exports = {
	context: __dirname + "/src",
	entry: [ "./goatstone/index.js" ],
	output: {
	    path: __dirname + "/dist",
	    filename: "bundle.js"
	},
	devtool: 'source-map',
	module: {
		loaders: [{
		  test: /\.js$/,
		  exclude: /node_modules/,
	  	loader: 'babel-loader'
	  	,
	  	query: {
	    	presets: ["react", "es2015" ]
	  	}
	
		} ]
	}
}