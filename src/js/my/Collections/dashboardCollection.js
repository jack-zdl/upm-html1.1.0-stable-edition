/**
 * @Date:   2017-04-23T19:08:25+08:00
 * @Last modified time: 2017-05-03T09:33:08+08:00
 */
/**
 * [_ description]
 * @type {[type]}
 * @TODO 解决 var _ = require("underscore");
 */
 var app = require("../../config.js");
var _ =require("underscore");
app.appModel.Collections.dashboardCollection = Backbone.Collection.extend({
model:app.appModel.Models.dashboaradCluster,
getFirstModel:function(){
//可以自定义集合的操作，例如遍历出超过多少的集合
  // alert("自定义集合事件");this.models
  // var array = this.models;
  // var result = _.first(array);
  return _.first(this.models);

}
});
module.exports=app;
