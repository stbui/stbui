#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import vfs from 'vinyl-fs';


const ROOT_PATH = path.dirname(__dirname) + path.sep;
const APP_PATH = process.cwd() + path.sep;


function printHelp() {
    console.log();
    console.log('stbui page <name>');
    console.log();
}

function createPage(page) {
    var source = path.join(ROOT_PATH + '/template/page/index', '**');
    var target = path.join(APP_PATH + '/page/' + page);

    vfs.src(source)
        .pipe(vfs.dest(target));

    console.log('create page success');
}


program
    .version('0.0.1', '-v, --version')
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
