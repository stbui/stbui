#!/usr/bin/env node
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var wSpawn = _interopRequire(require("win-spawn"));

// import {spawn,exec} from 'child_process';

function server(type) {
    var cmd = wSpawn("stbui", ["server", type], { stdio: "inherit", customFds: [0, 1, 2] });

    cmd.on("close", function () {
        console.log("执行完成");
        console.log("");
        output();
    });
}

function compile(type, option) {
    var params = ["release", type];
    if (option) {
        params.push(option);
    }

    var cmd = wSpawn("stbui", params, { stdio: "inherit", customFds: [0, 1, 2] });

    cmd.on("close", function () {
        console.log("执行完成");
        console.log("");
        output();
    });
}

function ide() {
    var cmd = wSpawn("stbui-ide", [], { stdio: "inherit", customFds: [0, 1, 2] });

    cmd.on("close", function () {
        console.log("执行完成");
        console.log("");
        output();
    });
}

function stdin() {
    process.stdin.setEncoding("utf8");
    process.stdin.on("readable", function () {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            chunk = parseInt(chunk);
            switch (chunk) {
                case 1:
                    compile("dev");
                    break;
                case 2:
                    compile("dev", "-w");
                    break;
                case 3:
                    compile("prod");
                    break;
                case 5:
                    server("start");
                    break;
                case 6:
                    server("stop");
                    break;
                case 7:
                    break;
                case 8:
                    server("clean");
                case 9:
                    ide();
                    break;
                default:
                    console.log("选择无效，请重新输入");
                    break;
            }
        }
    });

    process.stdout.write("请选择要进行的操作，然后按回车:");
}

function output() {
    console.log("                               ");
    console.log("           stbui 相关服务快捷操作");
    console.log("           =====================");
    console.log("                               ");
    console.log("           1、构建脚本", "(debug模式)");
    console.log("           2、构建脚本", "(监听debug模式)");
    console.log("           3、构建脚本", "(release模式)");
    console.log("           5、启动服务");
    console.log("           6、关闭服务");
    console.log("           7、检查服务");
    console.log("           8、清除debug文件");
    console.log("           9、web界面管理");
    console.log("                               ");
    // console.log('           提示：');
    // console.log('请选择要进行的操作，然后按回车:');

    stdin();
}

output();