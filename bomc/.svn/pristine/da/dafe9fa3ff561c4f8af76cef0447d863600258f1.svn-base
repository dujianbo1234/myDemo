// import request from '../request';
import request from '@/utils/request'

// ---生命周期
// 初始所有生命周期数据
const lifeCycleData = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CI/history?model=${params.model}&id=${params.id}`
  })
}

// 新增生命周期
const addLifeCycleData = function(params,data) {
  debugger
  return request({
    method: 'put',
    url: `/rms/api/v1/CI?model=${params.model}&condition=ciid&id=${params.id}&type=0`,
    data: data
  })
}
// 接条件查询
const conditionQuery = function(page) {
  debugger
  var queryUrl = `/rms/api/v1/CI?model=${page.model}&keys=ciid&value=${page.id}&search=true`
  return request({
    method: 'GET',
    url: queryUrl
  })
}

export {
  lifeCycleData,
  addLifeCycleData,
  conditionQuery
}