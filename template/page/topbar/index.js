var stbui = function (el) {
    return new _stbui(el);
};
var _stbui = function (el) {
    this.el = (el && el.nodeType == 1) ? el : document;
};
_stbui.prototype = {
    constructor: this,
    addEvent: function (type, fn, capture) {
        var el = this.el;
        if (window.addEventListener) {
            el.addEventListener(type, fn, capture);
            var ev = document.createEvent("HTMLEvents");
            ev.initEvent(type, capture || false, false);

            if (!el["ev" + type]) {
                el["ev" + type] = ev;
            }
        } else if (window.attachEvent) {
            el.attachEvent("on" + type, fn);
            if (isNaN(el["cu" + type])) {
                // 自定义属性
                el["cu" + type] = 0;
            }
            var fnEv = function (event) {
                if (event.propertyName == "cu" + type) {
                    fn.call(el);
                }
            };
            el.attachEvent("onpropertychange", fnEv);
            if (!el["ev" + type]) {
                el["ev" + type] = [fnEv];
            } else {
                el["ev" + type].push(fnEv);
            }
        }
        return this;
    },
    fireEvent: function (type) {
        var el = this.el;
        if (typeof type === "string") {
            if (document.dispatchEvent) {
                if (el["ev" + type]) {
                    el.dispatchEvent(el["ev" + type]);
                }
            } else if (document.attachEvent) {
                el["cu" + type]++;
            }
        }
        return this;
    },
    removeEvent: function (type, fn, capture) {
        var el = this.el;
        if (window.removeEventListener) {
            el.removeEventListener(type, fn, capture || false);
        } else if (document.attachEvent) {
            el.detachEvent("on" + type, fn);
            var arrEv = el["ev" + type];
            if (arrEv instanceof Array) {
                for (var i = 0; i < arrEv.length; i += 1) {
                    el.detachEvent("onpropertychange", arrEv[i]);
                }
            }
        }
        return this;
    }
};

var droplist = document.getElementsByClassName('down-menu');
for(var i=0;i<droplist.length-1;i++) {
    var _dom = droplist[i];
    stbui(_dom).addEvent('click', function (e) {
        e.preventDefault();

        // var cls = droplist[0].className;
        // cls += ' show';
        // droplist[i].className = cls;

        console.log(_dom)
    })
}



function createElement(str, attr) {
    if (!str || typeof attr !== 'object') {
        new Error('params empty');
    }
    var obj = document.createElement(str);

    for (var i in attr) {
        obj.setAttribute(i, attr[i]);
    }

    return obj;
}

function insertElement(parentElement, childElement) {
    return parentElement.appendChild(childElement);
}


// var contanier = document.getElementsByClassName('drop-menu')[0];
var e = [
    {tagName: 'li', props: {class: '#'}, children: [{tagName: 'a', props: {class: '#'}, children: []}]},
    {tagName: 'li', props: {class: '#'}, children: []},
    {tagName: 'li', props: {class: '#'}, children: [{tagName: 'a', props: {class: '#'}, children: []}]},
]

function render(contanier, e) {
    var element
    var newElement

    for (var i = 0; i < e.length; i++) {
        console.log(e[i].tagName)
        element = createElement(e[i].tagName);
        newElement = insertElement(contanier, element);
    }
}


