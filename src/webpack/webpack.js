import { join } from 'path';
import { writeFileSync } from 'fs';
import webpack, { ProgressPlugin } from 'webpack';
import chalk from 'chalk';
import mergeCustomConfig from './mergeCustomConfig';
import getWebpackCommonConfig from './getWebpackCommonConfig';

function getWebpackConfig(args) {
    let webpackConfig = getWebpackCommonConfig(args);

    webpackConfig.plugins = webpackConfig.plugins || [];


    if (args.outputPath) {
        webpackConfig.output.path = args.outputPath;
    }

    if (args.publicPath) {
        webpackConfig.output.publicPath = args.publicPath;
    }


    if (args.compress) {
        webpackConfig.UglifyJsPluginConfig = {
            output: {
                ascii_only: true,
            },
            compress: {
                warnings: false
            }
        };
        webpackConfig.plugins = [...webpackConfig.plugins,
            new webpack.optimize.UglifyJsPlugin(webpackConfig.UglifyJsPluginConfig),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
            })
        ];
    } else {
        if (process.env.NODE_ENV) {
            webpackConfig.plugins = [...webpackConfig.plugins,
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                }),
            ];
        }
    }

    webpackConfig.plugins = [...webpackConfig.plugins,
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin(),
    ];


    if (args.hash) {
        const pkg = require(join(args.cwd, 'package.json'));
        webpackConfig.output.filename = webpackConfig.output.chunkFilename = '[name]-[chunkhash].js';
        webpackConfig.plugins = [...webpackConfig.plugins,
            require('map-json-webpack-plugin')({
                assetsPath: pkg.name,
            }),
        ];
    }

    webpackConfig = mergeCustomConfig(webpackConfig, join(args.cwd, args.config || 'webpack.config.js'));

    return webpackConfig;
}

export default function build(args, callback) {
    let webpackConfig = getWebpackConfig(args);
    webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig];

    let fileOutputPath;
    webpackConfig.forEach(config => {
        fileOutputPath = config.output.path;
    });

    if (args.watch) {
        webpackConfig.forEach(config => {
            config.plugins.push(
                new ProgressPlugin((percentage, msg) => {
                    const stream = process.stderr;
                    if (stream.isTTY && percentage < 0.71) {
                        stream.cursorTo(0);
                        stream.write(`?  ${chalk.magenta(msg)}`);
                        stream.clearLine(1);
                    } else if (percentage === 1) {
                        console.log(chalk.green('\nwebpack: bundle build is now finished.'));
                    }
                })
            );
        });
    }

    function doneHandler(err, stats) {
        if (args.json) {
            const filename = typeof args.json === 'boolean' ? 'build-bundle.json' : args.json;
            const jsonPath = join(fileOutputPath, filename);
            writeFileSync(jsonPath, JSON.stringify(stats.toJson()), 'utf-8');
            console.log(`Generate Json File: ${jsonPath}`);
        }

        const { errors } = stats.toJson();
        if (errors && errors.length) {
            process.on('exit', () => {
                process.exit(1);
            });
        }

        if (!args.watch || stats.hasErrors()) {
            const buildInfo = stats.toString({
                colors: true,
                children: true,
                chunks: !!args.verbose,
                modules: !!args.verbose,
                chunkModules: !!args.verbose,
                hash: !!args.verbose,
                version: !!args.verbose,
            });
            if (stats.hasErrors()) {
                console.error(buildInfo);
            } else {
                console.log(buildInfo);
            }
        }

        if (err) {
            process.on('exit', () => {
                process.exit(1);
            });
            console.error(err);
        }

        if (callback) {
            callback(err);
        }
    }


    const compiler = webpack(webpackConfig);


    if (!args.verbose) {
        compiler.plugin('done', (stats) => {
            stats.stats.forEach((stat) => {
                stat.compilation.children = stat.compilation.children.filter((child) => {
                    return child.name !== 'extract-text-webpack-plugin';
                });
            });
        });
    }

    if (args.watch) {
        compiler.watch(args.watch || 200, doneHandler);
    } else {
        compiler.run(doneHandler);
    }
}