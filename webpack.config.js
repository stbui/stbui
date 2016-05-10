const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const pagePath = './page';

const widget = './widget';
const dist = './dist/';

var app = ['index', 'user', 'login', 'tabs', 'table'];


module.exports = {
    entry: {
        index: pagePath + '/index/index.js',
        tabs: pagePath + '/tabs/index.js',
        table: pagePath + '/table/index.js',
        user: pagePath + '/user/index.js',
        login: pagePath + '/login/index.js'
    },
    output: {
        path: dist,
        filename: 'js/[name].[hash].js',
        //publicPath: '../',
        chunkFilename: 'js/[id].js'
    },
    module: {
        loaders: [
            //{
            //    test: /\.js$/,
            //    loaders: ['babel?presets[]=es2015'],
            //    exclude: /node_modules/
            //},
             {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css!less')
            }, {
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }
        ]
    },
    plugins: [
        //new webpack.ProvidePlugin({
        //    $: "jquery",
        //    jQuery: "jquery",
        //    "window.jQuery": "jquery"
        //}),

        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'framework',
            chunks: ['index', 'user', 'login'],
            minChunks: 3
        }),
        new ExtractTextPlugin('css/[name].[hash].css', {
            allChunks: true,
            disable: false
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['framework', 'index'],
            filename: 'index.html',
            template: pagePath + '/index/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['framework', 'login'],
            filename: 'login.html',
            template: pagePath + '/login/index.html'
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['framework', 'user'],
            filename: 'user.html',
            template: pagePath + '/user/index.html'
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['framework', 'tabs'],
            filename: 'tabs.html',
            template: pagePath + '/tabs/index.html'
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['framework', 'table'],
            filename: 'table.html',
            template: pagePath + '/table/index.html'
        }),

        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist/',
        host: '172.16.97.13',
        port: 1111,
        inline: true,
        hot: true
    }
};
