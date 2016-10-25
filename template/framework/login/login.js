/**
 * @name 用户登录组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.11
 */

var cookies = require('../cookie/index');
var passport = require('./passport');

var login = {
    /*
     * 登录模块，登录成功后自动刷新页面
     * @param {string} username 用户名/手机号/邮箱
     * @param {string} password 密码
     * @param {uri} referer 当前访问地址
     * */
    request: function (username, password, referer) {
        var url = 'http://common.passport.eastmoney.com/handler/tonslogin';
        var data = {
            un: username,
            p: password,
            jn: 'resultCode',
            c: referer || window.location.href
        };

        $.ajax({
            url: url,
            dataType: 'script',
            data: data,
            jsonp: 'cb',
            success: function (data) {
                // 接口返回的竟然是代码
                /*
                 501：登录失败
                 510: 登陆成功
                 503：xxx
                 * */
                switch (resultCode) {
                    case 501:
                        alert('用户名或密码错误！');
                        break;
                    case 503:
                        window.location.href = 'http://passport.eastmoney.com/Login.aspx';
                        break;
                    case 510:
                        window.location.reload();
                        break;
                    default:
                        alert('未知错误！');
                        break;
                }
            },
            error: function (e) {
                alert('网络异常，请稍后再试！');
            }
        });
    },
    isLogin: function () {
        if (!this.getUserInfo()) {
            return false;
        }

        return true;
    },
    login: function () {
        // 不支持https
        if (document.all && !window.XMLHttpRequest) {
            window.open('http://exaccount.eastmoney.com/BroswerUpgrade.html');
            return;
        }

        if (!this.isLogin()) {
            passport.request();

            return false;
        }
        return true;
    },
    getUserName: function () {
        if (!this.getUserInfo()) {
            return '';
        }

        return this.getUserInfo()[2];
    },
    getUserId: function () {
        if (!this.getUserInfo()) {
            return '';
        }

        return this.getUserInfo()[0];
    },
    getUserInfo: function () {
        var pi = cookies.get('pi');
        if (!pi || pi == '') {
            return false;
        }

        var userInfo = pi.split(';');

        return userInfo;
    },
    deleteUserInfo: function () {
        var arr = ['pi', 'ut', 'ct', 'uidal'];

        for (var i = 0; i < arr.length; i++) {
            cookies.del(arr[i], '/', 'eastmoney.com');
        }
    },
    logout: function () {
        this.deleteUserInfo();
        window.location.reload();
    }
}

module.exports = login;