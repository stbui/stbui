'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = babel;
function babel() {
    return {
        cacheDirectory: true,
        presets: [require.resolve('babel-preset-es2015-ie'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
        plugins: [require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-transform-decorators-legacy')]
    };
}
module.exports = exports['default'];