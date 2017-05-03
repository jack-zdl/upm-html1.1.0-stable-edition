/**
 * @Date:   2017-04-22T18:25:17+08:00
 * @Last modified time: 2017-05-03T09:33:33+08:00
 * commonsJS模块只需要加载一次  其他的文件就不需要加载了
 */
 var app = require("../../config.js");
var _ = require("underscore");
var ajaxModel = require("../vo/ajaxModel.js");
var judgeStatusUtilModel = require("../vo/judgeStatusUtilModel.js");

app.appModel.Views.dashboardClusterItem = Backbone.View.extend({
  tagName: 'li',
  className: 'cluster-click',
  events: {
    'click .cluster-click': 'changeCluster'
  },
  template: function() {
    return _.template("<li >" + "<a  href='javascript:void(0);'  class='cluster-click'  id='<%= id %>'><i class='fa fa-circle txt-color-green' ></i><span> <%= name %> </span></li>");
  },
  render: function() {
    this.$el.html(this.template()(this.model.toJSON()));
    return this;
  },
  changeCluster: function(content) {
    $("#cluster-text").html(content.target.innerHTML);
    this.setupPieChart(content.target.id);
  }
});

app.appModel.Views.dashboardCluster = Backbone.View.extend({
  //  el: $('#clusterView'),//绑定页面元素
  el: "#clusterView",
  events: {
    'click .cluster-click': 'changeCluster'
  },
  initialize: function() {
    //this.listenTo();
  },
  changeCluster: function(content) {
    $("#cluster-text").html(content.target.innerHTML);
    this.setupPieChart(content.target.id);
  },
  render: function(content) {
    $("#cluster-text").append(_.first(this.model.models).get("text"));
    // var colorTxt = ["txt-color-green", "txt-color-red"];
    // var j = 0;
    // for (var i = 0; i < this.model.models.length; i++) {
    //   if (j == 2) {
    //     j = 0;
    //   }
    //   this.setupPieChart(this.model.models[i].get("id"));
    //   var classText = "fa fa-circle" + colorTxt[j]; //onclick='clusterOnclick(this)'
    //   $("#cluster-ui").append("<li >" + "<a  href='javascript:void(0);'  class='cluster-click' value=" + this.model.models[i].get("id") + " id=" + this.model.models[i].get("id") + "><i class='fa fa-circle txt-color-green' ></i><span>" + this.model.models[i].get("text") + "</span></li>");
    //   j++;
    // }
  },
  setupClusterList: function(content) {
    this.render();
    var colorTxt = ["txt-color-green", "txt-color-red"];
    var j = 0;
    for (var i = 0; i < this.model.models.length; i++) {
      if (j == 2) {
        j = 0;
      }
      this.setupPieChart(this.model.models[i].get("id"));
      var classText = "fa fa-circle" + colorTxt[j]; //onclick='clusterOnclick(this)'
      $("#cluster-ui").append("<li class='cluster-click'>" + "<a  href='javascript:void(0);'   value=" + this.model.models[i].get("id") + " id=" + this.model.models[i].get("id") + "><i class='fa fa-circle txt-color-green' ></i><span>" + this.model.models[i].get("text") + "</span></li>");
      j++;
    }
  },
  setupPieChart: function(id) { //根据id来变换pieChart
    var pieChartUrl = "/UPM_API/v1.0/dashboards/cluster_resources_allocation?clusterId=";
    var ajax = new ajaxModel();
    var judgeStatus = new judgeStatusUtilModel();
    var result = ajax.get(app.appConfig.IP + pieChartUrl + id);
    var data = judgeStatus.status(result);
    var dashboardList = new app.appModel.Models.dashboardPie(data);
    var pieChart = new app.appModel.Views.dashboardPieChart();
    pieChart.setupPieChart(data);
  }
});
app.appModel.Views.dashboardProgress = Backbone.View.extend({
  initialize: function() {},
  setupProgress: function(object) {
    $("#disappearance").html(object.disexecute.disexecuteTotle);
    $("#disappearance-style").css({
      "width": object.disexecute.disexecutePercent + "%"
    });
    $("#agree").html(object.executeSuccess.executeSuccess);
    $("#agree-style").css({
      "width": object.executeSuccess.executeSuccessPercent + "%"
    });
    $("#disagree").html(object.executeFail.executeFail);
    $("#disagree-style").css({
      "width": object.executeFail.executeFailPercent + "%"
    });
    $("#action").html(object.executeing.executeing);
    $("#action-style").css({
      "width": object.executeing.executeingPercent + "%"
    });
  }

});
app.appModel.Views.dashboardHighchart = Backbone.View.extend({
  setupHighchart: function(object) {
    $('#updating-chart').highcharts(object);
  }
});
app.appModel.Views.dashboardPieChart = Backbone.View.extend({
  setupPieChart: function(data) {
    $('#cpu-percent').data('easyPieChart').update((data.cpu.cpuUsed / data.cpu.cpuSum) * 100);
    $('#mem-percent').data('easyPieChart').update((data.mem.memUsedSize / data.mem.memSumSize) * 100);
    $('#disk-percent').data('easyPieChart').update((data.disk.diskUsedSize / data.disk.diskSumSize) * 100);
    $('#container-percent').data('easyPieChart').update(data.container.containerSum);
  }
});

module.exports = app;
