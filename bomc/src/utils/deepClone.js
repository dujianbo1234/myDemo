'use strict'
// 深度克隆
var deepClone = function deep_clone(obj) {
  var result, oClass = isClass(obj)
  // 确定result的类型
  if (oClass === 'Object') {
    result = {}
  } else if (oClass === 'Array') {
    result = []
  } else {
    return obj
  }
  for (var key in obj) {
    var copy = obj[key]
    if (isClass(copy) == 'Object') {
      result[key] = deep_clone(copy)// 递归调用
    } else if (isClass(copy) == 'Array') {
      result[key] = deep_clone(copy)
    } else {
      result[key] = obj[key]
    }
  }
  return result
}
// 返回传递给他的任意对象的类
function isClass(o) {
  if (o === null) return 'Null'
  if (o === undefined) return 'Undefined'
  return Object.prototype.toString.call(o).slice(8, -1)
}

export default deepClone
