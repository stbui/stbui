#!/usr/bin/env node

import Liftoff from 'liftoff';
import minimist from 'minimist';
import path from 'path';

const argv = minimist(process.argv.slice(2));
const cli = new Liftoff({
    name: 'stbui',
    processTitle: 'stbui',
    moduleName: 'stbui',
    configName: 'stbui-conf',

    extensions: {
        '.js': null
    }
});

cli.launch({
    cwd: argv.r || argv.root,
    configPath: argv.f || argv.file
}, function (env) {
    let stbui;

    if (!env.modulePath) {
        stbui = require('../');
    } else {
        stbui = require(env.modulePath);
        // stbui = require('./stbui-conf');
    }

    process.title = this.name + ' ' + process.argv.slice(2).join(' ') + ' [ ' + env.cwd + ' ]';

    // 配置插件查找路径，优先查找本地项目里面的 node_modules
    // 然后才是全局环境下面安装的 stbui 目录里面的 node_modules
    fis.require.paths.unshift(path.join(env.cwd, 'node_modules'));
    fis.require.paths.push(path.join(path.dirname(__dirname), 'node_modules'));
    fis.cli.name = this.name;
    fis.cli.run(argv, env);

});

// var cli = new Liftoff({
//     name: 'fis3',
//     processTitle: 'fis',
//     moduleName: 'fis3',
//     configName: 'fis-conf',
//
//     // only js supported!
//     extensions: {
//         '.js': null
//     }
// })