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
    let _stbui;

    if (!env.modulePath) {
        _stbui = require('./stbui-fis-conf.js');
    } else {
        _stbui = require('./stbui-fis-conf.js');
    }

    process.title = this.name + ' ' + process.argv.slice(2).join(' ') + ' [ ' + env.cwd + ' ]';

    // 配置插件查找路径，优先查找本地项目里面的 node_modules
    // 然后才是全局环境下面安装的 stbui 目录里面的 node_modules
    _stbui.require.paths.unshift(path.join(env.cwd, 'node_modules'));
    _stbui.require.paths.push(path.join(path.dirname(__dirname), 'node_modules'));
    _stbui.cli.name = this.name;
    _stbui.cli.run(argv, env);

});
