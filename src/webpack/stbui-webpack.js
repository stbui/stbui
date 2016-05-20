import fs from 'fs';
import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


const pagePath = './page';
const widget = './widget';
const dist = './dist/';

let config = {
    entry: {
        index: pagePath + '/index/index.js'
    },
    output: {
        path: dist,
        filename: 'js/[name].[hash].js',
        //publicPath: '../',
        chunkFilename: 'js/[id].js'
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
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }
            , {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }
            //, {
            //    test: /\.html$/,
            //    loader: "html?attrs=img:src img:data-src"
            //}
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
            chunks: ['index'],
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

        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist/',
        host: '127.0.0.1',
        port: 1111,
        inline: true,
        hot: true
    }
};


//
if (fs.existsSync('webpack.config.js')) {
    let custom = require(path.join(process.cwd(), 'webpack.config.js'));
    config = custom;
} else if (fs.existsSync('stbui.config.js')) {
    let custom = require(path.join(process.cwd(), 'stbui.config.js'));
    config = custom;
} else {
    // 构建同时将配置文件生成到项目中
}


let compiler = webpack(config);
compiler.run(function (err, stats) {

    if (!process.watch || stats.hasErrors()) {
        const buildInfo = stats.toString({
            colors: true,
            children: true,
            chunks: !!process.verbose,
            modules: !!process.verbose,
            chunkModules: !!process.verbose,
            hash: !!process.verbose,
            version: !!process.verbose
        });
        if (stats.hasErrors()) {
            console.error(buildInfo);
        } else {
            console.log(buildInfo);
        }
    }
});