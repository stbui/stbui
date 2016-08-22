#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const spawn = require('win-spawn');
const exists = require('fs').existsSync;

const ROOT_PATH = path.dirname(__dirname) + path.sep;
const COMMAND_PATH = ROOT_PATH + 'lib';


program
    .version('0.0.1', '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .on('-h', printHelp)
    .parse(process.argv);

function printHelp() {
    console.log();
    console.log('    init           initialize a package');
    console.log('    release        release');
    console.log('    server         server');
    console.log('    project        创建新新项目');
    console.log('    page           新增业务模块');
    console.log('    framework      新增公共通用模块');
    console.log();
}


const subcmd = program.args[0];
const args = process.argv.slice(3);
const acronym = {
    "i": "init",
    "prj": "project",
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