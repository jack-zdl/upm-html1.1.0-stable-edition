/**
 * @Date:   2017-05-09T07:33:46+08:00
 * @Last modified time: 2017-05-09T09:34:15+08:00
 */
var app = require("../../config.js");
var app = require("../../my/models/networkModel.js");
var ajaxModel = require("../../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../../my/vo/judgeStatusUtilModel.js");


app.appModel.Views.networkViewJqgrid = Backbone.View.extend({
  el: "#pjqgrid",
  initialize: function() {
    this.render();
  },
  render: function() {
    if ($("#jqgrid tr:visible").length === 0) {
      jQuery("#jqgrid").jqGrid({
        data: this.model,
        datatype: "local",
        height: 'auto',
        colNames: ["所属区域", "网段名称", "起始IP", "结束IP", "掩码", "网关", "标记vlanID", "可用"],
        colModel: [{
            name: 'areaName',
            index: 'areaName',
            align: "center"
          },
          {
            name: 'name',
            index: 'networkIp',
            align: "center"
          },
          {
            name: 'startIp',
            index: 'startIp',
            align: "center"
          },
          {
            name: 'endIp',
            index: 'endIp',
            align: "center"
          },
          {
            name: 'prefix',
            index: 'prefix',
            align: "center"
          },
          {
            name: 'gateway',
            index: 'gateway',
            align: "center"
          },
          {
            name: 'vlanId',
            index: 'vlanId',
            align: "center"
          },
          {
            name: 'enabled',
            index: 'enabled',
            align: "center"
          }

        ],
        rowNum: 10000,
        editurl: "dummy.html",
        caption: "网段列表",
        viewrecords: true,
        toolbarfilter: true,
        sortorder: "asc",
        forceFit: true,
        autowidth: true,
        rownumbers: true,
        onSelectRow: function(id, status) {
          if (status === false) {
            jQuery("#jqgrid").jqGrid('resetSelection');
          }
          return (true);
        },
      });
    } else {
      jQuery("#jqgrid").setGridParam({
        data: this.model,
        datatype: "local"
      }).trigger("reloadGrid");

    }
    //更改jqgrid的长度
    $(window).on('resize.jqGrid', function() {
      jQuery("#jqgrid").jqGrid('setGridWidth', $("#content").width());
    });
  }
  //end render
});
app.appModel.Views.networkViewModal = Backbone.View.extend({
  el: "#network-modal",
  initialize: function() {
    this.render();
  },
  render: function() {
    $('#dialog_simple_delete').dialog({
      autoOpen: false,
      width: 300,
      resizable: false,
      modal: true,
      title: "删除提示",
      buttons: [{
        html: "<i class='fa fa-trash-o'></i>&nbsp;删除",
        "class": "btn btn-danger",
        click: function() {
          var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
          var result = ajax.delete(STARTAREAURL + id);
          var status = judgeStatus.resultStatus(result);
          app.globalFun.isResultMsg(status);
          $(this).dialog("close");
        }
      }, {
        html: "<i class='fa fa-times'></i>&nbsp;取消",
        "class": "btn btn-default",
        click: function() {
          $(this).dialog("close");
        }
      }]
    });
    $('#dialog_simple_stop').dialog({
      autoOpen: false,
      width: 300,
      resizable: false,
      modal: true,
      title: "停止提示",
      buttons: [{
        html: "<i class='fa fa-trash-o'></i>&nbsp;停止",
        "class": "btn btn-danger",
        click: function() {
          var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
          var result = ajax.put(STARTAREAURL + id + "/disable");
          var status = judgeStatus.resultStatus(result);
          app.globalFun.isResultMsg(status);
          $(this).dialog("close");
        }
      }, {
        html: "<i class='fa fa-times'></i>&nbsp;取消",
        "class": "btn btn-default",
        click: function() {
          $(this).dialog("close");
        }
      }]
    });
    $('#dialog_simple_start').dialog({
      autoOpen: false,
      width: 300,
      resizable: false,
      modal: true,
      title: "启动提示",
      buttons: [{
        html: "<i class='fa fa-trash-o'></i>&nbsp;启动",
        "class": "btn btn-danger",
        click: function() {
          var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
          var result = ajax.put(STARTAREAURL + id + "/enable");
          var status = judgeStatus.resultStatus(result);
          app.globalFun.isResultMsg(status);
          $(this).dialog("close");
        }
      }, {
        html: "<i class='fa fa-times'></i>&nbsp;取消",
        "class": "btn btn-default",
        click: function() {
          $(this).dialog("close");
        }
      }]
    });
  },
  addArea: function(name) {
    $('#myModal').modal({
      remote: name + '.html',
      show: true
    }).on("hidden.bs.modal", function() {
      $(this).removeData("bs.modal");
    });
  }
});
app.appModel.Views.networkViewAction = Backbone.View.extend({
  el:"body",
  events: {
    'click #network-add': 'addNetwork',
    'click #network-start': "startNetwork",
    'click #network-stop': "stopNetwork",
    'click #network-delete': "deleteNetwork",
    'click #search':"search"
  },
  addNetwork:function(){
    var networkViewModal = new app.appModel.Views.networkViewModal();
    networkViewModal.addArea("ajax/resources/network-add");
  },
  startNetwork:function(){
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    if (id === null) {
      alert("请选择网段，再点击启动！");
    } else {
      $('#dialog_simple_start').dialog('open');
    }
  },
  stopNetwork:function(){
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    if (id === null) {
      alert("请选择网段，再点击停止！");
    } else {
      $('#dialog_simple_stop').dialog('open');
    }
  },
  deleteNetwork:function(){
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    if (id === null) {
      alert("请选择网段，再点击删除！");
    } else {
      $('#dialog_simple_delete').dialog('open');
    }
  },
  search:function(){

  }
});
module.exports=app;
