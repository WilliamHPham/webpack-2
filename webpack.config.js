var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var isProd = process.env.NODE_ENV === 'production'; //true or fasle
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssPro = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});
var cssConfig = isProd ? cssPro : cssDev; //if isProd true -> use cssPro


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
            //for HRM and use npm run prod
            {
                test: /\.scss$/,
                use: cssConfig
            },
            // for HRM and use npm run dev
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: 'pug-html-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    // 'file-loader',
                    // {
                    //     options:
                    //     {
                    //         name: 'images/[name].[ext]?[hash]'
                    //     },
                    //     loader: 'image-webpack-loader',
                    // },
                    'file-loader?name=images/[name].[ext]?[hash]',
                    'image-webpack-loader',    
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        open: true,
        port: 9000
    },
    plugins: [
        // Generates default index.html
        // new HtmlWebpackPlugin(),

        // Generate a index.bundle.html
        new HtmlWebpackPlugin({
            title: 'Webpack 2',
            minify:
            {
                collapseWhitespace: true
            },
            hash: true,
            excludeChunks: ['contact'],
            filename: 'index.html',
            template: './src/index.html'
        }),

        // new HtmlWebpackPlugin({
        //     title: 'Contact Page',
        //     hash: true,
        //     chunks: ['contact'],
        //     filename: 'contact.html',
        //     template: './src/contact.html'
        // }),

        //fix image in pug
        // new HtmlWebpackPlugin({
        //     title: 'PUG',
        //     hash: true,
        //     excludeChunks: ['contact'],
        //     template: './src/index.pug'
        // }),

        new ExtractTextPlugin({
            filename: 'app.bundle.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        //enable HMR globally
        new webpack.NamedModulesPlugin()

    ]
}