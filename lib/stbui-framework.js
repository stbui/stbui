#!/usr/bin/env node
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fs = _interopRequire(require("fs"));

var path = _interopRequire(require("path"));

var program = _interopRequire(require("commander"));

// stbui路径
var ROOT_PATH = path.dirname(__dirname) + path.sep;
// 当前命令行所在的路径
var APP_PATH = process.cwd() + path.sep;
// template 模板路径
var Template_PATH = ROOT_PATH + path.sep + "template";
// page 路径
var Page_Path = Template_PATH + path.sep + "page";
// framework 模块路径
var Framework_Path = Template_PATH + path.sep + "framework";

function createTemplate(folderName) {
    // 创建默认文件名
    var _path = APP_PATH + path.sep + "framework" + path.sep + folderName + path.sep;
    var js = _path + "index.js";
    var less = _path + "index.less";
    var css = _path + "index.css";
    var html = _path + "index.html";

    // 向文件写入默认代码，并生成文件
    newFile(js, jsTemplate(folderName));
    newFile(less, "." + folderName + " {\r\n}");
    // newFile(html, htmlTemplate());
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

function jsTemplate(moduleName) {
    var str = "/*\r\n * @tool:stbui\r\n * @version:0.0.1\r\n * @update:2016.08.22\r\n */";
    str += "\r\n\r\n";
    str += "var " + moduleName + " = {\r\n}";
    str += "\r\n\r\n";
    str += "module.exports = " + moduleName + ";";

    return str;
}

function lessTemplate(moduleName) {
    var str = "." + moduleName + " {\r\n}";

    return str;
}

/*
 * 在命令行下输出帮助信息
 *
 * */
function printHelp() {
    console.log();
    console.log("stbui framework <name>");
    console.log();
}

program.version("0.0.1", "-v, --version").usage("<command> [options]").on("--help", printHelp).on("-h", printHelp).parse(process.argv);

var subcmd = program.args[0];

if (subcmd) {
    createTemplate(subcmd);
} else {
    program.help();
}

//console.log('\u5df2\u5b58\u5728');
//process.exit();