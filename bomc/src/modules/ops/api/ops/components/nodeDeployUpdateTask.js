import request from '../../index.js'


//树形栏查询
const queryIP = function() {
  return request({
    method: 'GET',
    url: '/ops/api/v1/mainTask/resource',
  })
}
// 获取树状结构
const queryDataUseTree = function(params) {
  return request({
      method: 'GET',
      url: '/ops/api/v1/appRepetory/getTree',
      params
  })
}
export {
  queryIP,
  queryDataUseTree
}