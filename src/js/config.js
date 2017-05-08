/**
 * @Date:   2017-04-16T19:27:17+08:00
 * @Last modified time: 2017-05-08T21:14:40+08:00
 */
 var app = new Object({
   appModel : new Object({
     Models: {},
     Views: {},
     Collections: {},
    //  Controllers: {},
     Routers:{}
   }),
   appConfig : new Object({
     IP: "", //主机IPhttp://127.0.0.1:8080
     SITEID : "79affb2429ef48faa57c802a88dd8e7f",
     FRESHENTIME: 5e3  //首页刷新时间
   }),
   globalFun:new Object({
     isResultMsg:function(object){
       if(null !== object){
        alert("提示信息："+object);
      }
    },
    isLoginStatus:function(){
      if($.cookie("admin")){
        return true;
      }else {
        window.location = "login.html";
      }
    }
   })
 });
module.exports = app;
