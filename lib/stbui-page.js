#!/usr/bin/env node
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _vinylFs = require('vinyl-fs');

var _vinylFs2 = _interopRequireDefault(_vinylFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_PATH = _path2.default.dirname(__dirname) + _path2.default.sep;
var APP_PATH = process.cwd() + _path2.default.sep;

function printHelp() {
    console.log();
    console.log('stbui page <name>');
    console.log();
}

function createPage(page) {
    var source = _path2.default.join(ROOT_PATH + '/template/page/index', '**');
    var target = _path2.default.join(APP_PATH + '/page/' + page);

    _vinylFs2.default.src(source).pipe(_vinylFs2.default.dest(target));

    console.log('create page success');
}

_commander2.default.version('0.0.1', '-v, --version').usage('<command> [options]').on('--help', printHelp).on('-h', printHelp).parse(process.argv);

var subcmd = _commander2.default.args[0];

if (subcmd) {
    createPage(subcmd);
} else {
    _commander2.default.help();
}