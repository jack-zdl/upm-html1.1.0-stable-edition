/**
 * @Date:   2017-03-04T12:47:57+08:00
 * @Last modified time: 2017-04-26T11:32:50+08:00
 * @description reequire只需加载一次就可以了
 */

//require("!style-loader!css-loader!./style.css") // 载入 style.css
// require("./style.css")
// document.write("看看如何让它工作！");//测试内容
// document.write(require('./module.js')) // 添加模块
//测试common.js模块加载机制
//var common1 = require('./testCommon');
//common1.sayHello();
//var common1 = require('./testUnderscore');
//common1.sayHello();
//common1.b();
//var app = require("./js/model");
//alert("测试="+app.model.get("key"));
//alert("webpack");
var $ = require('jquery');
var _ = require("./js/plugin/undersource/underscore.js");
var Backbone = require("./js/plugin/backbone/backbone.js");
var app =require("./js/app.config.seed.js");
//var ajaxModel = require("./js/my/models/ajaxModel.js");
//var app= require("./js/my/views/dashboardView.js");
// function dashboardMain(){
//   var ajax  = new ajaxModel();
//   var result = ajax.get(app.appConfig.IP+"");
// }
//dashboardMain();
//var dashboard = new app.appModel.Views.dashboard();

//dashboard.render();
//test();
//alert(app.appConfig.IP);
