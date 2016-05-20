/* global fis */
var build = require('./process');

// project ignores
var ignores = fis.get('project.ignore');
ignores = ignores.concat([
  'process/**',
  'demo/**',
  '*.psd',
  'README.md',
  '**.adoc',
  'package.json'
]);

fis.set('project.ignore', ignores);
// settings
fis.media('prod').set('domain', 'http://stbui.stbui.com');

fis.match('docs/**.md', {
  parser: build.markdownParse(),
  useDomain: true,
  isDoc: true,
  rExt: '.html',
  _isResourceMap: false // 强制不让替换 `__RESOURCE__MAP__`
});

fis.match('docs/INDEX.md', {
  useCache: false,
  isIndex: true
});

fis.match('::package', {
  prepackager: [build.buildNav(), build.hackActiveTab()],
  postpackager: [
    build.replaceDefine({
      'BASE_PATH': fis.media().get('domain'),
      'SITE_DESC': 'stbui 面向前端的工程构建系统',
      'SITE_AUTHOR': ''
    })
  ]
});

//--- prod ---

fis.media('prod')
  .match('*', {
    domain: fis.media().get('domain')
  })
  .match('*.{js,css,png,gif,eot,svg,ttf,woff,woff2}', {
    useHash: true
  })
  .match('*.js', {
    optimizer: fis.plugin('uglify-js'),
    packTo: '/static/aio.js'
  })
  .match('*.min.js', {
    optimizer: null
  })
  .match('*.css', {
    optimizer: fis.plugin('clean-css'),
    packTo: '/static/aio.css'
  });

// set pack
fis.media('prod').match('::package', {
  //postpackager: fis.plugin('loader', {}, 'append')
});


fis.media('upload').match('*', {
  deploy: fis.plugin('ftp', {
    //console: true,
    cache : true,           // 是否开启上传列表缓存，开启后支持跳过未修改文件，默认：true
    remoteDir : '/www/web/stbui_com/public_html/stbui/',   // 远程文件目录，注意！！！设置错误将导致文件被覆盖
    connect : {
      host : 'stbui.stbui.com',
      port : '21',
      user : 'stbui',
      password : 'stbui431106'
    }
  })
});


