/**
 * @Date:   2017-04-21T11:26:07+08:00
 * @Last modified time: 2017-05-03T12:13:54+08:00
 * @Description 判断返回的状态
 */
function judgeStatus() {
  var STATUS_SUCCESS = 1;
  var STATUS_WARN = 0;
  var STATUS_FAIL = -1;
  var STATUS_NOLOGIN = -9;
  var ARRAY_NULL = [];
  var ADRESS_LOGIN = "login.html";
  var UKNOWN = "返回result状态异常";

  this.status = function(object) {
      var data = null;
      switch (object.result) {
        case STATUS_SUCCESS:
          data = object.data;
          break;
        case STATUS_WARN:
          data = ARRAY_NULL;
          break;
        case STATUS_FAIL:
          data = ARRAY_NULL;
          break;
        case STATUS_NOLOGIN:
          window.location = ADRESS_LOGIN;
          break;
        default:
          alert(UKNOWN);
      }
      return data;
    };
    //判断select中是否为空数组，或者为错误
    this.selectStatus = function(object) {
      var data = null;
      if ([] != object) {
        data = object;
      }
      return data;
    };
    //对于post或者put，delete接口调用返回的结果，进行判断
  this.resultStatus = function(object) {
      var data = null;
      switch (object.result) {
        case STATUS_SUCCESS:
          data = object.msg;
          break;
        case STATUS_WARN:
          data = object.msg;
          break;
        case STATUS_FAIL:
          data = object.msg;
          break;
        case STATUS_NOLOGIN:
          window.location = ADRESS_LOGIN;
          break;
        default:
          alert(UKNOWN);
      }
      return data;
    };

}

module.exports = judgeStatus;
