/* webpack.config.js */
module.exports = {
    context: __dirname + "/src",
    entry: [ "./goatstone/index.js" ],
    output: {
	    path: __dirname + "/dist",
        filename: "bundle.js"
    },
    devtool: 'source-map'
}