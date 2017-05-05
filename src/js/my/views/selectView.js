/**
 * @Date:   2017-05-05T13:47:28+08:00
 * @Last modified time: 2017-05-05T13:52:26+08:00
 */



 /**
  * @Date:   2017-05-02T22:26:31+08:00
 * @Last modified time: 2017-05-05T13:52:26+08:00
  */
 var app = require("../../config.js");
 var app = require("../../my/models/selectModel.js");
 var ajaxModel = require("../../my/vo/ajaxModel.j");
 var judgeStatusUtilModel = require("../../my/vo/judgeStatusUtilModel.js");
// var SELECTURL = app.appConfig.IP + "/upm-api/v1.0/select/";

 var ajax = new ajaxModel();
 var judgeStatus = new judgeStatusUtilModel();
 var areaAddModel = new app.appModel.Models.areaAddModel();
 app.appModel.Views.areaJqgrid = Backbone.View.extend({
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
     })
   }
   //end render
 });


 module.exports = app;
