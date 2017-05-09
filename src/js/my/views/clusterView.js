/**
 * @Date:   2017-05-09T09:18:33+08:00
 * @Last modified time: 2017-05-09T10:33:38+08:00
 */
var app = require("../../config.js");
var app = require("../../my/models/clusterModel.js");
var ajaxModel = require("../../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../../my/vo/judgeStatusUtilModel.js");

var ajax = new ajaxModel();
var judgeStatus = new judgeStatusUtilModel();
var areaAddModel = new app.appModel.Models.areaAddModel();



app.appModel.Views.clusterJqgrid = Backbone.View.extend({
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
        colNames: ["所属区域", "集群名称", "备份", "最大使用率", "最大主机数量", "软件", "可用"],
        colModel: [{
            name: "areaName",
            index: "areaName",
            align: "center"
          },
          {
            name: "name",
            index: "name",
            align: "center"
          },
          {
            name: "nfSBackupName",
            index: "nfSBackupName",
            align: "center"
          },
          {
            name: "maxUsage",
            index: "maxUsage",
            align: "center"
          },
          {
            name: "maxHostCount",
            index: "maxHostCount",
            align: "center"
          },
          {
            name: "definitionSubServList",
            index: "definitionSubServList",
            align: "center",
            formatter: function(cellvalue, options, rowObject) {
              var data = "";
              for (var i = 0; i < cellvalue.length; i++) {
                data = data + cellvalue[i].name + "\n";
              }
              return data;
            }
          },
          {
            name: "enabledText",
            index: "enabledText",
            align: "center"
          }

        ],
        rowNum: 10000,
        editurl: "dummy.html",
        caption: "集群列表",
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
app.appModel.Views.clusterViewModal = Backbone.View.extend({
  el: "#cluster-modal",
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
app.appModel.Views.clusterViewAction = Backbone.View.extend({
      el: "body",
      events: {
        'click #cluster-add': 'addArea',
        'click #cluster-start': "startArea",
        'click #cluster-stop': "stopArea",
        'click #cluster-delete': "deleteArea",
        'click #search': "search"
      },
      initialize: function() {},
      render: function() {},
      addArea: function() {
        var areaBootstrapModal = new app.appModel.Views.areaBootstrapModal();
        areaBootstrapModal.addArea("ajax/resources/cluster-add");
        // var nfsResult = ajax.get(NFSURL);
        // var nfsData = judgeStatus.selectStatus(nfsResult);
        // if (null !== nfsData) {
        //   var areaAddView = new app.appModel.Views.areaAddFrom({
        //     model: nfsData
        //   });
        // } else {
        //   alert("提示信息：" + data);
        // }
      },
      startArea: function() {
        var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
        //var rowData = $("#jqgrid").jqGrid("getRowData",id);
        // var val= rowData.id;
        if (id === null) {

        // layer.alert('内容');
          }else{
            $('#dialog_simple_start').dialog('open');
          }
        },
        stopArea: function() {
            var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
            if (id === null) {
              // layer.msg('请选择集群，再点击停止！');
            } else {
              $('#dialog_simple_stop').dialog('open');
            }
          },
          deleteArea: function() {
            var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
            if (id === null) {
              // layer.msg('请选择集群，再点击删除！');
            } else {
              $('#dialog_simple').dialog('open');
            }
          },
          search: function() {
            alert("刷新");
          }
      });

    module.exports = app;
