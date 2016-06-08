var appTitle = "stbui",
    appName = "stbui";

var deployDirectory = 'dist';
fis.util.mkdir(deployDirectory);

/*
 * 配置建构过程排除文件
 */
// 源码包含设置
fis.config.set('project.files', [
    'page/**',
    '*.html'
]);
// 源码排除设置
fis.config.set('project.ignore', [
    'widget/**',
    deployDirectory + '/**'
]);

/*
 * 配置fis插件
 */
// 设置less的编译
// 注： 配置该插件后，本地的sublime可以不用安装lesstocss插件，建议直接编辑less文件，使用less的扩展动态语法
fis.match('**.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
})
    // 静态资源优化插件
    .match('*.js', {
        // fis-optimizer-uglify-js 插件进行压缩，已内置
        optimizer: fis.plugin('uglify-js')
    }).match('*.less', {
        // fis-optimizer-clean-css 插件进行压缩，已内置
        optimizer: fis.plugin('clean-css')
    }).match('*.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer: fis.plugin('png-compressor')
    })
    // .match('*.html', {
    //     // Minify HTML
    //     optimizer: fis.plugin('htmlmin')
    // })
    // 配置相对路径的插件，调整所有静态资源引用为相对路径引用
    .hook('relative')
    .match('**', {
        relative: true
    })
    .match('!/*.html', {
        useHash: true
    })
    //.match('::package', {
    //    postpackager: stbui.plugin('loader', {
    //        resourceType: 'commonJs',
    //        useInlineMap: true
    //    })
    //})
    .match('::package', {
        postpackager: stbui.plugin('loader')
    })

    // 配置部署插件：配置本地部署目录
    // 注：本地联调 和 测试环境打包，都生成在{deployDirectory}目录
    .match("!(js/**)", {
        deploy: fis.plugin('local-deliver', {
            to: deployDirectory
        })
    })
    .match('/*.html', {
        deploy: [
            fis.plugin('local-deliver', {
                to: deployDirectory
            })
        ]
    });


/*
 * 框架默认推荐的js代码文件合并策略，分以下三层: 1.框架层 2.组件层 3.应用层/文档层
 */
// 框架层：framework.js、 framework.css(通过less配置解析即可)
var frameworkJsPackages = [
    "widget/tabs/index.js",
    "widget/swiper/index.js"
];
frameworkJsPackages.forEach(function(package) {
    fis.match(package, {
        packTo: 'framework/framework.js'
    });
});

// 组件层：components.js、components.css(通过less配置解析即可)
//var componentsJsPackages = [
//    "widget/tabs/index.js",
//    "widget/swiper/index.js"
//];
//componentsJsPackages.forEach(function(package) {
//    fis.match(package, {
//        packTo: 'framework/components.js'
//    });
//});

var frameworkCssPackages = [
    "widget/lib/stbui.less"
];
frameworkCssPackages.forEach(function(package) {
    fis.match(package, {
        packTo: 'framework/framework.css'
    });
});


/*
 * 配置在各环境下项目资源引用域名
 */
var localhostMedia = fis.media('dev');
localhostMedia
    .match('*.js', {
        optimizer: null
    }).match('*.less', {
        optimizer: null
    }).match('*.html', {
        optimizer: null
    });