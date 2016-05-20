#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _vinylFs = require('vinyl-fs');

var _vinylFs2 = _interopRequireDefault(_vinylFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// stbui路径
var ROOT_PATH = _path2.default.dirname(__dirname) + _path2.default.sep;
// 当前命令行所在的路径
var APP_PATH = process.cwd() + _path2.default.sep;
// template 模板路径
var Template_PATH = ROOT_PATH + _path2.default.sep + 'template';
// page 路径
var Page_Path = Template_PATH + _path2.default.sep + 'page';
// widget 模块路径
var Widget_Path = Template_PATH + _path2.default.sep + 'widget';

function printHelp() {
    console.log();
    console.log('stbui widget <name>');
    console.log();
}

//function createWidget(widget) {
//    var source = path.join(ROOT_PATH + 'template/page/index', '**');
//    var target = path.join(APP_PATH + '/widget/' + widget);
//
//    vfs.src(source)
//        .pipe(vfs.dest(target));
//
//    console.log('create widget success', ROOT_PATH, APP_PATH, template);
//}

function createWidget(widgetName) {
    var widgetPath = APP_PATH + _path2.default.sep + 'widget' + _path2.default.sep + widgetName;
    var js = widgetPath + _path2.default.sep + 'index.js';
    var css = widgetPath + _path2.default.sep + 'index.css';
    var html = widgetPath + _path2.default.sep + 'index.html';

    newFile(js, "require('./index.css');");
    newFile(css, "." + widgetName + " {}");
    newFile(html, htmlTemplate);
}

function newFile(file, content) {
    mkdir(_path2.default.dirname(file));

    _fs2.default.writeFileSync(file, content);
}

function mkdir(path) {
    console.log('mkdir:', path);

    var existsSync = _fs2.default.existsSync;
    var mkdirSync = _fs2.default.mkdirSync;

    if (existsSync(path)) {
        //console.log('\u5df2\u5b58\u5728');
        //process.exit();
    } else {
            mkdirSync(path);
        }
}

function htmlTemplate() {
    var str = '';
    return str;
}

_commander2.default.version('0.0.1', '-v, --version').usage('<command> [options]').on('--help', printHelp).on('-h', printHelp).parse(process.argv);

var subcmd = _commander2.default.args[0];

if (subcmd) {
    //createWidget(subcmd);
    createWidget(subcmd);
} else {
    _commander2.default.help();
}