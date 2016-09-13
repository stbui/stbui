"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fis3 = _interopRequire(require("fis3"));

var stbui = module.exports = fis3;
stbui.require.prefixes.unshift("stbui");
stbui.cli.name = "stbui";
stbui.cli.info = "";

Object.defineProperty(global, "stbui", {
    enumerable: true,
    writable: false,
    value: stbui
});

var appName = "";
var version = +new Date();
var relative = true;

stbui.set("project.ignore", ["dist/**", "node_modules/**", "doc/**", "package.json", "README.md", "fis-conf.js", "stbui-conf.js"]);
stbui.set("statics", "/" + appName); //static目录
stbui.hook("commonjs");

/*************************目录规范*****************************/
stbui.match("**/*", {
    release: "${statics}/$&"
}).hook("relative").match("**", {
    relative: relative
}).match(/^\/framework\/(.*)\.(js)$/i, {
    isMod: true,
    id: "$1", //id支持简写，去掉framework和.js后缀中间的部分
    release: "${statics}/$&"
})
//page下面的页面发布时去掉page文件夹
.match(/^\/page\/(.*)$/i, {
    isMod: true,
    id: "$1" }).match(/^\/page\/(.*)\/(.*)\.(html)$/i, {
    useCache: false,
    release: "${statics}/$1"
})
//一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
//直接引用为var $ = require('jquery');
.match(/^\/framework\/([^\/]+)\/\1\.(js)$/i, {
    id: "$1"
})
//less的mixin文件无需发布
.match(/^(.*)variables\.less$/i, {
    release: false
})
//前端模板,当做类js文件处理，可以识别__inline, __uri等资源定位标识
.match("**/*.tpl", {
    isJsLike: true,
    release: false
})
//页面模板不用编译缓存
.match(/.*\.(html|tpl|htm)$/, {
    useCache: false
});

/****************异构语言编译*****************/
//less的编译
stbui.match("**/*.less", {
    rExt: ".css",
    parser: stbui.plugin("less"),
    optimizer: stbui.plugin("clean-css")
});

//打包与css sprite基础配置
stbui.match("::package", {
    postpackager: stbui.plugin("loader", {
        resourceType: "mod",
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: stbui.plugin("map"),
    spriter: stbui.plugin("csssprites", {
        layout: "matrix",
        margin: "15"
    })
});

/**********************生产环境下CSS、JS压缩合并*****************/
stbui.media("dev").match("**.js", {
    optimizer: null
}).match("/**(.async).js", {
    preprocessor: null,
    optimizer: null
}).match("**.css", {
    optimizer: stbui.plugin("clean-css")
}).match("lib/mod.js", {
    packTo: "/pkg/framework.js"
}).match("framework/common/stbui.less", {
    packTo: "/pkg/framework.css"
});

stbui.media("prod").match("**.js", {
    optimizer: fis.plugin("uglify-js")
}).match("/**(.async).js", {
    preprocessor: null,
    optimizer: null
}).match("**.css", {
    optimizer: fis.plugin("clean-css")
}).match("lib/mod.js", {
    packTo: "/pkg/framework.js",
    packOrder: -1
}).match("framework/**/*.js", {
    packTo: "/pkg/framework.js" }).match("framework/common/stbui.less", {
    packTo: "/pkg/framework.css"
}).match("page/**/*.js", {
    packTo: "/pkg/app.js" }).match("page/**/*.less", {
    packTo: "/pkg/app.css"
})
// 打包后的文件添加md5
.match("/pkg/*.{js,css}", {
    useHash: true
}).match("page/**.{png,jpg,gif}", {
    release: "/pkg/$0"
})
// 压缩内联js
.match("index.html:js", {
    optimizer: fis.plugin("uglify-js")
})
//  视情况
// .match('framework/**', {
//     release:'/pkg/$0'
// })
.match("**", {
    deploy: [
    // 删除打包后的源文件
    stbui.plugin("skip-packed"), stbui.plugin("zip", {
        filename: appName + version + ".zip"
    }), stbui.plugin("local-deliver", {
        to: "./dist"
    })]
});