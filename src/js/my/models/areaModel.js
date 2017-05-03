/**
 * @Date:   2017-05-01T20:06:14+08:00
 * @Last modified time: 2017-05-03T16:14:44+08:00
 * @description 比如对数据进行一些验证
 */
var app = require("../../config.js");
var _ = require("../../plugin/underscore/underscore.js");
app.appModel.Models.areaModel = Backbone.Model.extend({

});
app.appModel.Models.areaAddModel = Backbone.Model.extend({
  defaults: {
    name: "",
    description: "",
    siteId: "",
    nfsBackupId: ""
  },
  initialize:function(){
    this.on('invalid',function(model,error){
      alert(error);
    });
  },
  validate: function(attrs) {
    if (!_.isString(attrs.name)) return "名字必须是字符串";
    if (!_.isString(attrs.description)) return "描述必须是字符串";
    if (!_.isString(attrs.siteId)) return "站点必须是字符串";
    if (!_.isString(attrs.nfsBackupId)) return "nfs必须是字符串";
  }
});
module.exports = app;
