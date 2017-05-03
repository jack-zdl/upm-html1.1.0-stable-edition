/**
 * @Date:   2017-05-01T19:57:55+08:00
 * @Last modified time: 2017-05-03T16:12:26+08:00
 */
var $ = require('../libs/jquery-2.1.1.min.js');
var _ = require("../plugin/underscore/underscore.js");
var Backbone = require("../plugin/backbone/backbone.js");
var ajaxModel = require("../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../my/vo/judgeStatusUtilModel.js");
var app = require("../my/models/areaModel.js");
var app = require("../my/collections/areasCollection.js");
var app = require("../my/views/areaView.js");




function areasMain() {
  var AREAURL = app.appConfig.IP + "/UPM_API/v1.0/areas?siteId=" + app.appConfig.SITEID;
  var NFSURL = app.appConfig.IP + "/UPM_API/v1.0/selections/nfs-backups?siteId=" + app.appConfig.SITEID;
  var ajax = new ajaxModel();
  var judgeStatus = new judgeStatusUtilModel();

  function areasList() {
    var result = ajax.get(AREAURL);
    var data = judgeStatus.status(result);
    if (null !== data) {
      debugger;
    //  var areaResource = new app.appModel.Collections.areasCollection(data);
      var areaJqgrid = new app.appModel.Views.areaJqgrid({
        model: data
      });
    } else {
      alert("提示信息：" + data);
    }
    var areaViewAction = new app.appModel.Views.areaAction();
    var areaModal = new app.appModel.Views.areaBootstrapModal();
  }
  areasList();
}
module.exports = areasMain;
