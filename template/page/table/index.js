var table = require('../../framework/table/index');

var config = {
    data: [
        {
            name: '2016-08-10',
            name1: '文钱多多',
            name2: '卖出',
            name3: '匹凸匹',
            name4: '0.73%',
            name5: '12.95',
            name6: '1',
            name7: '查看关注'
        }, {
            name: '2016-08-10',
            name1: '文钱多多',
            name2: '买入',
            name3: '匹凸匹',
            name4: '0.73%',
            name5: '12.95',
            name6: '1',
            name7: '查看关注'
        }, {
            name: '2016-08-10',
            name1: '文钱多多',
            name2: '卖出',
            name3: '匹凸匹',
            name4: '0.73%',
            name5: '12.95',
            name6: '1',
            name7: '查看关注'
        }
    ],
    id: 'col9',
    grid: {
        class: 'table',
        fields: [
            {
                title: '时间',
                align: '',
                field: '',
                width: ''
            },
            {
                title: '用户名',
                align: '',
                field: '',
                width: ''
            },
            {
                title: '操作',
                align: '',
                field: '',
                width: ''
            },
            {
                title: '证券名称',
                align: '',
                field: '',
                width: '',
                content: ''
            },
            {
                title: '持仓占比',
                align: '',
                field: '',
                width: '',
                content: ''
            },
            {
                title: '价格',
                align: '',
                field: '',
                width: '',
                content: ''
            },
            {
                title: '总排名',
                align: '',
                field: '',
                width: '',
                content: ''
            }
            ,
            {
                title: '',
                align: '',
                field: '',
                width: '',
                content: ''
            }
        ]
    }
};

var handle = function (data, key) {
    var _data = data[key];
    var dom = [];

    switch (key) {
        case 'name1':
            dom.push({tagName: 'a', props: {href: '#'}, children: [_data]})
            break;
        case 'name2':
            if (_data == '卖出') {
                dom.push({tagName: 'span', props: {class: 'text-primary'}, children: [_data]})
            } else {
                dom.push(_data);
            }

            break;
        case 'name3':
            dom.push({tagName: 'a', props: {href: '#'}, children: [_data]})
            break;
        case 'name7':
            dom.push(
                {tagName: 'a', props: {href: '#', class: 'btn btn-primary'}, children: ['查看']},
                {tagName: 'a', props: {href: '#', class: 'btn btn-primary'}, children: ['关注']}
            )
            break;
    }

    return dom;
}

tableData(config).render(handle);