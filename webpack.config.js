const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var CDN_DOMAIN ='http://127.0.0.1';


const pagePath = './page';
const widget = './widget';
const dist = './dist/';
const node_path = __dirname + '/node_modules';


var entry = {};
function getPlugin() {
    var APP_LIST = fs.readdirSync(pagePath);

    var plugin = [
        //new webpack.ProvidePlugin({
        //    $: "jquery",
        //    jQuery: "jquery",
        //    "window.jQuery": "jquery"
        //}),

        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'framework',
            chunks: APP_LIST,
            minChunks: 3
        }),
        new ExtractTextPlugin('./Styles/[name].css?v=[hash]', {
            allChunks: true,
            disable: false
        }),

        new webpack.HotModuleReplacementPlugin()
    ];

    APP_LIST.forEach(function (v, k) {
        plugin.push(new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['framework', v],
            filename: v + '.html',
            template: pagePath + '/' + v + '/index.html',
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }));

        entry[v] = pagePath + '/' + v + '/index.js'
    });

    return plugin;
}


module.exports = {
    entry: entry,
    output: {
        path: dist,
        filename: 'Scripts/[name].js?v=[hash]',
        chunkFilename: 'Scripts/[id].js',
        //publicPath: CDN_DOMAIN
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
            , {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css!less')
            }
            , {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=1&name=img/[name].[ext]'
            }
            //, {
            //    test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //    loader: 'file-loader?name=./fonts/[name].[ext]'
            //}
            //, {
            //    test: /\.html$/,
            //    loader: "file?name=img-[sha512:hash:base64:7].[ext]!./image.jpg"
            //}
        ]
    },
    plugins: getPlugin(),
    devServer: {
        contentBase: dist,
        host: '0.0.0.0',
        port: 1111,
        inline: true,
        hot: true
    }
};
