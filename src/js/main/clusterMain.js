/**
 * @Date:   2017-05-09T09:28:20+08:00
 * @Last modified time: 2017-05-09T09:59:47+08:00
 */
 var $ = require('../libs/jquery-2.1.1.min.js');
 var _ = require("../plugin/underscore/underscore.js");
 var Backbone = require("../plugin/backbone/backbone.js");
 var ajaxModel = require("../my/vo/ajaxModel.js");
 var judgeStatusUtilModel = require("../my/vo/judgeStatusUtilModel.js");
 var app = require("../my/models/clusterModel.js");
 var app = require("../my/collections/clusterCollection.js");
 var app = require("../my/views/clusterView.js");

 function clusterMain(){
   var CLUSTERURL = app.appConfig.IP + "/UPM_API/v1.0/clusters?siteId=" + app.appConfig.SITEID;

   var ajax = new ajaxModel();
   var judgeStatus = new judgeStatusUtilModel();

   var result = ajax.get(CLUSTERURL);
   var data = judgeStatus.status(result);
   if (null !== data) {
   //  var areaResource = new app.appModel.Collections.areasCollection(data);
     var areaJqgrid = new app.appModel.Views.clusterJqgrid({
       model: data
     });
   } else {
     alert("提示信息：" + data);
   }
   var clusterViewModal = new app.appModel.Views.clusterViewModal();
   var clusterViewAction = new   app.appModel.Views.clusterViewAction();

 }
 module.exports=clusterMain;
