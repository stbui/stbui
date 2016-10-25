/**
 * @name 加载脚本组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

var request = {
    ajax: function () {

    },
    loadScript: function (uri, callname, fn, charset) {
        var caller = callname || '';

        var _script = document.createElement("script");
        _script.type = "text/javascript";
        _script.charset = charset || "utf-8";
        _script._fun = typeof cb != "undefined" ? cb : new Function();
        _script[document.all ? "onreadystatechange" : "onload"] = function () {
            if (document.all && this.readyState != "loaded" && this.readyState != "complete") {
                return;
            }

            fn && fn(eval(callname));

            this[document.all ? "onreadystatechange" : "onload"] = null;
            var _t = this;
            _t.parentNode.removeChild(_t);
        };
        _script.src = uri;

        document.getElementsByTagName("head").item(0).appendChild(_script);
    },
    jsonp: function (uri, callname, fn, charset) {
        var caller = callname || 'callback';

        var _script = document.createElement("script");
        _script.type = "text/javascript";
        _script.charset = charset || "utf-8";
        _script._fun = typeof cb != "undefined" ? cb : new Function();
        _script[document.all ? "onreadystatechange" : "onload"] = function () {
            if (document.all && this.readyState != "loaded" && this.readyState != "complete") {
                return;
            }

            this[document.all ? "onreadystatechange" : "onload"] = null;
            var _t = this;
            _t.parentNode.removeChild(_t);
        };
        _script.src = uri;
        window[caller] = typeof fn != "undefined" ? fn : new Function();
        document.getElementsByTagName("head").item(0).appendChild(_script);
    }
}


module.exports = request;