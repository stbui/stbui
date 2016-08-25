#!/usr/bin/env node

import program from 'commander';

program
    .version('1.0.1', '-v, --version')
    .usage('<command> [options]')
    .on('--help', printHelp)
    .on('-h', printHelp)
    .parse(process.argv);

const subcmd = program.args[0];

if (subcmd) {
    init(subcmd);
} else {
    program.help();
}

/*
 * 在命令行下输出帮助信息
 *
 * */
function printHelp() {
    console.log();
    console.log('stbui init <name>');
    console.log();
}


function init() {

}