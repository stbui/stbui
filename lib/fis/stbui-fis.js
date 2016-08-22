#!/usr/bin/env node
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Liftoff = _interopRequire(require("liftoff"));

var minimist = _interopRequire(require("minimist"));

var path = _interopRequire(require("path"));

var argv = minimist(process.argv.slice(2));
var cli = new Liftoff({
    name: "stbui",
    processTitle: "stbui",
    moduleName: "stbui",
    configName: "stbui-conf",

    extensions: {
        ".js": null
    }
});

cli.launch({
    cwd: argv.r || argv.root,
    configPath: argv.f || argv.file
}, function (env) {
    var _stbui = undefined;

    if (!env.modulePath) {
        _stbui = require("./stbui-fis-conf.js");
    } else {
        _stbui = require(env.modulePath);
    }

    process.title = this.name + " " + process.argv.slice(2).join(" ") + " [ " + env.cwd + " ]";

    // 配置插件查找路径，优先查找本地项目里面的 node_modules
    // 然后才是全局环境下面安装的 stbui 目录里面的 node_modules
    _stbui.require.paths.unshift(path.join(env.cwd, "node_modules"));
    _stbui.require.paths.push(path.join(path.dirname(__dirname), "node_modules"));
    _stbui.cli.name = this.name;
    _stbui.cli.run(argv, env);
});