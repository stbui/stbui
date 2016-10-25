#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import vfs from 'vinyl-fs';
import inquirer from 'inquirer';

// 项目根目录
const ROOT_PATH = path.dirname(__dirname) + path.sep;
const node_modules = `${ROOT_PATH}/node_modules`;
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
    // createProject(subcmd);
    begininquirer();
} else {
    program.help();
    begininquirer();
}


/**********************/


function selectTpl(option) {
    switch (option) {
        case 'pc':
            find_pc(subcmd);
            break;
        case 'h5':
            find_h5(subcmd);
            break;
        case 'vue':
            find_h5(subcmd);
            break;
        case 'react':
            find_h5(subcmd);
            break;
        case 'angular':
            find_h5(subcmd);
            break;
        default:
            find_pc(subcmd);
            break;
    }
}

function find_pc(project) {
    const templatePath = `${node_modules}/stbui-pc`;
    const pagePath = `${templatePath}/page`;
    const frameworkPath = `${templatePath}/framework`;
    const libPath = `${templatePath}/lib`;


    // 拷贝 page 目录文件
    var page = path.join(pagePath, '**');
    vfs.src(page)
        .pipe(vfs.dest(project + '/page'));

    // 拷贝 framework 目录文件
    var widget = path.join(frameworkPath, '**');
    vfs.src(widget)
        .pipe(vfs.dest(project + '/framework'));

    // 拷贝 lib 目录文件
    var widget = path.join(libPath, '**');
    vfs.src(widget)
        .pipe(vfs.dest(project + '/lib'));

    // 拷贝配置文件
    var config = [
        // `${templatePath}/stbui-conf.js`,
        `${templatePath}/README.md`,
        `${templatePath}/package.json`
    ];
    vfs.src(config)
        .pipe(vfs.dest(project));

    console.log();
    console.log('$ create project success');
    console.log();
    console.log('$ cd ' + project + ' && npm install');
    console.log();
}

function find_h5() {
    const templatePath = `${node_modules}/stbui-h5`;
    console.log('正在拼命开发中，敬请期待。')
}

function begininquirer() {
    var questions = [
        {
            type: 'list',
            name: 'type',
            message: '请选择框架类型',
            choices: ['pc', 'h5', 'vue', 'react', 'angular'],
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ];

    inquirer.prompt(questions).then(function (answers) {
        // console.log(JSON.stringify(answers, null, '  '));
        let result = answers.type;
        console.log(result)
        selectTpl(result);
    });
}