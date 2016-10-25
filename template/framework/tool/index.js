/**
 * @name 数据处理组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

var tool = {
    getRiseColor: function (price, type) {
        var color = 'text-gray';
        var style = '##484848';

        if (price > 0) {
            color = 'text-red';
            style = '#f00';
        } else if (price < 0) {
            color = 'text-green';
            style = '#090';
        } else {
            color = 'text-gray';
            style = '##484848';
        }

        if (type) {
            return style;
        }

        return color;
    },
    toYuan: function (str) {

        return str + '元';

    },
    toDigit: function (str) {
        return str;
    },
    //小数转换成百分数
    toRate: function (str) {
        var newstr = "";
        str = str ? str : 0;
        newstr = (str * 100).toFixed(2) + "%";
        return newstr;
    },
    getCjmxValue: function (val) {
        var unit = "";
        if (isNaN(val)) {
            return "-";
        } else {
            val = parseFloat(val);
            if (val >= 1e4) {
                val = val / 1e4;
                return val.toFixed(0) + "万";
            } else {
                return val;
            }
        }
    }
}

module.exports = tool;