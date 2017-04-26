var Backbone = require('backbone');
var layout = require("./tempaltes/layout.html");
App.Routers.Main=Backbone.Router.extend({
  //hash maps for Routers
  routes:{
    "":"index",
    "/dashboard":"dashboard"
  },
  index:function(){
    //Homepage
  },
  dashboard:function(){
    //
  }

});
