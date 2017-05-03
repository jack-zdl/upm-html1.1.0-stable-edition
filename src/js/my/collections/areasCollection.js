/**
 * @Date:   2017-05-01T20:12:22+08:00
 * @Last modified time: 2017-05-03T16:14:15+08:00
 * @description 对集合进行一些操作，比如筛选出来一部分数据
 */
  var app = require("../../config.js");
app.appModel.Collections.areasCollection = Backbone.Collection.extend({
//  model:app.appModel.Models.areaModel,
});
module.exports = app;
