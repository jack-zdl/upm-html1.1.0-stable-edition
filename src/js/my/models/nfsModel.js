/**
 * @Date:   2017-05-08T17:38:21+08:00
 * @Last modified time: 2017-05-08T23:19:55+08:00
 */
var app = require("../../config.js");
var _ = require("../../plugin/underscore/underscore.js");
app.appModel.Models.nfsModel = Backbone.Model.extend({
  defaults: {
    id: "",
    createDateTime: "",
    createLoginUserName: "",
    name: "",
    nfsIp: "",
    nfsDir: "",
    nfsMountDir: "",
    nfsMountOpts: "",
    totalSpace: "",
    freeSpace: "",
    spaceUnit: "",
    enabled: "",
    enabledText: ""
  },
  initialize: function() {
    this.on('invalid', function(model, error) {
      alert(error);
    });
  },
  validate: function(attrs) {
    if (!_.isString(attrs.id)) return "id必须是字符串";
    if (!_.isString(attrs.createDateTime)) return "创建时间必须是字符串";
    if (!_.isString(attrs.createLoginUserName)) return "创建者必须是字符串";
    if (!_.isString(attrs.name)) return "名字必须是字符串";
    if (!_.isString(attrs.nfsIp)) return "nfsIp必须是字符串";
    if (!_.isString(attrs.nfsDir)) return "nfsDir必须是字符串";
    if (!_.isString(attrs.nfsMountDir)) return "nfsMountDir必须是字符串";
    if (!_.isString(attrs.nfsMountOpts)) return "nfsMountOpts必须是字符串";
    if (!_.isNumber(attrs.totalSpace)) return "totalSpace必须是数值";
    if (!_.isNumber(attrs.freeSpace)) return "freeSpace必须是数值";
    if (!_.isString(attrs.spaceUnit)) return "spaceUnit必须是字符串";
    if (!_.isBoolean(attrs.enabled)) return "enabled必须是字符串";
    if (!_.isString(attrs.enabledText)) return "站点必须是字符串";
  }
});
app.appModel.Models.nfsAddModel = Backbone.Model.extend({
  defaults: {
    name: "",
    siteId: "",
    nfsIp: "",
    nfsDir: "",
    nfsMountDir: "",
    nfsMountOpts: ""
  },
  initialize: function() {
    this.on('invalid', function(model, error) {
      alert(error);
    });
  },
  validate: function(attrs) {
    if (!_.isString(attrs.name)) return "名字必须是字符串";
    if (!_.isString(attrs.siteId)) return "siteId必须是字符串";
    if (!_.isString(attrs.nfsIp)) return "nfsIp必须是字符串";
    if (!_.isString(attrs.nfsDir)) return "nfsDir必须是字符串";
    if (!_.isString(attrs.nfsMountDir)) return "nfsMountDir必须是字符串";
    if (!_.isString(attrs.nfsMountOpts)) return "nfsMountOpts必须是字符串";
  }
});
module.exports = app;
