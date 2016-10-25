/**
 * @name 浏览器组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

var browser = {
    ie6:function () {

    },
    ie7:function () {

    },
    ie8:function () {

    },
    msie:function () {

    },
    firefox:function () {

    },
    safari:function () {

    },
    opera:function () {

    },
    ie:function (equ) {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器

        if (isIE) {
            var IE5 = IE55 = IE6 = IE7 = IE8 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE55 = fIEVersion == 5.5;
            IE6 = fIEVersion == 6.0;
            IE7 = fIEVersion == 7.0;
            IE8 = fIEVersion == 8.0;
            if (IE55) {
                location.href = "http://exaccount.eastmoney.com/BroswerUpgrade.html";
            }
            if (IE6) {
                location.href = "http://exaccount.eastmoney.com/BroswerUpgrade.html";
            }
            if (IE7) {
                location.href = "http://exaccount.eastmoney.com/BroswerUpgrade.html";
            }
        }
    }
}

module.exports = browser;