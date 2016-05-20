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
// ģ��Ŀ¼
var APP_PATH = ROOT_PATH + '/template';

function printHelp() {
    console.log();
    console.log('stbui project <name>', '');
    console.log();
}

function createProject(project) {

    // ���� page Ŀ¼�ļ�
    var page = _path2.default.join(APP_PATH + '/page', '**');
    _vinylFs2.default.src(page).pipe(_vinylFs2.default.dest(project + '/page'));

    // ���� widget Ŀ¼�ļ�
    var widget = _path2.default.join(APP_PATH + '/widget', '**');
    _vinylFs2.default.src(widget).pipe(_vinylFs2.default.dest(project + '/widget'));

    // ���������ļ�
    var config = [
    //APP_PATH + '/stbui-conf.js',
    APP_PATH + '/README.md', APP_PATH + '/package.json'];
    _vinylFs2.default.src(config).pipe(_vinylFs2.default.dest(project));

    console.log('create project success');
}

_commander2.default.version('0.0.1', '-v, --version').usage('<command> [options]').on('--help', printHelp).on('-h', printHelp).parse(process.argv);

var subcmd = _commander2.default.args[0];

if (subcmd) {
    createProject(subcmd);
} else {
    _commander2.default.help();
}