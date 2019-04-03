// import request from '../../request';
import request from '@/utils/request'

//---资源模型

// 分类查询资源模型
const queryClassResources = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResModel?key=name,alias,level,type&value=${params.name},${params.alias},${params.level},${params.type}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}&search=${params.search}&searchByAny=${params.searchByAny}`
  })
}
//查询资源模型所有实例
const queryResourcesExample = function() {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CI/Total`,
  })
}
// 新增资源模型
const abbResource = function(params) {
  console.log(params)
  debugger
  return request({
    method: 'post',
    url: '/rms/api/v1/ResModel',
    data: params
  })
}

//模型数据展示
// const modelList = function(params) {
//   debugger
//   return request({
//     method: 'GET',
//     url: `/rms/api/v1/ResModel?model=${params.model}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize}`,
//     params
//   })
// }
// 单个删除
const deleteInfo = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/ResModel/' + params
  })
}

// 多条删除
const deleteInfoMultiple = function(delarr) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/ResModel',
    params: {
      name: delarr.join(',')
    }
  })
}
// 修改专有属性
const modifyAttribute = function(params) {
  debugger
  return request({
    method: 'put',
    url: `/rms/api/v1/ResModel?name=${params.name}`,
    data: params
  })
}
// 查询专有属性
const attProprietary = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResModel?key=name&value=${params}`
  })
}
export {
  queryResourcesExample,
  queryClassResources,
  abbResource,
  resourceType,
  modelList,
  queryCommand,
  deleteInfo,
  deleteInfoMultiple,
  modifyAttribute,
  attProprietary
}
