/**
 * @Date:   2017-04-21T10:53:29+08:00
 * @Last modified time: 2017-04-23T20:40:13+08:00
 */


function mdelAjax() {

  var methodGet = "get";
  var methodPost="post";
  var methodPut = "put";
  var methodDelete = "delete";

  this.get = function(url) {
    return methodAjax(url,methodGet);
  };
  this.post=function(url,object){
    return methodAjax(url,object,methodPost);
  };
  this.put=function(url){
    return methodAjax(url,methodPut);
  };
  this.put=function(url,object){
    return methodAjax(url,object,methodPut);
  };
  this.delete=function(url){
    return methodAjax(url,methodDelete);
  }
  //私有方法 get 和 delete
  function methodAjax(url,methodDelete){
    $.ajax({
      url: url,
      method: method,
      async: true,
      dataType: "json",
      success: function(result, status, xhr) {
        return result;
      },
      error: function(XMLHttpRequest, status, jqXHR, textStatus, e) {
        console.error("getAllDataCS  CS数据状态文本 " + status);
      }
    });
  }
  //私有方法 post 和 put
  function methodAjax(url,object,methodDelete){
    $.ajax({
      url: url,
      method: method,
      async: true,
      data: object,
      dataType: "json",
      success: function(result, status, xhr) {
        return result;
      },
      error: function(XMLHttpRequest, status, jqXHR, textStatus, e) {
        console.error("getAllDataCS  CS数据状态文本 " + status);
      }
    });
  }
}
module.exports = mdelAjax();
