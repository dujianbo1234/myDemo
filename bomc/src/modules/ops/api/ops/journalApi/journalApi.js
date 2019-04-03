import request from '../../index.js'

//任务日志查询
const queryData = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/userlog',
        params
    })
}
const queryDataCps = function(params) {
    return request({
        method: 'GET',
        url: '/cps/api/v1/userlog',
        params
    })
}
//命令统计------
//显示列表
const queryCommand = function(params) {
    return request({
      method: 'GET',
      url: '/cps/api/v1/operation/log',
      params
    })
  }
export {
    queryData,
    queryDataCps,
    queryCommand
}