/**
 * @Date:   2017-05-09T07:47:24+08:00
 * @Last modified time: 2017-05-09T08:12:15+08:00
 */
var $ = require('../libs/jquery-2.1.1.min.js');
var _ = require("../plugin/underscore/underscore.js");
var Backbone = require("../plugin/backbone/backbone.js");
var ajaxModel = require("../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../my/vo/judgeStatusUtilModel.js");
var app = require("../my/models/networkModel.js");
var app = require("../my/Collections/networkCollection.js");
var app = require("../my/views/networkView.js");



function networkMain() {
  var NETWORKURL = app.appConfig.IP + "/UPM_API/v1.0/networkings?siteId="+ app.appConfig.SITEID;
  var ajax = new ajaxModel();
  var judgeStatus = new judgeStatusUtilModel();

  var result = ajax.get(NETWORKURL);
  var data = judgeStatus.status(result);
  if (null !== data) {
  //  var areaResource = new app.appModel.Collections.areasCollection(data);
    var networkViewJqgrid = new app.appModel.Views.networkViewJqgrid({
      model: data
    });
  } else {
    alert("提示信息：" + data);
  }
  var networkViewModal=new app.appModel.Views.networkViewModal();
  var networkViewAction= new app.appModel.Views.networkViewAction();
}
module.exports = networkMain;
