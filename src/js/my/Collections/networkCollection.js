/**
 * @Date:   2017-05-09T07:33:23+08:00
 * @Last modified time: 2017-05-09T07:36:13+08:00
 */
 var app = require("../../config.js");
app.appModel.Collections.networkCollection = Backbone.Collection.extend({
//  model:app.appModel.Models.areaModel,
});
module.exports = app;
