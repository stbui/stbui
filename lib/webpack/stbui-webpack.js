'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CDN_DOMAIN = 'http://127.0.0.1';
var pagePath = './page';
var widget = './widget';
var dist = './dist';
var node_path = __dirname + '/node_modules';

var entry = {};
function getPlugin() {
    var APP_LIST = _fs2.default.readdirSync(pagePath);

    var plugin = [
    //new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new _webpack2.default.optimize.CommonsChunkPlugin({
        name: 'framework',
        chunks: APP_LIST,
        minChunks: 3
    }), new _extractTextWebpackPlugin2.default('Styles/[name].css?v=[hash]', {
        allChunks: true,
        disable: false
    }), new _webpack2.default.HotModuleReplacementPlugin()];

    APP_LIST.forEach(function (v, k) {
        plugin.push(new _htmlWebpackPlugin2.default({
            inject: 'body',
            chunks: ['framework', v],
            filename: v + '.html',
            template: pagePath + '/' + v + '/index.html',
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }));

        entry[v] = pagePath + '/' + v + '/index.js';
    });

    return plugin;
}

var config = {
    entry: entry,
    output: {
        path: dist,
        filename: 'Scripts/[name].js?v=[hash]',
        chunkFilename: 'Scripts/[id].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: _extractTextWebpackPlugin2.default.extract('style-loader', 'css-loader')
        }, {
            test: /\.less$/,
            loader: _extractTextWebpackPlugin2.default.extract('css!less')
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=./fonts/[name].[ext]'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=/img/[hash].[ext]'
        }]
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
if (_fs2.default.existsSync('webpack.config.js')) {
    config = require(_path2.default.join(process.cwd(), 'webpack.config.js'));
} else if (_fs2.default.existsSync('stbui.config.js')) {
    config = require(_path2.default.join(process.cwd(), 'stbui.config.js'));
} else {
    // 构建同时将配置文件生成到项目中
}

var compiler = (0, _webpack2.default)(config);
compiler.run(function (err, stats) {

    if (!process.watch || stats.hasErrors()) {
        var buildInfo = stats.toString({
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