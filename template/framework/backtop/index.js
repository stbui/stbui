/**
 * @name 返回顶部组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

var backtop = {
    init: function () {
        this.create();
        this.toggle();
    },
    create : function () {
        backtop.div = document.createElement("div");
        backtop.div.className = "backtop";
        backtop.div.id = "backtop";
        backtop.div.innerHTML = '<div class=backtop><button type=button id="backtop-icon-search" class="backtop-icon backtop-icon-search">行情</button><button type=button id="backtop-icon-up" class="backtop-icon backtop-icon-up" title="回到顶部" onclick="window.scroll(0,0);return false;"></button><div id="backtop-search" class=backtop-search><input id="keyword" type=text value="代码/名称/拼音" class=backtop-input autocomplete=off><button class=backtop-btn id="backtop-btn">查询</button></div></div>';
        document.body.appendChild(backtop.div);
        backtop.bind();
    },
    open: false,
    bind: function () {
        document.getElementById('backtop-btn').onclick = function () {
            var $key = document.getElementById("keyword");
            var value = $key.value;
            if (value != "" && value != "代码/名称/拼音") {
                window.open('http://quote.eastmoney.com/search.html?stockcode=' + value);
            }else {
                $key.focus();
            }
        }

        document.getElementById('backtop-icon-search').onclick = function () {
            var context = this;

            var $backtopSearch =document.getElementById('backtop-search');
            if(backtop.open) {
                $backtopSearch.style.display = "none";
                backtop.open = false;
            } else {
                context.style.backgroundColor = '##3A5E95';
                $backtopSearch.style.display = "block";
                backtop.open = true;
            }

        }

        document.getElementById('keyword').onfocus = function () {
            var $key = document.getElementById("keyword");
            $key.value = '';
        }
        document.getElementById('keyword').onblur = function () {
            var $key = document.getElementById("keyword");
            $key.value = '代码/名称/拼音';
        }



        var context = this;
        window.onscroll = this.debounce(function () {
            context.toggle();
        },500);
    },
    toggle: function () {
        var doc = document;
        if ((doc.documentElement.scrollTop + doc.body.scrollTop) > 500) {
            doc.getElementById("backtop-icon-up").style.visibility = "visible";
        }
        else {
            doc.getElementById("backtop-icon-up").style.visibility = "hidden";
        }
    },
    debounce: function (fn, delay) {
        var timer;
        return function(){
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context,args);
            },delay);
        };
    }
}

module.exports = backtop;
