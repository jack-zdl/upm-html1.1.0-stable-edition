/**
 * @Date:   2017-05-01T19:57:55+08:00
 * @Last modified time: 2017-05-01T20:07:53+08:00
 */
var $ = require('../libs/jquery-2.1.1.min.js');
var _ = require("../plugin/underscore/underscore.js");
var Backbone = require("../plugin/backbone/backbone.js");
var highcharts = require("../plugin/my/highcharts.js");
var ajaxModel = require("../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../my/vo/judgeStatusUtilModel.js");
var highchartOptionUtil = require("../my/vo/highchartOptionUtil.js");
var app = require("../my/models/dashboardModel.js");
var app = require("../my/collections/dashboardCollection.js");
var app = require("../my/views/dashboardView.js");

function areasMain() {
  var AREAURL = app.appConfig.IP + "/UPM_API/v1.0/areas?siteId=" + app.appConfig.SITEID;
  var ajax = new ajaxModel();
  var judgeStatus = new judgeStatusUtilModel();

  function areasList() {
    var result = ajax.get(CLUSTERURL);
    var data = judgeStatus.status(result);
    
  }
  areasList();
}
module.exports = areasMain;
