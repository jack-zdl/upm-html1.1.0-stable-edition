# upm-web-html
这是对upm-html1.1.0-Beta-x系列的重构，使用Backbone，Underscore，webpack的技术和工具，完成由无框架前端工程向框架前端工程转变。
## bootstrap讲解：
```
1tab页的切换 一种是用 data-toggle="tab"  另一种是用 javascript
```
## 页面权限验证
```
我可以在SmartAdmin中的app.min.js的销毁函数中去添加验证函数,来验证用户是否已经登录。
```
## ajax异步问题
```
是因为ajax默认是异步传输，也就是说，$.ajax方法并没有等待 success:function(data) 回调函数执行完，就已经向下执行了
```
## backbone理解
```
一种是以模型数据驱（模型，集合）动视图的形式，就是后台数据传达的数据改变视图改变
例如实时展示数据
一种是以视图驱动模型数据，就是前端的视图修改来影响模型数据。
例如首页的集群点击列表，pieChart会改变
```
## backbone-view
```
el :"#id" 指定与之关联的页面元素范围
model对象没有initialize函数，
highcharts多个折线图数据格式
series:[
{
  type:"area",
  name :"name",
  data:[["时间戳"，"值"],["时间戳"，"值"],["时间戳"，"值"]]
  },{}
]
```
