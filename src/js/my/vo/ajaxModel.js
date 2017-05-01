/**
 * @Date:   2017-04-21T10:53:29+08:00
 * @Last modified time: 2017-04-27T16:01:05+08:00
 */


function mdelAjax() {

  var methodGet = "get";
  var methodPost="post";
  var methodPut = "put";
  var methodDelete = "delete";
  //私有方法 get 和 delete
  function methodAjax(url,method){
    var data ;
    $.ajax({
      url: url,
      method: method,
      async: false,
      dataType: "json",
      success: function(result, status, xhr) {
        data = result;
      },
      error: function(XMLHttpRequest, status, jqXHR, textStatus, e) {
          console.error("状态文本 " + status);
          data  = status;
      }
    });
      return data;
  }
  //私有方法 post 和 put
  function methodAjaxByParam(url,object,method){
    var data ;
    $.ajax({
      url: url,
      method: method,
      async: false,
      data: object,
      dataType: "json",
      success: function(result, status, xhr) {
        data = result;
      },
      error: function(XMLHttpRequest, status, jqXHR, textStatus, e) {
        console.error("状态文本 " + status);
        data = status;
      }
    });
    return data;
  }
  this.get = function(url) {
    return methodAjax(url,methodGet);
  };
  this.post=function(url,object){
    return methodAjaxByParam(url,object,methodPost);
  };
  this.put=function(url){
    return methodAjax(url,methodPut);
  };
  this.put=function(url,object){
    return methodAjaxByParam(url,object,methodPut);
  };
  this.delete=function(url){
    return methodAjax(url,methodDelete);
  };

}
module.exports = mdelAjax;
