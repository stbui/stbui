#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import vfs from 'vinyl-fs';

// stbui路径
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

    // 拷贝 framework 目录文件
    var widget = path.join(APP_PATH + '/framework', '**');
    vfs.src(widget)
        .pipe(vfs.dest(project + '/framework'));

    // 拷贝 lib 目录文件
    var widget = path.join(APP_PATH + '/lib', '**');
    vfs.src(widget)
        .pipe(vfs.dest(project + '/lib'));

    // 拷贝配置文件
    var config = [
        //APP_PATH + '/stbui-conf.js',
        APP_PATH + '/README.md',
        APP_PATH + '/package.json'
    ];
    vfs.src(config)
        .pipe(vfs.dest(project));

    console.log();
    console.log('$ create project success');
    console.log();
    console.log('$ cd ' + project + ' && npm install');
    console.log();
}


program
    .version('1.0.1', '-v, --version')
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