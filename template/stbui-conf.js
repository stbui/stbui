stbui.set('project.ignore', ['README.md', 'stbui-conf.js']);

stbui.set('statics', '/'); //static目录

stbui.hook('commonjs');


/*************************目录规范*****************************/
stbui.match("**/*", {
    release: '${statics}/$&'
})
    .match(/^\/framework\/(.*)\.(js)$/i, {
        isMod: true,
        id: '$1', //id支持简写，去掉modules和.js后缀中间的部分
        release: '${statics}/$&'
    })
    //page下面的页面发布时去掉page文件夹
    .match(/^\/page\/(.*)$/i, {
        isMod: true,
    })
    // .match(/^\/page\/(.*)\/(.*)\.(html)$/i, {
    //     useCache: false,
    //     release: '${statics}/$1'
    // })
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
    .match("**/*.tpl", {
        isJsLike: true,
        release: false
    })
    //页面模板不用编译缓存
    .match(/.*\.(html|tpl|htm)$/, {
        useCache: false
    })


/****************异构语言编译*****************/
//less的编译
stbui.match('**/*.less', {
    rExt: '.css',
    parser: stbui.plugin('less'),
    optimizer: stbui.plugin('clean-css')
});


//打包与css sprite基础配置
stbui.match('::package', {
    postpackager: stbui.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: stbui.plugin('map'),
    spriter: stbui.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
})


/**********************生产环境下CSS、JS压缩合并*****************/
stbui.media('dev')
    .match('**.js', {
        optimizer: stbui.plugin('uglify-js')
    })
    .match('/**(.async).js', {
        preprocessor: null,
        optimizer: null
    })
    .match('**.css', {
        optimizer: stbui.plugin('clean-css')
    })
    .match("lib/mod.js", {
        packTo: "/pkg/vendor.js"
    })
    .match("framework/common/stbui.less", {
        packTo: "/pkg/vendor.css"
    });

stbui.media('prod')
    .match('**.js', {
        optimizer: stbui.plugin('uglify-js')
    })
    .match('/**(.async).js', {
        preprocessor: null,
        optimizer: null
    })
    .match('**.css', {
        optimizer: stbui.plugin('clean-css')
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