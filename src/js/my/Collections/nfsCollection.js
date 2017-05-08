/**
 * @Date:   2017-05-08T17:38:37+08:00
 * @Last modified time: 2017-05-08T21:15:42+08:00
 * @TODO 我需要对集合进行重排序 以创建时间sort
 */
var app = require("../../config.js");
app.appModel.Collections.nfsCollection = Backbone.Collection.extend({
  //model: app.appModel.Models.nfsModel,
});
module.exports = app;
