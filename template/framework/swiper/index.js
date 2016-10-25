/**
 * @name 轮播组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

/*
function Swiper(element,options) {
    this.element = (typeof element == 'string') ? $(element) : element;
    this.itemSlide = this.element.find('.swiper-slide');

    this.options = {
        index:0,
        cPage: 0,
        total:0,
        tPage: 0,
        endIndex: 0,
        delay:2.5,
        onStart: null,
        onEnd: null,
        onCurrent: null
    };

    $.extend(this.options, this.options, options);

    this.init();
}

Swiper.prototype = {
    init: function () {
        this.options.cPage = 0;
        this.options.total = this.itemSlide.length;
        this.options.tPage = this.options.total;
        this.options.endIndex = this.options.total;

        this.start();
    },
    render: function () {
        var self = this;

        if ($.isFunction(self.options.onCurrent)) {
            this.options.onCurrent(self);
        }

        self.itemSlide.removeClass('active').eq(self.options.cPage).addClass('active');
        self.element.find('.swiper-pagination-bullet').removeClass('active').eq(self.options.cPage).addClass('active');
    },
    start: function () {
        var self = this;

        self.options.onStart && self.options.onStart(self);

        self.pause();
        self.timer = setInterval(function () {
            self.change(1);
        }, self.options.delay*1000);
    },
    change: function (index) {
        var options = this.options;

        options.index = (options.index + index + options.total) % options.total;
        this.setPage(index);
    },
    setPage: function (index) {
        var options = this.options;

        if (options.cPage == options.tPage - 1 && index == 1) {
            this.options.onEnd && this.options.onEnd();
            options.cPage = 0;
        } else {
            options.cPage += index;
        }

        this.render();
    },
    pause: function () {
        clearInterval(this.timer);
    }
}


var swiper = new Swiper('.swiper', {
    onStart: function (_this) {
        var self = _this;

        $(".swiper-pagination-bullet").on("mouseover", function (e) {
            var index = $(this).index();
            self.options.index = index;
            self.options.cPage = index;
            self.render();
            self.pause();
        }).on('mouseleave', function () {
            self.start();
        });

        var $slide = self.itemSlide.eq(0);
        $slide.css('background', '#' + $slide.find('img').attr('alt'));
    },
    onCurrent: function (_this) {
        var self = _this;

        var $slide = self.itemSlide.eq(self.options.cPage);
        $slide.css('background', '#' + $slide.find('img').attr('alt'));
    }
});*/
