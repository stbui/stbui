#!/usr/bin/env node

import program from 'commander';
import child_process from 'child_process';

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
    console.log('stbui init test <name>');
    console.log();
}


function init(subcmd) {
    let command = 'stbui';
    let option = ['clone',subcmd];

    const {spawn} = child_process;
    let cmd = process.platform === "win322" ? command + ".cmd" : command;
    let cli = spawn(cmd, option);

    cli.stdout.setEncoding('UTF-8');
    cli.stdout.on('data', (data) => {
        console.log(data);
    });

    cli.stderr.setEncoding('UTF-8');
    cli.stderr.on('data', (data) => {
        console.log(data);
    });

    cli.on('close', () => {

    });

}