//fis.set('project.files', []);
fis.set('project.ignore', ['README.md', 'fis-conf.js']);

fis.set('statics', '/'); //static目录

fis.hook('commonjs');


/*************************目录规范*****************************/
fis.match("**/*", {
    release: '${statics}/$&'
})
    .match(/^\/framework\/(.*)\.(js)$/i, {
        isMod: true,
        id: '$1', //id支持简写，去掉modules和.js后缀中间的部分
        release: '${statics}/$&'
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
        id: '$1'
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
    })


/****************异构语言编译*****************/
//less的编译
fis.match('**/*.less', {
    rExt: '.css',
    parser: fis.plugin('less'),
    optimizer: fis.plugin('clean-css')
});


//打包与css sprite基础配置
fis.match('::packager', {
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
})


/**********************生产环境下CSS、JS压缩合并*****************/
fis.media('dev')
    .match('**.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('/**(.async).js', {
        preprocessor: null,
        optimizer: null
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match("lib/mod.js", {
        packTo: "/pkg/vendor.js"
    })
    .match("framework/common/stbui.less", {
        packTo: "/pkg/vendor.css"
    });

fis.media('prod')
    .match('**.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('/**(.async).js', {
        preprocessor: null,
        optimizer: null
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match("lib/mod.js", {
        packTo: "/pkg/vendor.js"
    })
    .match("lib/*.js", {
        packTo: "/pkg/vendor.js"
    })
    .match("framework/**/*.js", {
        packTo: "/pkg/framework.js"
    })
    .match("page/**/*.js", {
        packTo: "/pkg/app.js"
    })
    // .match("page/**/*.less", {
    //     packTo: "/pkg/app.css"
    // })
    .match("framework/common/stbui.less", {
        packTo: "/pkg/vendor.css"
    });