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

//由于使用了bower，有很多非必须资源。通过set project.files对象指定需要编译的文件夹和引用的资源
//fis.set('project.files', []);
stbui.set("project.ignore", ["README.md", "fis-conf.js"]);

stbui.set("statics", "/statics"); //static目录

//FIS modjs模块化方案，您也可以选择amd/commonjs等
stbui.hook("commonjs");

/*************************目录规范*****************************/
stbui.match("**/*", {
    release: "${statics}/$&"
})
//modules下面都是模块化资源
.match(/^\/framework\/(.*)\.(js)$/i, {
    isMod: true,
    id: "$1", //id支持简写，去掉modules和.js后缀中间的部分
    release: "${statics}/$&"
})
//page下面的页面发布时去掉page文件夹
//.match(/^\/page\/(.*)$/i, {
//.match(/^\/page\/(.*)\/(.*)\.(html)$/i, {
//    useCache: false,
//    release: '${statics}/$1'
//})
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
.match("**/*.tmpl", {
    isJsLike: true,
    release: false
})
//页面模板不用编译缓存
.match(/.*\.(html|tpl|htm)$/, {
    useCache: false
});

/****************异构语言编译*****************/
//less的编译
//npm install fis-parser-less [-g]
stbui.match("**/*.less", {
    rExt: ".css", // from .scss to .css
    parser: fis.plugin("less", {})
});

//打包与css sprite基础配置
stbui.match("::packager", {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin("loader", {
        resourceType: "mod",
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: fis.plugin("map"),
    spriter: fis.plugin("csssprites", {
        layout: "matrix",
        margin: "15"
    })
});

/**********************生产环境下CSS、JS压缩合并*****************/
//使用方法 fis3 release prod
stbui.media("prod")
//注意压缩时.async.js文件是异步加载的，不能直接用annotate解析
.match("**.js", {
    //preprocessor: fis.plugin('annotate'),
    optimizer: fis.plugin("uglify-js")
}).match("/**(.async).js", {
    preprocessor: null,
    optimizer: null
}).match("**.css", {
    optimizer: fis.plugin("clean-css")
}).match("lib/mod.js", {
    packTo: "/pkg/vendor.js"
})
//所有页面中引用到的bower js资源
.match("bower_components/**/*.js", {
    packTo: "/pkg/vendor.js"
})
//所有页面中引用到的bower css资源
.match("bower_components/**/*.css", {
    packTo: "/pkg/vendor.css"
}).match("framework/**/*.css", {
    packTo: "/pkg/vendor.css"
});

//fis-parser-less option