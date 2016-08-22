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

    var stbui;

    if (!env.modulePath) {
        stbui = require("../");
    } else {
        stbui = require(env.modulePath);
        // stbui = require('./stbui-fis-conf');
    }
    stbui.set("system.localNPMFolder", path.join(env.cwd, "node_modules"));
    stbui.set("system.globalNPMFolder", path.dirname(__dirname), "node_modules");

    stbui.cli.run(argv, env);
});