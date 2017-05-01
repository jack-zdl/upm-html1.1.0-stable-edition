/**
 * @Date:   2017-04-21T11:26:07+08:00
 * @Last modified time: 2017-04-28T09:51:54+08:00
 * @Description 判断返回的状态
 */
function judgeStatus() {
  var STATUS_SUCCESS = 1;
  var STATUS_WARN = 0;
  var STATUS_FAIL = -1;
  var STATUS_NOLOGIN = -9;
  var ARRAY_NULL = [];
  var ADRESS_LOGIN = "login.html";
  var UKNOWN="返回result状态异常";

  this.status = function(object) {
    switch (object.result) {
      case STATUS_SUCCESS:
        return object.data;
        break;
      case STATUS_WARN:
        return ARRAY_NULL;
        break;
      case STATUS_FAIL:
        return ARRAY_NULL;
        break;
      case STATUS_NOLOGIN:
        window.location = ADRESS_LOGIN;
        break;
      default:
      alert(UKNOWN);
    }
  }
}
module.exports = judgeStatus;
