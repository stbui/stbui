#!/usr/bin/env node
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fs = _interopRequire(require("fs"));

var path = _interopRequire(require("path"));

var program = _interopRequire(require("commander"));

var vfs = _interopRequire(require("vinyl-fs"));

// stbui路径
var ROOT_PATH = path.dirname(__dirname) + path.sep;
// 当前命令行所在的路径
var APP_PATH = process.cwd() + path.sep;
// template 模板路径
var Template_PATH = ROOT_PATH + path.sep + "template";
// page 路径
var Page_Path = Template_PATH + path.sep + "page";
// widget 模块路径
var Widget_Path = Template_PATH + path.sep + "widget";

function printHelp() {
    console.log();
    console.log("stbui widget <name>");
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
    var widgetPath = APP_PATH + path.sep + "widget" + path.sep + widgetName;
    var js = widgetPath + path.sep + "index.js";
    var css = widgetPath + path.sep + "index.css";
    var html = widgetPath + path.sep + "index.html";

    newFile(js, "require('./index.css');");
    newFile(css, "." + widgetName + " {}");
    newFile(html, htmlTemplate);
}

function newFile(file, content) {
    mkdir(path.dirname(file));

    fs.writeFileSync(file, content);
}

function mkdir(path) {
    console.log("mkdir:", path);

    var existsSync = fs.existsSync;
    var mkdirSync = fs.mkdirSync;

    if (existsSync(path)) {} else {
        mkdirSync(path);
    }
}

function htmlTemplate() {
    var str = "";
    return str;
}

program.version("0.0.1", "-v, --version").usage("<command> [options]").on("--help", printHelp).on("-h", printHelp).parse(process.argv);

var subcmd = program.args[0];

if (subcmd) {
    //createWidget(subcmd);
    createWidget(subcmd);
} else {
    program.help();
}

//console.log('\u5df2\u5b58\u5728');
//process.exit();