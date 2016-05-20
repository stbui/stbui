#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import vfs from 'vinyl-fs';

const ROOT_PATH = path.dirname(__dirname) + path.sep;
// ģ��Ŀ¼
const APP_PATH = ROOT_PATH + '/template';


function printHelp() {
    console.log();
    console.log('stbui project <name>', '');
    console.log();
}

function createProject(project) {

    // ���� page Ŀ¼�ļ�
    var page = path.join(APP_PATH + '/page', '**');
    vfs.src(page)
        .pipe(vfs.dest(project + '/page'));

    // ���� widget Ŀ¼�ļ�
    var widget = path.join(APP_PATH + '/widget', '**');
    vfs.src(widget)
        .pipe(vfs.dest(project + '/widget'));

    // ���������ļ�
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