/**
 * @name 下拉列表组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

function dropDown(element, options) {

    this.element = element;
    if (typeof element == 'string') {
        this.element = $(element);
    }

    var defaults = {
        onSelect: null,
        onClose: null,
        onOpen: null
    }

    this.options = $.extend(defaults, options);
}

dropDown.prototype = {
    toggle: function () {
        var self = this;
        var element = this.element;
        var $droplist = element.find('.dropdown-content');
        var status = false;

        element.on('click', function (e) {
            e.stopPropagation();
            status = $droplist.hasClass('open');
            if (status) {
                $droplist.removeClass('open');
            } else {
                $droplist.addClass('open');
            }
        });

        $droplist.find('li').on('click', function (e) {
            var $this = $(this);
            element.find('.dropdown-caption').text($this.text())
            var index = $this.index();

            self.options.onSelect && self.options.onSelect.call(this, index);
        });


        $(document).on('click', function (e) {
            status = $droplist.hasClass('open');
            if (status) {
                $droplist.removeClass('open');
            }
        });
    },
    open: function () {

    },
    close: function () {

    }
}

module.exports = dropDown;