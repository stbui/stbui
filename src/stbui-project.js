#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import vfs from 'vinyl-fs';

const ROOT_PATH = path.dirname(__dirname) + path.sep;
// 模板目录
const APP_PATH = ROOT_PATH + '/template';


function printHelp() {
    console.log();
    console.log('stbui project <name>', '');
    console.log();
}

function createProject(project) {

    // 拷贝 page 目录文件
    var page = path.join(APP_PATH + '/page', '**');
    vfs.src(page)
        .pipe(vfs.dest(project + '/page'));

    // 拷贝 widget 目录文件
    var widget = path.join(APP_PATH + '/widget', '**');
    vfs.src(widget)
        .pipe(vfs.dest(project + '/widget'));

    // 拷贝配置文件
    var config = [
        //APP_PATH + '/stbui-conf.js',
        APP_PATH + '/README.md',
        APP_PATH + '/package.json'
    ];
    vfs.src(config)
        .pipe(vfs.dest(project));

    console.log('create project success');
}


program
    .version('0.0.1', '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .on('-h', printHelp)
    .parse(process.argv);

const subcmd = program.args[0];

if (subcmd) {
    createProject(subcmd);
} else {
    program.help();
}