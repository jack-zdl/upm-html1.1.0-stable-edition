/**
 * @Date:   2017-05-08T17:37:53+08:00
 * @Last modified time: 2017-05-08T22:40:17+08:00
 */
var $ = require('../libs/jquery-2.1.1.min.js');
var _ = require("../plugin/underscore/underscore.js");
var Backbone = require("../plugin/backbone/backbone.js");
var ajaxModel = require("../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../my/vo/judgeStatusUtilModel.js");
var app = require("../my/models/nfsModel.js");
//var app = require("../my/collections/nfsCollection.js");
var app = require("../my/views/nfsView.js");

function nfsMain() {

  var ajax = new ajaxModel();
  var judgeStatus = new judgeStatusUtilModel();
  var NFSURL = app.appConfig.IP + "/UPM_API/v1.0/nfsBackups?siteId=" + app.appConfig.SITEID;
  var result = ajax.get(NFSURL);
  var data = judgeStatus.status(result);
  if (null !== data) {
    var nfsView = new app.appModel.Views.nfsViewJqgrid({
      model: data
    });
  }
  var nfsViewModal = new app.appModel.Views.nfsViewModal();
  var areaViewAction = new app.appModel.Views.areaViewAction();
  var nfsAddFrom = new app.appModel.Views.nfsAddFrom();
  debugger;
  //  var nfsCollection = new app.appModel.Collections.nfsCollection (data);

  debugger;


}
module.exports = nfsMain;
