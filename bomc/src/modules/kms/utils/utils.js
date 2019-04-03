export function dateFilter(value) {
  function addTime(num) {
    if (parseInt(num) < 10) {
      num = '0' + num
    }
    return num
  }
  if (value) {
    var oDate = value
    console.info(typeof value)
    if (!(value instanceof Date)) {
      oDate = new Date(Number(value) * 1000)
    }
    // debugger
    var oYear = oDate.getFullYear()
    var oMonth = oDate.getMonth() + 1
    var oDay = oDate.getDate()
    var oHour = oDate.getHours()
    var oMin = oDate.getMinutes()
    var oSen = oDate.getSeconds()
    return oYear + '-' + addTime(oMonth) + '-' + addTime(oDay) + ' ' + addTime(oHour) + ':' + addTime(oMin) + ':' + addTime(oSen)
  }
}

export function dateFilter2(value) {
  function addTime(num) {
    if (parseInt(num) < 10) {
      num = '0' + num
    }
    return num
  }
  if (value) {
    var oDate = value
    console.info(typeof value)
    if (!(value instanceof Date)) {
      oDate = new Date(value)
    }

    var oYear = oDate.getFullYear()
    var oMonth = oDate.getMonth() + 1
    var oDay = oDate.getDate()
    var oHour = oDate.getHours()
    var oMin = oDate.getMinutes()
    var oSen = oDate.getSeconds()
    // debugger
    return oYear + '-' + addTime(oMonth) + '-' + addTime(oDay) + ' ' + addTime(oHour) + ':' + addTime(oMin) + ':' + addTime(oSen)
  }
}

