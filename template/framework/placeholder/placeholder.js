/**
 * @name 在IE8及以下支持placeholder
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

var placeholder = function () {
    if ('placeholder' in document.createElement('input')) { //如果浏览器原生支持placeholder
        return;
    }

    function target(e) {
        var ee = ee || window.event;
        return ee.target || ee.srcElement;
    }

    function _getEmptyHintEl(el) {
        var hintEl = el.hintEl;
        return hintEl && g(hintEl);
    }

    function blurFn(e) {
        var el = target(e);
        if (!el || el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
            return; //IE下，onfocusin会在div等元素触发
        }
        var emptyHintEl = el.__emptyHintEl;
        if (emptyHintEl) {
            //clearTimeout(el.__placeholderTimer||0);
            //el.__placeholderTimer=setTimeout(function(){//在360浏览器下，autocomplete会先blur再change
            if (el.value) {
                emptyHintEl.style.display = 'none';
            } else {
                emptyHintEl.style.display = '';
            }
            //},600);
        }
    }

    function focusFn(e) {
        var el = target(e);
        if (!el || el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
            return; //IE下，onfocusin会在div等元素触发
        }
        var emptyHintEl = el.__emptyHintEl;
        if (emptyHintEl) {
            //clearTimeout(el.__placeholderTimer||0);
            emptyHintEl.style.display = 'none';
        }
    }

    if (document.addEventListener) { //ie
        document.addEventListener('focus', focusFn, true);
        document.addEventListener('blur', blurFn, true);
    } else {
        document.attachEvent('onfocusin', focusFn);
        document.attachEvent('onfocusout', blurFn);
    }

    var elss = [document.getElementsByTagName('input'), document.getElementsByTagName('textarea')];
    for (var n = 0; n < 2; n++) {
        var els = elss[n];
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            var placeholder = el.getAttribute('placeholder'),
                emptyHintEl = el.__emptyHintEl;
            if (placeholder && !emptyHintEl) {
                emptyHintEl = document.createElement('strong');
                emptyHintEl.innerHTML = placeholder;
                emptyHintEl.className = 'placeholder';
                emptyHintEl.onclick = function (el) {
                    return function () {
                        try {
                            el.focus();
                        } catch (ex) {
                        }
                    };
                }(el);
                if (el.value) {
                    emptyHintEl.style.display = 'none';
                }
                el.parentNode.insertBefore(emptyHintEl, el);
                el.__emptyHintEl = emptyHintEl;
            }
        }
    }
};

module.exports = placeholder;