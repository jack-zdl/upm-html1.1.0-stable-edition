/**
 * @Date:   2017-04-21T12:06:39+08:00
 * @Last modified time: 2017-05-08T20:51:36+08:00
 */

var app = require("../../config.js");
var dashboardMain = require("../../main/dashboardMain.js");
var areaMain = require("../../main/areasMain.js");
var loginMain = require("../../main/loginMain.js");
var nfsMain = require("../../main/nfsMain.js");
var Backbone = require('backbone');
app.appModel.Routers.main = Backbone.Router.extend({
  //hash maps for Routers
  routes: {
    "ajax/dashboard.html": "dashboardFun",
    "ajax/resources/area.html": "areaFun",
    "ajax/resources/nfs.html": "nfsFun"
  },
  dashboardFun: function() {
    var status = app.globalFun.isLoginStatus();
    dashboardMain();
  },
  areaFun: function() {
    var status = app.globalFun.isLoginStatus();
    areaMain();
  },
  nfsFun: function() {
      var status = app.globalFun.isLoginStatus();
      nfsMain();

  }

});
module.exports = app;
