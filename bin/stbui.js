#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const spawn = require('win-spawn');
const fs = require('fs');
const exists = fs.existsSync;

// 项目根目录
const ROOT_PATH = path.dirname(__dirname) + path.sep;
const COMMAND_PATH = ROOT_PATH + 'lib';

var pkg = fs.readFileSync(ROOT_PATH+'package.json','utf-8');
pkg = JSON.parse(pkg);


program
    .version(pkg.version, '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .on('-h', printHelp)
    .parse(process.argv);

function printHelp() {
    console.log();
    console.log('    init           初始化项目');
    console.log('    release        构建项目');
    console.log('    server         服务管理');
    console.log('    project        创建项目');
    console.log('    page           新增业务模块');
    console.log('    framework      新增通用模块');
    console.log();
}


const subcmd = program.args[0];
const args = process.argv.slice(3);
const acronym = {
    "i": "init",
    "prj": "project",
    "creact": "project",
    "c": "project",
    "w": "widget",
    "f": "framework",
    "p": "page"
};

if (subcmd != 'release' && subcmd != 'server') {
    var bin = executable(subcmd);
    if (bin) {
        spawn(bin, args, {stdio: 'inherit', customFds: [0, 1, 2]});
    } else {
        require('../lib/webpack/stbui-webpack');
    }
} else {
    require('../lib/fis/stbui-fis');
}

function executable(subcmd) {

    subcmd = acronym[subcmd] || subcmd;
    //var file = path.join(__dirname, 'stbui-' + subcmd + '.js');
    var file = COMMAND_PATH + '/stbui-' + subcmd + '.js';
    if (exists(file)) {
        return file;
    }
}