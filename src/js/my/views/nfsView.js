/**
 * @Date:   2017-05-08T17:38:54+08:00
 * @Last modified time: 2017-05-09T09:34:30+08:00
 */
var app = require("../../config.js");
var app = require("../../my/models/areaModel.js");
var app = require("../../my/Collections/nfsCollection.js");
var ajaxModel = require("../../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../../my/vo/judgeStatusUtilModel.js");

var NFSADDURL = app.appConfig.IP + "/UPM_API/v1.0/nfsBackups";
var STARTNFSURL=app.appConfig.IP + "/UPM_API/v1.0/nfsBackups/";
var ajax = new ajaxModel();
var judgeStatus = new judgeStatusUtilModel();
var nfsAddModel = new app.appModel.Models.nfsAddModel();

app.appModel.Views.nfsViewJqgrid = Backbone.View.extend({
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
        colNames: ["备份存储名称", "nfs IP地址", "nfs 源目录", "nfs 挂载目录", "nfs 挂载参数", "空闲容量", "总容量"],
        colModel: [{
            name: 'name',
            index: 'name',
            align: "center",
            editable: true
          },
          {
            name: 'nfsIp',
            index: 'nfsIp',
            align: "center",
            editable: true
          },
          {
            name: 'nfsDir',
            index: 'nfsDir',
            align: "center",
            editable: true
          },
          {
            name: 'nfsMountDir',
            index: 'nfsMountDir',
            align: "center",
            editable: true
          },
          {
            name: 'nfsMountOpts',
            index: 'nfsMountOpts',
            align: "center",
            editable: true
          },
          {
            name: 'freeSpace',
            index: 'freeSpace',
            align: "center",
            editable: true,
            formatter: function(value, options, rData) {
              return value + "" + rData['spaceUnit'];
            }
          },
          {
            name: 'totalSpace',
            index: 'totalSpace',
            align: "center",
            editable: true,
            formatter: function(value, options, rData) {
              return value + "" + rData['spaceUnit'];
            }
          }
        ],
        rowNum: 10000,
        editurl: "dummy.html",
        caption: "备份存储列表",
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
app.appModel.Views.nfsViewModal = Backbone.View.extend({
  el: "#nfs-modal",
  initialize: function() {
    this.render();
  },
  render: function() {
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
          var result = ajax.put(STARTNFSURL + id+"/enable");
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
           var result = ajax.put(STARTNFSURL + id + "/disable");
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
          var result = ajax.delete(STARTNFSURL + id);
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
  addNfs: function(name) {
    $('#myModal').modal({
      remote: name + '.html',
      show: true
    }).on("hidden.bs.modal", function() {
      $(this).removeData("bs.modal");
    });
  }
});
app.appModel.Views.areaViewAction = Backbone.View.extend({
  el: "body",
  events: {
    'click #nfs-add': "addNfs",
    'click #nfs-start': "startNfs",
    'click #nfs-stop': "stopNfs",
    'click #nfs-delete': "deleteNfs",
    'click #search': "search"
  },
  addNfs: function() {
    var nfsViewModal = new app.appModel.Views.nfsViewModal();
    nfsViewModal.addNfs("ajax/resources/nfs-add");
  },
  startNfs: function() {
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    if (id === null) {
      alert("请选择备份存储，再点击启动！");
    } else {
      $('#dialog_simple_start').dialog('open');
    }
  },
  stopNfs: function() {
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    if (id === null) {
      alert("请选择备份存储，再点击停止！");
    } else {
      $('#dialog_simple_stop').dialog('open');
    }
  },
  deleteNfs: function() {
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    if (id === null) {
      alert("请选择备份存储，再点击删除！");
    } else {
      $('#dialog_simple_delete').dialog('open');
    }
  },
  search: function() {

  }
});
app.appModel.Views.nfsAddFrom = Backbone.View.extend({
  el: 'body',
  events: {
    'click #ajax-btn': 'submit'
  },
  submit: function() {
    $("#siteId").attr("value", app.appConfig.SITEID); // 填充内容
    var nfsIp1 = $("#nfsIp1").val();
    var nfsIp2 = $("#nfsIp2").val();
    var nfsIp3 = $("#nfsIp3").val();
    var nfsIp4 = $("#nfsIp4").val();
    var nfsIp = nfsIp1 + "." + nfsIp2 + "." + nfsIp3 + "." + nfsIp4;
    $("#nfsIp").val(nfsIp);
    var params = $("#add-nfs-form").serializeObject();
    if (nfsAddModel.set(params, {
        "validate": true
      })) {
      var result = ajax.post(NFSADDURL, JSON.stringify(params));
      var status = judgeStatus.resultStatus(result);
      app.globalFun.isResultMsg(status);
      $('#myModal').modal('hide');
    }
  }
});
module.exports = app;
