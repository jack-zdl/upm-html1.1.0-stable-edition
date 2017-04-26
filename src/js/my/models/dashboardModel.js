/**
 * @Date:   2017-04-23T17:45:10+08:00
 * @Last modified time: 2017-04-23T18:04:38+08:00
 */
app.appModel.Models.dashboardModel = Backbone.Model.extend({
  defaults:{
    Id:"",
    TypeName:"",
    Name:"",
    Count:"",
    Description :""
  },
  initialize:function(){
    this.on("change:Name",function(){
      var oldname = this.previous("Name");
      var newname = this.get("Name");
      if(oldname != newname){
        console.log("Name原值："+oldname+",新值："+newname);
      }
    });
    this.on("invalid",function(model,error){
      console.log(error);
    });
  },
  validate:function(attrs){
    if(!_.isString(attrs.Name)) return "名称必须是字符串！";
    if(!-.isNumber(attrs.Count)) return "总数必须是数字！";
  }

});
module.exports = app;
