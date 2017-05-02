/**
 * @Date:   2017-04-21T12:06:39+08:00
 * @Last modified time: 2017-05-02T07:57:18+08:00
 */



var Backbone = require('backbone');
app.appModel.Routers.main=Backbone.Router.extend({
  //hash maps for Routers
  routes:{
    "":"index",
    "/dashboard":"dashboard"
  },
  index:function(){
    //Homepage
    alert("测试");
  },
  dashboard:function(){
    //
  }

});
