/**
 * @Date:   2017-04-28T13:31:01+08:00
 * @Last modified time: 2017-04-28T13:39:36+08:00
 */
function getHighchartOption() {
  //  var option = {
  this.dashboardHighchartOption = function() {
    return {
      credits: {
        enabled: false
      },
      title: {
        text: ""
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%e. %b',
          week: '%e. %b',
          month: '%b \'%y',
          year: '%Y'
        }
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      chart: {
        zoomType: 'x'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          '鼠标拖动可以进行缩放' : '手势操作进行缩放'
      },
      legend: {
        enabled: false
      },

      tooltip: {
        dateTimeLabelFormats: {
          millisecond: "%A, %b %e, %H:%M:%S.%L",
          second: "%A, %b %e, %H:%M:%S",
          minute: "%A, %b %e, %H:%M",
          hour: "%A, %b %e, %H:%M",
          day: "%A, %b %e, %Y",
          week: "Week from %A, %b %e, %Y",
          month: "%B %Y",
          year: "%Y"
        },
        xDateFormat: ' %Y-%m-%d',
        shared: true
      },
      series: []
    };
  };

}
module.exports=getHighchartOption;
