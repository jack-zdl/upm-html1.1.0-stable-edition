/**
 * @Date:   2017-05-05T11:10:26+08:00
 * @Last modified time: 2017-05-08T10:35:17+08:00
 */
var $ = require('../libs/jquery-2.1.1.min.js');
var _ = require("../plugin/underscore/underscore.js");
var Backbone = require("../plugin/backbone/backbone.js");
var ajaxModel = require("../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../my/vo/judgeStatusUtilModel.js");
var SELECTURL = app.appConfig.IP + "/upm-api/v1.0/select/";

function selectMain() {
  var ajax = new ajaxModel();
  var status = new judgeStatusUtilModel();
  var result = ajax.get(SELECTURL);

}
selectMain();
