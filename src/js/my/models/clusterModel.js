/**
 * @Date:   2017-05-09T09:18:03+08:00
 * @Last modified time: 2017-05-09T09:21:38+08:00
 */
 var app = require("../../config.js");
 var _ = require("../../plugin/underscore/underscore.js");
 app.appModel.Models.clusterJqgridModel = Backbone.Model.extend({

 });
 app.appModel.Models.clusterAddModel = Backbone.Model.extend({
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
