/**
 * @Date:   2017-05-01T18:27:00+08:00
 * @Last modified time: 2017-05-03T09:38:27+08:00
 */
 var $ = require('../libs/jquery-2.1.1.min.js');
 var _ = require("../plugin/underscore/underscore.js");
 var Backbone = require("../plugin/backbone/backbone.js");
 var highcharts = require("../plugin/my/highcharts.js");
 var ajaxModel = require("../my/vo/ajaxModel.js");
 var judgeStatusUtilModel = require("../my/vo/judgeStatusUtilModel.js");
 var highchartOptionUtil = require("../my/vo/highchartOptionUtil.js");
 var app = require("../config.js");
 var app = require("../my/models/dashboardModel.js");
 var app = require("../my/collections/dashboardCollection.js");
 var app = require("../my/views/dashboardView.js");


 function dashboardMain() {
   var ajax = new ajaxModel();
   var judgeStatus = new judgeStatusUtilModel();
   var highchartsUrl = "/UPM_API/v1.0/dashboards/resources_used?siteId=";
   var progressUrl = "/UPM_API/v1.0/dashboards/orders?siteId=";
   var clusterUrl = "/UPM_API/v1.0/selections/clusters";
   var pieChartUrl = "/UPM_API/v1.0/dashboards/cluster_resources_allocation?clusterId=";

   function clusterMain() {
     var result = ajax.get(app.appConfig.IP + clusterUrl);
     var dashboardList = new app.appModel.Collections.dashboardCollection(result);
     // //  var firstCluster = dashboardList.models[0].text;
     var firstCluster = dashboardList.getFirstModel();

     var dashboardView = new app.appModel.Views.dashboardCluster({
       model: dashboardList
     });
     dashboardView.setupClusterList(dashboardList);
   }
   //end clusterMain
   clusterMain();

   function highchartsMain() {
     var result = ajax.get(app.appConfig.IP + highchartsUrl + app.appConfig.SITEID);
     var date = judgeStatus.status(result);
     var dashboardHighchartModel= new app.appModel.Models.dashboardHighchart();
     var option = new highchartOptionUtil();
     var highchartOption = option.dashboardHighchartOption();
     var afterData = dashboardHighchartModel.changeData(date,highchartOption);
     var dashboardHighchartView =  new app.appModel.Views.dashboardHighchart();
     dashboardHighchartView.setupHighchart(afterData);
   }
   //end highchartsMain
   highchartsMain();

   function progressMain() {
     var result = ajax.get(app.appConfig.IP + progressUrl + app.appConfig.SITEID);
     var date = judgeStatus.status(result);
     var dashboardprogress = new app.appModel.Models.dashboardprogress(date);
     var afterData = dashboardprogress.changeData();
     var dashboardProgress = new app.appModel.Views.dashboardProgress();
     dashboardProgress.setupProgress(afterData);
   }
   //end progressMain
   progressMain();

   function pieChartMain() {
     var result = ajax.get(app.appConfig.IP + progressUrl + app.appConfig.SITEID);
     var date = judgeStatus.status(result);

   }
   //end pieChartMain
   //  pieChartMain();
 }
 //end dashboardMain
 //dashboardMain();
 module.exports=dashboardMain;
