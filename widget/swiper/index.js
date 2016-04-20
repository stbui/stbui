require('./index.css');

var swiper = {
    index: 0,
    num: 5,
    data: {},
    cPage: 0,
    tPage: 0,
    endIndex: 0,
    init: function () {

        this.element = document.getElementsByClassName('swiper')[0];
        this.wrapper = document.getElementsByClassName('swiper-wrapper')[0];
        this.item = this.wrapper.getElementsByClassName('swiper-slide');

        this.tPage = Math.ceil(this.item.length / this.num);
        this.tPage = 5;
        this.endIndex = (this.item.length - 1 + this.num) % this.num;


        this.goIndex();
    },
    digitalItem: function (e) {
        this.pagination = document.getElementsByClassName('swiper-pagination-bullet');

        this.removeClass(this.pagination);

        var name = ' active';
        var className = this.pagination[this.cPage].className;
        className += name;

        this.pagination[this.cPage].className = className;
    },
    goIndex: function () {
        var self = this;

        $('.swiper-pagination-bullet').on('mouseover', function () {
            var $this = $(this).index();
            self.index = $this;
            self.cPage = $this;
            self.render();

            self.pause();
        }).mouseleave(function (e) {
            self.start();
        });

    },
    render: function () {
        this.removeClass();
        //this.addClass();

        var name = ' active';
        var className = this.item[this.cPage].className;
        className += name;

        this.item[this.cPage].className = className;


        this.digitalItem();

    },
    pause: function() {
        clearInterval(this.timer);
    },
    change: function (index) {
        this.index = (this.index + index + this.num) % this.num;
        this.setPage(index);
    },
    setPage: function (index) {
        if (this.cPage == this.tPage - 1 && index == 1) {
            this.cPage = 0;
        } else {
            this.cPage += index;
        }

        this.render();
    },
    start: function () {
        var self = this;
        this.timer = setInterval(function () {
            self.change(1);
        }, 2500);
    },
    addClass: function (element, name) {
        element = element || this.item;
        name = name || 'active';

        var className = element[this.cPage].className;
        className += name;

        element[this.cPage].className = className;
    },
    removeClass: function (id, name) {
        var element = id || this.item;
        var key = name || 'active';

        for (var i in element) {
            var item = element[i];
            if (!item.className) break;

            if (item.className.indexOf(key)) {
                item.className = item.className.replace(key, '').replace(/\s+/g, '');
            }
        }
    }
};

swiper.init();
swiper.start();
