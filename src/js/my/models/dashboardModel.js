/**
 * @Date:   2017-04-23T17:45:10+08:00
 * @Last modified time: 2017-05-01T20:22:08+08:00
 */
app.appModel.Models.dashboaradCluster = Backbone.Model.extend({
  defaults: {
    id: "",
    text: "",
    icon: ""
  }

});

app.appModel.Models.dashboardHighchart = Backbone.Model.extend({
  changeData: function(obj_data, highchartOption) {
    var array = [];
    for (var key in obj_data) {
      var object = {};
      object[key] = obj_data[key];
      array.push(object);
    }
    var datalength = array.length;
    //var dataArray  = [];
    //查询几个线的数据即几个对象{"key":[{}{}],"key":[{},{}]}一共二个
    for (var i = datalength - 1; i >= 0; i--) {
      for (var k in array[i]) {
        highchartOption.series[i] = {};
        var name = null;
        switch (k) {
          case "hostUsed":
            name = "主机数量";
            break;
          case "containerUsed":
            name = "容器数量";
            break;
          case "warning":
            name = "容器数量预警线";
            break;
          default:
          name="线名错误";
        }
        highchartOption.series[i].name = name;
        highchartOption.series[i].type = "area";
        var outArray = [];
        //for (var j = array[i][k].length - 1; j >= 0; j--) {
        for (var j = 0; j < array[i][k].length; j++) {
          var dataArray = [];
          for (var innerk in array[i][k][j]) {
            dataArray.push(array[i][k][j][innerk]);
          }
          outArray.push(dataArray.reverse());
        }
        highchartOption.series[i].data = outArray;
      }
    }
    return highchartOption;
  }
});

app.appModel.Models.dashboardprogress = Backbone.Model.extend({
  defaults: {
    executeRunningCnt: "",
    executeFailureCnt: "",
    executeSuccessCnt: "",
    unapprovedCnt: "",
    unapproveCnt: "",
    approvedCnt: ""
  },
  //处理模型数据，将dashboardprogress变成指定的数据
  changeData: function() {
    var data = {};
    var totleData = this.get("executeRunningCnt") +
      this.get("executeFailureCnt") +
      this.get("executeSuccessCnt") +
      this.get("unapprovedCnt") +
      this.get("unapproveCnt") +
      this.get("approvedCnt");
    var executeSuccess = this.get("executeSuccessCnt");
    var executeFail = this.get("executeFailureCnt");
    var executeing = this.get("executeRunningCnt");
    //未执行
    var disexecutePercent = (this.get("unapprovedCnt") +
      this.get("unapproveCnt") + this.get("approvedCnt")) / totleData * 100;
    //执行成功
    var executeSuccessPercent = this.get("executeSuccessCnt") / totleData * 100;
    //执行失败
    var executeFailPercent = this.get("executeFailureCnt") / totleData * 100;
    //执行中
    var executeingPercent = this.get("executeRunningCnt") / totleData * 100;

    var disexecuteTotle = this.get("unapprovedCnt") +
      this.get("unapproveCnt") +
      this.get("approvedCnt");
    data.disexecute = {
      disexecuteTotle: disexecuteTotle,
      disexecutePercent: disexecutePercent
    };
    data.executeSuccess = {
      executeSuccess: executeSuccess,
      executeSuccessPercent: executeSuccessPercent
    };
    data.executeFail = {
      executeFail: executeFail,
      executeFailPercent: executeFailPercent
    };
    data.executeing = {
      executeing: executeing,
      executeingPercent: executeingPercent
    };
    return data;
  }
});

app.appModel.Models.dashboardPie = Backbone.Model.extend({
  // defaults:{
  //   container:{
  //     containerSum:""
  //   },
  //   disk:{
  //     diskUsedSize:"",
  //     diskSumSize:""
  //   },
  //   mem:{
  //     memUsedSize:"",
  //     memSumSize:""
  //   },
  //   cpu:{
  //     cpuSum:"",
  //     cpuUsed:""
  //   }
  // }
});

module.exports = app;
