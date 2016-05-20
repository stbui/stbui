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

var pagePath = './page';
var widget = './widget';
var dist = './dist/';

var config = {
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

    new _webpack2.default.optimize.UglifyJsPlugin({ minimize: true }), new _webpack2.default.optimize.CommonsChunkPlugin({
        name: 'framework',
        chunks: ['index'],
        minChunks: 3
    }), new _extractTextWebpackPlugin2.default('css/[name].[hash].css', {
        allChunks: true,
        disable: false
    }), new _htmlWebpackPlugin2.default({
        inject: 'body',
        chunks: ['framework', 'index'],
        filename: 'index.html',
        template: pagePath + '/index/index.html',
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }), new _webpack2.default.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: './dist/',
        host: '127.0.0.1',
        port: 1111,
        inline: true,
        hot: true
    }
};

//
if (_fs2.default.existsSync('webpack.config.js')) {
    var custom = require(_path2.default.join(process.cwd(), 'webpack.config.js'));
    config = custom;
} else if (_fs2.default.existsSync('stbui.config.js')) {
    var _custom = require(_path2.default.join(process.cwd(), 'stbui.config.js'));
    config = _custom;
} else {
    // ����ͬʱ�������ļ����ɵ���Ŀ��
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