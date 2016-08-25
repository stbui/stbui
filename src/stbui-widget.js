#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';

// stbui路径
const ROOT_PATH = path.dirname(__dirname) + path.sep;
// 当前命令行所在的路径
const APP_PATH = process.cwd() + path.sep;
// template 模板路径
const Template_PATH = ROOT_PATH + path.sep + 'template';
// page 路径
const Page_Path = Template_PATH + path.sep + 'page';
// widget 模块路径
const Widget_Path = Template_PATH + path.sep + 'widget';


function printHelp() {
    console.log();
    console.log('stbui widget <name>');
    console.log();
}


function createWidget(widgetName) {
    const widgetPath = APP_PATH + path.sep + 'widget' + path.sep + widgetName;
    const js = widgetPath + path.sep + 'index.js';
    const css = widgetPath + path.sep + 'index.css';
    const html = widgetPath + path.sep + 'index.html';

    newFile(js, "require('./index.css');");
    newFile(css, "."+widgetName+" {}");
    newFile(html, htmlTemplate);
}

function newFile(file, content) {
    mkdir(path.dirname(file));

    fs.writeFileSync(file, content);
}

function mkdir(path) {
    console.log('mkdir:', path);

    let {existsSync, mkdirSync} = fs;
    if (existsSync(path)) {
        //console.log('\u5df2\u5b58\u5728');
        //process.exit();
    } else {
        mkdirSync(path);
    }
}

function htmlTemplate() {
    const str = '';
    return str;
}


program
    .version('1.0.1', '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .on('-h', printHelp)
    .parse(process.argv);

const subcmd = program.args[0];

if (subcmd) {
    createWidget(subcmd);
} else {
    program.help();
}
