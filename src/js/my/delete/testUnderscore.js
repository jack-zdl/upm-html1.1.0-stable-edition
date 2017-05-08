/**
 * @Date:   2017-03-04T20:25:04+08:00
 * @Last modified time: 2017-04-20T19:55:11+08:00
 */

var _ = require('underscore');
var a = [1,2,3,4,5];
var json = {one:1,two:2,three:3};
var jsonList = [{name:'a',age:30},{name:'b',age:20}];
var me = {
  sayHello:function () {

    //对集合的一个循环  collections
    //_.each
    // _.each(a,function(val,key){
    //   console.log(key+"-------"+val);
    // });
      // _.each(json,function(val,key){
      //   console.log(key+"-----"+val);
      // });
      //_.map 对每个值进行操作，返回一个新的数组
      // var newMap = _.map(a,function(num){
      //   return num*3;
      // });
      // console.log(newMap);
      //_.reduce 对数组所有元素操作，返回一个单独数值
      // console.log(_.reduce(a,function(memo,num){
      //   return memo+num;
      // },0));//设置初始值
      //_.find 对所有值进行查找，找到第一个符合值
      //_.filter 遍历数组，找到所有符合的值
      // console.log(_.find(a,function(num){
      //   return num % 2 ===0;
      // }));
      // console.log(_.filter(a,function(num){
      //   return num % 2 ===0;
      // }));
      //逻辑处理 true or false
      //_.some 查询容器中是否有满足要求的元素，有true
      // console.log(_.some(a,function(num){
      //   return num >3;
      // }));
      // //_.every 查询容器中是否每个都满足要求的元素，都满足true
      // console.log(_.every(a,function(num){
      //   return num >3;
      // }));
      //_.pluck 对map进行操作，萃取对象数组某个属性
    //  console.log(_.pluck(jsonList,"name"));
      //_.indexBy 对数组进行排序
      // console.log(_.indexBy(jsonList,"age"));
      // //_.size 求list长度
      // console.log(_.size(jsonList));

      //对数组进行操作
      //_.compact 除去数组中所有false  js中 false, null, 0, "", undefined 和 NaN 都是false值
      console.log(_.compact([0, 1, false, 2, '', 3]));
      //_.without 返回一个删除所有value的array副本
      console.log(_.without([1, 2, 1, 0, 3, 1, 4], 0, 1));
  }
};
module.exports=me;
