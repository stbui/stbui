var appName = '';
// 首次创建项目，已当前日期作为版本号
var version = 'stbui.' + (+new Date());
var relative = false;
var domain = 'http://127.0.0.1:8080';

stbui.set('project.ignore', ['dist/**', 'node_modules/**', 'doc/**', 'package.json', '*.md', 'fis-conf.js', 'stbui-conf.js']);
stbui.set('statics', '/' + appName); //static目录
stbui.hook('commonjs');


/*************************目录规范*****************************/
stbui
    .match("**/*", {
        release: '${statics}/$&'
    })
    .hook('relative')
    .match('**', {
        relative: relative
    })
    .match(/^\/framework\/(.*)\.(js)$/i, {
        isMod: true,
        id: '$1', //id支持简写，去掉framework和.js后缀中间的部分
        release: '${statics}/$&'
    })
    //page下面的页面发布时去掉page文件夹
    .match(/^\/page\/(.*)$/i, {
        isMod: true,
        id: '$1',
    })
    .match(/^\/page\/(.*)\/(.*)\.(html)$/i, {
        useCache: false,
        release: '${statics}/$1'
    })
    //一级同名组件，可以引用短路径，比如framework/stbui/stbui.js
    //直接引用为var $ = require('stbui');
    .match(/^\/framework\/([^\/]+)\/\1\.(js)$/i, {
        id: '$1'
    })
    //less的mixin文件无需发布
    .match(/^(.*)variables\.less$/i, {
        release: false
    })
    //页面模板不用编译缓存
    .match(/.*\.(html|tpl|htm)$/, {
        useCache: false
    });


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
});

/**********************仅CSS、JS合并文件***************/
stbui
    .match("lib/stbui.js", {
        packTo: "/pkg/framework.js",
        packOrder: -1
    })
    .match("framework/**/*.js", {
        packTo: "/pkg/framework.js",
    })
    .match("page/**/*.js", {
        packTo: "/pkg/app.js",
    })
;

stbui
    .match("framework/common/stbui.less", {
        packTo: "/pkg/framework.css"
    })
    .match(/^\/page\/(.*)\/(.*)\.(less)$/i, {
        packTo: "/pkg/app_$1.css"
    })
;

/**********************开发环境***************/
stbui.media('dev')
    .match('**.js', {
        optimizer: null
    })
    .match('/**(.async).js', {
        preprocessor: null,
        optimizer: null
    })
    .match('**.{less,css}', {
        optimizer: null
    })
;

/**********************生产环境*****************/
stbui.media('prod')
    .match('**.js', {
        // 压缩js
        optimizer: fis.plugin('uglify-js')
    })
    .match('/**(.async).js', {
        preprocessor: null,
        optimizer: null
    })
    .match('**.css', {
        // 压缩css
        optimizer: fis.plugin('clean-css')
    })
    .match("/pkg/*.{js,css}", {
        // 打包后的文件添加md5
        useHash: false,
        // 添加域名
        domain: domain
    })
    .match("page/**.{png,jpg,gif}", {
        release: '/pkg/$0',
        // 添加域名
        domain: domain
    })
    .match('index.html:js', {
        // 压缩内联js
        optimizer: fis.plugin('uglify-js')
    })
    .match('framework/**', {
        // 移动framework目录到pkg下
        release: '/pkg/$0'
    })
    .match('**', {
        deploy: [
            // 删除打包后的源文件
            stbui.plugin('skip-packed'),
            stbui.plugin('zip', {
                filename: appName + version + '.zip'
            }),
            // 发布到项目dist目录
            stbui.plugin('local-deliver', {
                to: './dist'
            })
        ]
    })
;