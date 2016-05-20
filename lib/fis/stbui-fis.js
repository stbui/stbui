#!/usr/bin/env node
'use strict';

var _liftoff = require('liftoff');

var _liftoff2 = _interopRequireDefault(_liftoff);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2));

var cli = new _liftoff2.default({
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

    var stbui;
    if (!env.modulePath) {
        stbui = require('./stbui-fis-conf');
    } else {
        //fis = require(env.modulePath);
        stbui = require('./stbui-fis-conf');
    }
    stbui.set('system.localNPMFolder', _path2.default.join(env.cwd, 'node_modules/stbui'));
    stbui.set('system.globalNPMFolder', _path2.default.dirname(__dirname));

    stbui.cli.run(argv, env);
});