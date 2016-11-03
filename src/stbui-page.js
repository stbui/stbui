#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import fs from 'fs';

// stbui路径
const ROOT_PATH = path.dirname(__dirname) + path.sep;
// 当前命令行所在的路径
const APP_PATH = process.cwd() + path.sep;
const {version} = getPackage();

function createPage(folderName) {
    // 创建默认文件名
    const _path = APP_PATH + path.sep + 'page' + path.sep + folderName + path.sep;
    const js = _path + 'index.js';
    const less = _path + 'index.less';
    const html = _path + 'index.html';

    // 向文件写入默认代码，并生成文件
    newFile(js, jsTemplate(folderName));
    newFile(less, "." + folderName + " {\r\n}");
    newFile(html, htmlTemplate());

    console.log();
    console.log('$ create page success');
    console.log();
    console.log('  /page/' + subcmd);
    console.log('  /page/' + subcmd + '/index.js');
    console.log('  /page/' + subcmd + '/index.less');
    console.log();
}

/*
 * 在命令行下输出帮助信息
 *
 * */
function printHelp() {
    console.log();
    console.log('stbui page <name>');
    console.log();
}

program
    .version(version, '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .on('-h', printHelp)
    .parse(process.argv);

const subcmd = program.args[0];

if (subcmd) {
    createPage(subcmd);
} else {
    program.help();
}


/**
 * 生成html文件方法
 * @param: moduleName
 * @return:
 */
function htmlTemplate() {
    let path = ROOT_PATH + '/template/page/index/index.html';
    let data = fs.readFileSync(path,'utf-8');

    return data;
}

/**
 * 生成js文件方法
 * @param: moduleName
 * @return:
 */
function jsTemplate(moduleName) {
    let str = `/*\r\n * @tool:stbui\r\n * @version:${version}\r\n * @author:bright\r\n * @mail:772020653@qq.com\r\n * @website:http://stbui.com\r\n * @update:2016.10.08\r\n */`;
    str += `\r\n\r\n`;
    str += `var ${moduleName} = {\r\n}`;
    str += `\r\n\r\n`;
    str += `module.exports = ${moduleName};`;

    return str;
}

function lessTemplate(moduleName) {
    let str = `.${moduleName} {\r\n}`;

    return str;
}

function newFile(file, content) {
    mkdir(path.dirname(file));

    fs.writeFileSync(file, content);
}

function mkdir(path) {
    let {existsSync, mkdirSync} = fs;
    if (!existsSync(path)) {
        mkdirSync(path);
    }
}

function getPackage() {
    var pkg = fs.readFileSync(ROOT_PATH+'package.json','utf-8');
    pkg = JSON.parse(pkg);
    return pkg;
}