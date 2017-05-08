/**
 * @Date:   2017-05-02T22:26:31+08:00
 * @Last modified time: 2017-05-08T22:24:19+08:00
 */
var app = require("../../config.js");
var app = require("../../my/models/areaModel.js");
var ajaxModel = require("../../my/vo/ajaxModel.js");
var judgeStatusUtilModel = require("../../my/vo/judgeStatusUtilModel.js");
var NFSURL = app.appConfig.IP+ "/UPM_API/v1.0/selections/nfs-backups?siteId=" + app.appConfig.SITEID;
var AREAPOSTURL = app.appConfig.IP + "/UPM_API/v1.0/areas";
var STARTAREAURL = app.appConfig.IP + "/UPM_API/v1.0/areas/"; //{areaId}/enable
var ajax = new ajaxModel();
var judgeStatus = new judgeStatusUtilModel();
var areaAddModel = new app.appModel.Models.areaAddModel();
app.appModel.Views.areaJqgrid = Backbone.View.extend({  el: "#pjqgrid",
  initialize: function() {
    this.render();
  },
  render: function() {
    if ($("#jqgrid tr:visible").length === 0) {
      jQuery("#jqgrid").jqGrid({
        data: this.model,
        datatype: "local",
        height: 'auto',
        colNames: ["名字", "nfs", "描述", "是否启用"],
        colModel: [{
            name: "name",
            index: "name",
            align: "center"
          },
          {
            name: "nfsName",
            index: "nfsName",
            align: "center"
          },
          {
            name: "description",
            index: "description",
            align: "center"
          },
          {
            name: "enabledText",
            index: "enabledText",
            align: "center"
          }
        ],
        rowNum: 10000,
        editurl: "dummy.html",
        caption: "区域列表",
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
app.appModel.Views.areaAction = Backbone.View.extend({
  el:"body",
  events: {
    'click #jqgrid-area-add': 'addArea',
    'click #jqgrid-area-start': "startArea",
    'click #jqgrid-area-stop': "stopArea",
    'click #jqgrid-area-delete': "deleteArea",
    'click #search':"search"
  },
  initialize: function() {},
  render: function() {},
  addArea: function() {
    var areaBootstrapModal = new app.appModel.Views.areaBootstrapModal();
    areaBootstrapModal.addArea("ajax/resources/area-add");
    var nfsResult = ajax.get(NFSURL);
    var nfsData = judgeStatus.selectStatus(nfsResult);
    if (null !== nfsData) {
      var areaAddView = new app.appModel.Views.areaAddFrom({
        model: nfsData
      });
    } else {
      alert("提示信息：" + data);
    }
  },
  startArea: function() {
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    //var rowData = $("#jqgrid").jqGrid("getRowData",id);
    // var val= rowData.id;
    if (id === null) {
      alert("请选择区域，再点击启动！");
    } else {
      $('#dialog_simple_start').dialog('open');
    }
  },
  stopArea: function() {
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    if (id === null) {
      alert("请选择区域，再点击停止！");
    } else {
      $('#dialog_simple_stop').dialog('open');
    }
  },
  deleteArea: function() {
    var id = $("#jqgrid").jqGrid('getGridParam', 'selrow');
    if (id === null) {
      alert("请选择区域，再点击删除！");
    } else {
      $('#dialog_simple').dialog('open');
    }
  },
  search:function(){
    alert("刷新");
  }
});
app.appModel.Views.areaBootstrapModal = Backbone.View.extend({
  el: "#area-modal",
  initialize: function() {
    this.render();
  },
  render: function() {
    $('#dialog_simple').dialog({
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
        html: "<i class='fa fa-trash-o'></i>&nbsp;确定",
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
        html: "<i class='fa fa-trash-o'></i>&nbsp;确定",
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
app.appModel.Views.areaAddFrom = Backbone.View.extend({
  // el:"#dialog-message",
  el: 'body',
  events: {
    'click #ajax-btn': 'submit'
  },
  initialize: function() {
    $('#selectNfs').selectpicker({
      'selectedText': 'cat'
    });
    this.render();
  },
  render: function() {
    for (var i = this.model.length - 1; i >= 0; i--) {
      $("#selectNfs").append("<option value=" + this.model[i].id + ">" + this.model[i].text + "</option>");
    }
    $('.selectpicker').selectpicker('refresh');
  },
  submit: function() {
    $("#siteId").attr("value", app.appConfig.SITEID); // 填充内容
    var params = $("#add-site-form").serializeObject();
  //  var validateResult=areaAddModel.set(params,{"validate":true}); 返回的是true或者false
    if(areaAddModel.set(params,{"validate":true})){
      var result = ajax.post(AREAPOSTURL, JSON.stringify(params));
      var status = judgeStatus.resultStatus(result);
      app.globalFun.isResultMsg(status);
      $('#myModal').modal('hide');
    }


  }
});
app.appModel.Views.areaSelect = Backbone.View.extend({
  el:"body",

});
module.exports = app;
