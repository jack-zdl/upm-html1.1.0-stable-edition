/**
 * @Date:   2017-04-21T12:06:39+08:00
 * @Last modified time: 2017-05-05T11:10:03+08:00
 */

var app = require("../../config.js");

var Backbone = require('backbone');


app.appModel.Routers.main = Backbone.Router.extend({
  //hash maps for Routers
  routes: {
    "ajax/select.html": "select"
  },
  select: function() {


  }

});
module.exports = app;
