/**
 * @Date:   2017-05-08T14:18:14+08:00
 * @Last modified time: 2017-05-08T18:00:13+08:00
 */
var app = require("../../config.js");
var ajaxModel = require("../../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../../my/vo/judgeStatusUtilModel.js");
var app = require("../../my/models/loginModel.js");
var LOGINURL =  app.appConfig.IP + "/UPM_API/v1.0/login";

var ajax = new ajaxModel();
var judgeStatus = new judgeStatusUtilModel();
var loginModel = new app.appModel.Models.loginModel();
app.appModel.Views.loginFrom = Backbone.View.extend({
  el: 'body',
  events: {
    'click #loginBut': 'submit'
  },
  submit: function() {
    var params = $("#login-form").serializeObject();

    if(loginModel.set(params,{"validate":true})){
      var result = ajax.post(AREAPOSTURL, JSON.stringify(params));
      var status = judgeStatus.resultStatus(result);
      app.globalFun.isResultMsg(status);

    }


  }
});
