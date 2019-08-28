var moment = require('moment-timezone')

// 本地时间转化为目标时区的时间
var a = moment('2019-01-08 13:54:36').utc();

// 将目标时区的时间转化为本地时间  
function converToLocal(targetZone, targetTime) {
  var timestamp = Date.parse(moment(targetTime).format().slice(0, 19) + targetZone)
  
  return moment(timestamp)
}


console.log("UTC: ", a.format('YYYY-MM-DD HH:mm:ss'))
console.log("中国北京时间: ", converToLocal('+00:00', '2019-01-08 05:54:36').format('YYYY-MM-DD HH:mm:ss'))
console.log(-(new Date()).getTimezoneOffset() / 60)

function getZoneString() {
  return zone(-(new Date()).getTimezoneOffset() / 60)
}

function zone(zoneOffset) {
  if (zoneOffset > 9 || zoneOffset < -9) {
    if (zoneOffset > 0) {
      return '+' + zoneOffset + ':00'
    }
    return zoneOffset + ':00'
  } else {
    if (zoneOffset > 0) {
      return '+0' + zoneOffset + ':00'
    }
    return "-0" + -zoneOffset + ':00'
  }
}


console.log(getZoneString(9))
console.log(getZoneString(10))
console.log(getZoneString(-10))
console.log(getZoneString(-9))
