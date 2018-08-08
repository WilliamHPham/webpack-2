//const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    plugins:[
        // Generates default index.html
        new HtmlWebpackPlugin(),
        // Generate a index.bundle.html
        new HtmlWebpackPlugin({
            title: 'Webpack 2',
            // minify:
            // {
            //     collapseWhitespace: true
            // },
            hash: true,
            filename: './index.bundle.html',
            template: './src/index.html'
        })
    ]
}