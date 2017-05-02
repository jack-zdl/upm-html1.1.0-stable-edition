/**
 * @Date:   2017-04-21T12:06:39+08:00
 * @Last modified time: 2017-05-02T21:15:50+08:00
 */


var dashboardMain = require("../../main/dashboardMain.js");
var Backbone = require('backbone');
app.appModel.Routers.main = Backbone.Router.extend({
  //hash maps for Routers
  routes: {
    "ajax/dashboard.html": "dashboard",
    "ajax/areaResource.html": "area"
  },
  dashboard: function() {
    alert("测试");
    dashboardMain();
  },
  area: function() {
    alert("测试");

  }

});
module.exports = app;
