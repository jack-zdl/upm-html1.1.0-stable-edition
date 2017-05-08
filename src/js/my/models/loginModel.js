/**
 * @Date:   2017-05-08T14:19:07+08:00
 * @Last modified time: 2017-05-08T14:31:04+08:00
 */
var app = require("../../config.js");
app.appModel.Models.loginModel = Backbone.Model.extend({
  defaults: {
    loginName: "",
    password: ""
  },
  initialize:function(){
    this.on('invalid',function(model,error){
      alert(error);
    });
  },
  validate: function(attrs) {
    if (!_.isString(attrs.loginName)) return "名字必须是字符串";
    if (!_.isString(attrs.password)) return "描述必须是字符串";
  }
});
module.exports=app;
