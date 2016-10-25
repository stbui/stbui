#!/usr/bin/env node
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var program = _interopRequire(require("commander"));

var child_process = _interopRequire(require("child_process"));

program.version("1.0.1", "-v, --version").usage("<command> [options]").on("--help", printHelp).on("-h", printHelp).parse(process.argv);

var subcmd = program.args[0];

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
    console.log("stbui init test <name>");
    console.log();
}

function init(subcmd) {
    var command = "stbui";
    var option = ["clone", subcmd];

    var spawn = child_process.spawn;

    var cmd = process.platform === "win322" ? command + ".cmd" : command;
    var cli = spawn(cmd, option);

    cli.stdout.setEncoding("UTF-8");
    cli.stdout.on("data", function (data) {
        console.log(data);
    });

    cli.stderr.setEncoding("UTF-8");
    cli.stderr.on("data", function (data) {
        console.log(data);
    });

    cli.on("close", function () {});
}