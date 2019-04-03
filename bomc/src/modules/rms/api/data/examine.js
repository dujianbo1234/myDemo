// import request from '../../request';
import request from '@/utils/request'

//---资源数据审核

// 初始查询资源数据审核
const queryExamine = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CIRule?keys=name,model&values=${params.name},${params.name}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}&search=true&searchByAny=true`
  })
}

// 新增资源数据审核   192.168.127.248:8899/rms/api/v1/CIRule/Examine?id=1545287637565
const addExamine = function(params) {
  debugger
  return request({
    method: 'post',
    url: '/rms/api/v1/CIRule',
    data: params
  })
}
// 查看审核报告
const auditReport= function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CIRule/Examine?id=${params}`,
  })
}
// 执行审核
const implement = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CIRule/Implement`,
    params: {
      // id: params.join(',')
      id: params
    }
  })
}
// 执行全部审核
const all_implement = function() {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CIRule/Implement`,
  })
}
// 单个删除
const deleteInfo = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: `/rms/api/v1/CIRule?id=${params.id}`
  })
}
// 多条删除
const deleteInfoMultiple = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/CIRule',
    params: {
      id: params.join(',')
    }
  })
}
// 查询规则属性字段
const queryPropertyFields = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResModel/property?name=${params}`,
    
  })
}

export {
  queryExamine,
  addExamine,
  deleteInfo,
  deleteInfoMultiple,
  queryPropertyFields,
  implement,
  all_implement,
  auditReport,
}
