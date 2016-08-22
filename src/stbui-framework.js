#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';
import vfs from 'vinyl-fs';

// stbui路径
const ROOT_PATH = path.dirname(__dirname) + path.sep;
// 当前命令行所在的路径
const APP_PATH = process.cwd() + path.sep;
// template 模板路径
const Template_PATH = ROOT_PATH + path.sep + 'template';
// page 路径
const Page_Path = Template_PATH + path.sep + 'page';
// framework 模块路径
const Framework_Path = Template_PATH + path.sep + 'framework';


function createTemplate(folderName) {
    // 创建默认文件名
    const _path = APP_PATH + path.sep + 'framework' + path.sep + folderName + path.sep;
    const js = _path + 'index.js';
    const less = _path + 'index.less';
    const css = _path + 'index.css';
    const html = _path + 'index.html';

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


function jsTemplate(moduleName) {
    let str = `/*\r\n * @tool:stbui\r\n * @version:0.0.1\r\n * @update:2016.08.22\r\n */`;
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


/*
 * 在命令行下输出帮助信息
 *
 * */
function printHelp() {
    console.log();
    console.log('stbui framework <name>');
    console.log();
}


program
    .version('0.0.1', '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .on('-h', printHelp)
    .parse(process.argv);

const subcmd = program.args[0];

if (subcmd) {
    createTemplate(subcmd);
} else {
    program.help();
}
