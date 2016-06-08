var appTitle = "stbui",
    appName = "stbui";

var deployDirectory = 'dist';
fis.util.mkdir(deployDirectory);

/*
 * ���ý��������ų��ļ�
 */
// Դ���������
fis.config.set('project.files', [
    'page/**',
    '*.html'
]);
// Դ���ų�����
fis.config.set('project.ignore', [
    'widget/**',
    deployDirectory + '/**'
]);

/*
 * ����fis���
 */
// ����less�ı���
// ע�� ���øò���󣬱��ص�sublime���Բ��ð�װlesstocss���������ֱ�ӱ༭less�ļ���ʹ��less����չ��̬�﷨
fis.match('**.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
})
    // ��̬��Դ�Ż����
    .match('*.js', {
        // fis-optimizer-uglify-js �������ѹ����������
        optimizer: fis.plugin('uglify-js')
    }).match('*.less', {
        // fis-optimizer-clean-css �������ѹ����������
        optimizer: fis.plugin('clean-css')
    }).match('*.png', {
        // fis-optimizer-png-compressor �������ѹ����������
        optimizer: fis.plugin('png-compressor')
    })
    // .match('*.html', {
    //     // Minify HTML
    //     optimizer: fis.plugin('htmlmin')
    // })
    // �������·���Ĳ�����������о�̬��Դ����Ϊ���·������
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

    // ���ò����������ñ��ز���Ŀ¼
    // ע���������� �� ���Ի����������������{deployDirectory}Ŀ¼
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
 * ���Ĭ���Ƽ���js�����ļ��ϲ����ԣ�����������: 1.��ܲ� 2.����� 3.Ӧ�ò�/�ĵ���
 */
// ��ܲ㣺framework.js�� framework.css(ͨ��less���ý�������)
var frameworkJsPackages = [
    "widget/tabs/index.js",
    "widget/swiper/index.js"
];
frameworkJsPackages.forEach(function(package) {
    fis.match(package, {
        packTo: 'framework/framework.js'
    });
});

// ����㣺components.js��components.css(ͨ��less���ý�������)
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
 * �����ڸ���������Ŀ��Դ��������
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