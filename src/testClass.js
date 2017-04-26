// define([],function(){
//   alert("hello world!");
// });
//1     js写类 必须使用prototype的类型
        // function Cat(name,color){
        // 　　　　this.name = name;
        // 　　　　this.color = color;
        // 　　}
        // 　　Cat.prototype.type = "猫科动物";
        // 　　Cat.prototype.eat = function(){alert("吃老鼠")}
//2     js写构造函数的继承必须使用空对象继承
        // function extend(Child, Parent) {
        //
        // 　　　　var F = function(){};
        // 　　　　F.prototype = Parent.prototype;
        // 　　　　Child.prototype = new F();
        // 　　　　Child.prototype.constructor = Child;
        // 　　　　Child.uber = Parent.prototype;
        // 　　}
        //实践
//         extend(Cat,Animal);
// 　　var cat1 = new Cat("大毛","黄色");
// 　　alert(cat1.species); // 动物
//3   写非构造函数的继承必须使用深copy
      // function deepCopy(p, c) {
      // 　　　　var c = c || {};
      // 　　　　for (var i in p) {
      // 　　　　　　if (typeof p[i] === 'object') {
      // 　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
      // 　　　　　　　　deepCopy(p[i], c[i]);
      // 　　　　　　} else {
      // 　　　　　　　　　c[i] = p[i];
      // 　　　　　　}
      // 　　　　}
      // 　　　　return c;
      // 　　}
      //实践
      //var Doctor = deepCopy(Chinese);
//-------------------------------------------------------------------------//
var _ = require('underscore');
//内部函数 构造函数的继承
function extend(Child,Parent) {

　　　　var F = function(){};
　　　　F.prototype = Parent.prototype;
　　　　Child.prototype = new F();
　　　　Child.prototype.constructor = Child;
　　　　Child.uber = Parent.prototype;
}
//对象的继承
function deepCopy(p, c) {
　　　　var c = c || {};
　　　　for (var i in p) {
　　　　　　if (typeof p[i] === 'object') {
　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　　　deepCopy(p[i], c[i]);
　　　　　　} else {
　　　　　　　　　c[i] = p[i];
　　　　　　}
　　　　}
　　　　return c;
　　}
var parent = {
  first:'姓'
};
//对象
// var son = {
//   last-name:"名",
//   vsrsion:"1.0",
// };
//1 先继承
var son = deepCopy(parent);
son.last="名";
son.version="1.0";
//类
function Animal(){
  this.type="type";
}
function Cat(name,color){
  this.name=name;
  this.color=color;
}
Cat.prototype.eat = function(){
  alert("吃老鼠");
};
Cat.prototype.test = "-----";//对于类的静态方法没办使用  非构造函数继承也无法使用
extend(Cat,Animal);
//var c1 = new Cat('黑猫','黑');
//alert(c1.type);

var test= {
  a:function(){
    //error
  },
  b:function(){
    alert(son.first);//ok
  }
};




module.exports=test;
