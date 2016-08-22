(function () {
    var element = {
        create: function (tagName, props, children) {

        },
        createElement: function (str, attr) {
            if (!str || typeof attr !== 'object') {
                new Error('params empty');
            }

            var obj = document.createElement(str);

            for (var i in attr) {
                obj.setAttribute(i, attr[i]);
            }

            return obj;
        },
        render: function (domObj) {
            var domElement = this.createElement(domObj.tagName, domObj.props);

            var children = domObj.children || [];
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var ele = child.tagName !== undefined ? this.render(child) : document.createTextNode(child);

                domElement.appendChild(ele);
            }

            return domElement;
        },
        insertElement: function (parentElement, childElement) {
            return parentElement.appendChild(childElement);
        }
    }


    var tableData = function (config) {
        return new TableData(config);
    }

    TableData = function (config) {
        this.options = config || {};
        this.element = this.options.id || document.getElementsByTagName('body')[0];

        if (typeof this.element == 'string') {
            this.element = document.getElementsByClassName(this.element)[0];
        }
    }

    TableData.prototype = {
        constructor: TableData,
        init: function () {

        },
        render: function (bodyFn, headFn) {
            var tableHead = this.getHeader(headFn);
            var tableBody = this.getBody(bodyFn);
            var vdom = {
                tagName: 'table', props: {class: 'table'}, children: [
                    {tagName: 'thead', children: [{tagName: 'tr', children: tableHead}]},
                    {tagName: 'tbody', children: tableBody}]
            }

            var dom = element.render(vdom);
            element.insertElement(this.element, dom);
        },
        getHeader: function (fn) {
            var _options = this.options;
            var gridFields = _options.grid.fields;

            var tableHead = [];

            for (var i = 0; i < gridFields.length; i++) {
                var _gridFields = gridFields[i];
                if (_gridFields['width']) {
                    tableHead.push({
                        tagName: 'th',
                        props: {style: 'width:' + _gridFields['width']},
                        children: [_gridFields.title]
                    });
                } else {
                    tableHead.push({tagName: 'th', props: {}, children: [_gridFields.title]});
                }
            }

            return tableHead;
        },
        getBody: function (fn) {
            var _options = this.options;

            var tableBody = [];

            for (var i = 0; i < _options.data.length; i++) {
                var tableBodytd = [];
                var _data = _options.data[i];
                for (var k in _data) {
                    var _fn = fn && fn(_data, k);

                    if (_fn && _fn.length > 0) {
                        tableBodytd.push({tagName: 'td', children: _fn});
                    } else {
                        tableBodytd.push({tagName: 'td', children: [_data[k]]});
                    }
                }

                tableBody.push({tagName: 'tr', children: tableBodytd});
            }

            return tableBody;
        }

    }

    window.tableData = tableData;
})(window);