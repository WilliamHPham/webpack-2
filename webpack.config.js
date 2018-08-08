const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        // Generates default index.html
        new HtmlWebpackPlugin(),
        // Generate a index.bundle.html
        new HtmlWebpackPlugin({
            title: 'Webpack 2',
            minify:
            {
                collapseWhitespace: true
            },
            hash: true,
            filename: './index.bundle.html',
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'app.bundle.css',
            disable: false,
            allChunks: true
        })
    ]
}