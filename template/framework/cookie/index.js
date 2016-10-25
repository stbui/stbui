/**
 * @name 本地存储组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

var cookies = {
    set: function (name, value, expires, path, domain) {
        expires = new Date(new Date().getTime() + (((typeof expires == "undefined") ? 12 * 7200 : expires)) * 1000);
        var tempcookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires.toGMTString() : "") +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "");
        (tempcookie.length < 4096) ? document.cookie = tempcookie : alert("The cookie is bigger than cookie lagrest");
    },


    get: function (name) {
        var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (xarr != null)
            return unescape(xarr[2]);
        return null;
    },

    del: function (name, path, domain) {
        if (this.get(name))
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "; path=/") +
                ((domain) ? "; domain=" + domain : "") +
                ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    },
    day: function (xd) {
        return xd * 24 * 3600;
    },
    hour: function (xh) {
        return xh * 3600;
    }
};

module.exports = cookies;