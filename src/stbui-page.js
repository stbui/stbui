#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import vfs from 'vinyl-fs';

// stbui路径
const ROOT_PATH = path.dirname(__dirname) + path.sep;
// 当前命令行所在的路径
const APP_PATH = process.cwd() + path.sep;


function createPage(page) {
    // 复制template模板文件
    var source = path.join(ROOT_PATH + '/template/page/index', '**');
    var target = path.join(APP_PATH + '/page/' + page);

    vfs.src(source)
        .pipe(vfs.dest(target));

    console.log();
    console.log('$ create page success');
    console.log();
    console.log('  /page/' + page);
    console.log('  /page/' + page + '/index.js');
    console.log('  /page/' + page + '/index.less');
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
    .version('1.0.1', '-v, --version')
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