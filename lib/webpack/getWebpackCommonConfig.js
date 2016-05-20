'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getWebpackCommonConfig;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _getBabelCommonConfig = require('./getBabelCommonConfig');

var _getBabelCommonConfig2 = _interopRequireDefault(_getBabelCommonConfig);

var _path = require('path');

var _rucksackCss = require('rucksack-css');

var _rucksackCss2 = _interopRequireDefault(_rucksackCss);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getWebpackCommonConfig(args) {
    var pkg = require((0, _path.join)(args.cwd, 'package.json'));

    var jsFileName = args.hash ? '[name]-[chunkhash].js' : '[name].js';
    var cssFileName = args.hash ? '[name]-[chunkhash].css' : '[name].css';
    var commonName = args.hash ? 'common-[chunkhash].js' : 'common.js';

    var entry = pkg.entry ? pkg.entry : { "index": "./page/index/index.js" };

    var babelQuery = (0, _getBabelCommonConfig2.default)();

    var emptyBuildins = ['child_process', 'cluster', 'dgram', 'dns', 'fs', 'module', 'net', 'readline', 'repl', 'tls'];

    var browser = pkg.browser || {};

    var node = emptyBuildins.reduce(function (obj, name) {
        if (!(name in browser)) {
            return _extends({}, obj, _defineProperty({}, name, 'empty'));
        }
        return obj;
    }, {});

    return {

        babel: babelQuery,

        output: {
            path: (0, _path.join)(process.cwd(), './dist/'),
            filename: jsFileName,
            chunkFilename: jsFileName
        },

        devtool: args.devtool,

        resolve: {
            modulesDirectories: ['node_modules', (0, _path.join)(__dirname, '../node_modules')],
            extensions: ['', '.js', '.jsx']
        },

        resolveLoader: {
            modulesDirectories: ['node_modules', (0, _path.join)(__dirname, '../node_modules')]
        },

        entry: entry,

        node: node,

        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: babelQuery
            }, {
                test: /\.jsx$/,
                loader: 'babel',
                query: babelQuery
            }, {
                test: function test(filePath) {
                    return (/\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
                    );
                },

                loader: _extractTextWebpackPlugin2.default.extract('css?sourceMap&-restructuring!' + 'postcss')
            }, {
                test: /\.module\.css$/,
                loader: _extractTextWebpackPlugin2.default.extract('css?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]!' + 'postcss')
            }, {
                test: function test(filePath) {
                    return (/\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
                    );
                },

                loader: _extractTextWebpackPlugin2.default.extract('css?sourceMap!' + 'postcss!' + ('less-loader?{"sourceMap":true,"modifyVars":' + JSON.stringify(pkg.theme || {}) + '}'))
            }, {
                test: /\.module\.less$/,
                loader: _extractTextWebpackPlugin2.default.extract('css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' + 'postcss!' + ('less-loader?{"sourceMap":true,"modifyVars":' + JSON.stringify(pkg.theme || {}) + '}'))
            }, { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' }, { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' }, { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' }, { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' }, { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' }, { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000' }, { test: /\.json$/, loader: 'json' }, { test: /\.html?$/, loader: 'file?name=[name].[ext]' }]
        },

        postcss: [(0, _rucksackCss2.default)(), (0, _autoprefixer2.default)({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
        })],

        plugins: [new _webpack2.default.optimize.CommonsChunkPlugin('common', commonName), new _extractTextWebpackPlugin2.default(cssFileName, {
            disable: false,
            allChunks: true
        }), new _webpack2.default.optimize.OccurenceOrderPlugin()]
    };
}
module.exports = exports['default'];