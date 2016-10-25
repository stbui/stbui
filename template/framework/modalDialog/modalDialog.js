/**
 * @name 对话框组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

var modalDialog = (function () {
    function modal(options) {
        var defaultoptions = {
            content: '', //内容
            showmask: true, //显示遮罩
            showclose: true, //显示关闭按钮
            onClose: function () { //事件 当关闭时

            },
            onOpen: function () { //事件 当打开完毕

            },
            onBeforeOpen: function () { //事件 打开之前

            }
        }
        this.options = $.extend(defaultoptions, options);
    }

    modal.prototype.show = function () { //显示弹出框
        this.options.onBeforeOpen();
        if (this.showobj) {
            this.alldiv.show();
            return false;
        }
        var _this = this;
        var maskdiv = $('<div class="gbmask"></div>');

        var modaldiv = $('<div class="gbpopbox"><a href="javascript:;" target="_self" class="gbpopboxclose" title="关闭"></a><div class="gbpopboxbody"></div></div>');

        var alldiv = $('<div class="gubamodal"></div>');
        alldiv.append(modaldiv);

        this.alldiv = alldiv;

        if (this.options.showmask) {
            alldiv.append(maskdiv);
            maskdiv.height($(document).height());
        }

        //多窗口支持
        var boxlength = $(".gbpopbox").length;
        $(".gbpopbox", alldiv).css({'z-index': 80001 + boxlength});
        $(".gbmask", alldiv).css({'z-index': 80000 + boxlength});

        $("body").append(alldiv);

        $(".gbpopboxbody", modaldiv).append(this.options.content);


        if (typeof this.options.content != 'string') {
            this.options.content.show();
            this.showobj = true;
        }
        else {
            this.showobj = false;
        }

        modaldiv.css({
            left: $(document).width() / 2 - modaldiv.width() / 2,
            top: $(window).height() / 2 - modaldiv.height() / 2 + $(window).scrollTop()
        });

        $(".gbpopboxclose", modaldiv).click(function () {
            _this.close();
        });

        this.options.onOpen();
    };

    modal.prototype.getSelf = function () { //返回对话框本身html
        return this.alldiv;
    }

    modal.prototype.close = function () { //关闭
        this.options.onClose();
        if (this.showobj) {
            this.alldiv.hide();
        }
        else {
            this.alldiv.remove();
        }

    };

    modal.prototype.closeAllModal = function () { //关闭所有的对话框
        $(".gubamodal").remove();
    };

    return modal;
})();

module.exports = modalDialog;