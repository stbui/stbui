require("../../widget/lib/base.css");

require("../../widget/panel/index.css");
require("../../widget/panel/index.primary.css");
require("../../widget/panel/index.default.css");

require("../../widget/table/index.css");
require("../../widget/tabs/index.css");
require("../../widget/list/index.css");
require("../../widget/thumbnail/index.css");
require("../../widget/button/index.css");
require("../../widget/search/index.css");
require("../../widget/dropdown/index.css");
require("../../widget/article/index.css");
require("../../widget/navbar/index.css");
require("../../widget/pagination/index.css");
require("../../widget/footer/index.css");

require('../../widget/alert/index.css');


require.ensure(['../../widget/dropdown/index'], function (require, m) {

});

require.ensure(['../../widget/tabs/index'], function (require) {
    //require('../../widget/tabs/index');
});

require.ensure(['../../widget/ajax/ajax.js'], function (require) {
    //require('../../widget/ajax/ajax.js');
});

