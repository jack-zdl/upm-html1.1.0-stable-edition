/**
 * @Date:   2017-04-22T18:25:17+08:00
 * @Last modified time: 2017-04-23T20:13:39+08:00
 * commonsJS模块只需要加载一次  其他的文件就不需要加载了
 */
app.appModel.Views.dashboard=Backbone.View.extend({
  //el: $('#dashboard-content'),//绑定页面元素
  initialize: function(){
        alert('init a SearchView');
  },
  render:function(){
    // $('#dashboard-content').append('<h1>一级标题</h1>');
  }
});


module.exports = app;
