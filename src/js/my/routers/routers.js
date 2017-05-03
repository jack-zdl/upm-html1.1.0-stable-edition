/**
 * @Date:   2017-04-21T12:06:39+08:00
 * @Last modified time: 2017-05-03T09:38:55+08:00
 */

var app = require("../../config.js");
var dashboardMain = require("../../main/dashboardMain.js");
var areaMain = require("../../main/areasMain.js");
var Backbone = require('backbone');
app.appModel.Routers.main = Backbone.Router.extend({
  //hash maps for Routers
  routes: {
    "ajax/dashboard.html": "dashboard",
    "ajax/resources/area.html": "area"
  },
  dashboard: function() {

    dashboardMain();
  },
  area: function() {
    areaMain();
  }

});
module.exports = app;
