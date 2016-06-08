import fs from 'fs';
import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


const CDN_DOMAIN ='http://127.0.0.1';
const pagePath = './page';
const widget = './widget';
const dist = './dist';
const node_path = __dirname + '/node_modules';

var entry = {};
function getPlugin() {
    var APP_LIST = fs.readdirSync(pagePath);

    var plugin = [
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'framework',
            chunks: APP_LIST,
            minChunks: 3
        }),
        new ExtractTextPlugin('Styles/[name].css?v=[hash]', {
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


let config = {
    entry: entry,
    output: {
        path: dist,
        filename: 'Scripts/[name].js?v=[hash]',
        chunkFilename: 'Scripts/[id].js'
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
                loader: 'url-loader?limit=8192&name=/img/[hash].[ext]'
            }
        ]
    },
    plugins: getPlugin(),
    devServer: {
        contentBase: './dist/',
        host: '0.0.0.0',
        port: 1111,
        inline: true,
        hot: true
    }
};


//
if (fs.existsSync('webpack.config.js')) {
    config = require(path.join(process.cwd(), 'webpack.config.js'));
} else if (fs.existsSync('stbui.config.js')) {
    config = require(path.join(process.cwd(), 'stbui.config.js'));
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