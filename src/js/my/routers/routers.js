/**
 * @Date:   2017-04-21T12:06:39+08:00
 * @Last modified time: 2017-05-08T16:14:19+08:00
 */

var app = require("../../config.js");
var dashboardMain = require("../../main/dashboardMain.js");
var areaMain = require("../../main/areasMain.js");
var loginMain = require("../../main/loginMain.js");
var Backbone = require('backbone');
app.appModel.Routers.main = Backbone.Router.extend({
  //hash maps for Routers
  routes: {
    "login.html": "loginFun",
    "ajax/dashboard.html": "dashboardFun",
    "ajax/resources/area.html": "areaFun"
  },
  loginFun: function() {
    alert("测试");
    loginMain();
  },
  dashboardFun: function() {
    dashboardMain();
  },
  areaFun: function() {
    areaMain();
  }

});
module.exports = app;
