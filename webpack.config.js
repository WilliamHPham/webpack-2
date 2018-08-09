var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: 'pug-html-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 9000
    },
    plugins: [
        // Generates default index.html
        // new HtmlWebpackPlugin(),
        // Generate a index.bundle.html
        // new HtmlWebpackPlugin({
        //     title: 'Webpack 2',
        //     minify:
        //     {
        //         collapseWhitespace: true
        //     },
        //     hash: true,
        //     excludeChunks: ['contact'],
        //     filename: 'index.html',
        //     template: './src/index.html'
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Contact Page',
        //     hash: true,
        //     chunks: ['contact'],
        //     filename: 'contact.html',
        //     template: './src/contact.html'
        // }),
        new HtmlWebpackPlugin({
            title: 'PUG',
            hash: true,
            excludeChunks: ['contact'],
            template: './src/index.pug'
        }),
        new ExtractTextPlugin({
            filename: 'app.bundle.css',
            disable: true,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        //enable HMR globally
        new webpack.NamedModulesPlugin()

    ]
}