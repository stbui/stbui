'use strict';

var _fis = require('fis3');

var _fis2 = _interopRequireDefault(_fis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stbui = module.exports = _fis2.default;

stbui.require.prefixes.unshift('stbui');
stbui.cli.name = 'stbui';
stbui.cli.info = '';

Object.defineProperty(global, 'stbui', {
    enumerable: true,
    writable: false,
    value: stbui
});

stbui.hook('commonjs');

stbui.config.set('project.files', ['*.html', 'page/**', 'widget/**', 'favicon.ico']);
stbui.config.set('project.ignore', ['dist/**', 'deployed/**', 'node_modules/**']);

stbui.match('**.less', {
    parser: stbui.plugin('less'),
    rExt: '.css'
}).match('*.js', {
    isMod: true,
    parser: stbui.plugin('es6-babel'),
    rExt: '.js',
    optimizer: stbui.plugin('uglify-js')
}).match('/widget/lib/mod.js', {
    isMod: false
}).match('{*.less,*.css}', {
    optimizer: stbui.plugin('clean-css')
}).match('*.png', {
    optimizer: stbui.plugin('png-compressor', {
        type: 'pngquant'
    })
}).hook('relative').match('**', {
    relative: true
}).match('/*.html', {
    relative: '/'
}).match('*.js', {
    relative: '/'
}).match('**', {
    useHash: true
}).match('**.html', {
    useHash: false
});

stbui.match('/widget/lib/*.js', {
    useHash: false,
    isMod: false
}).match('::package', {
    postpackager: stbui.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
});

stbui.media('dev').match('*.{js,css}', {
    optimizer: null
});

stbui.media('prd').match('/widget/**.css', {
    packTo: '/css/component.css'
}).match('/widget/**.js', {
    packTo: '/js/component.js'
});

stbui.media('min').match('/widget/**.css', {
    packTo: '/css/component.min.css'
}).match('/widget/**.js', {
    packTo: '/js/component.min.js'
});