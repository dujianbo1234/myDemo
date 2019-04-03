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
// 查询资源模型所有历史版本
const queryResourcesVersion = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResModel/version?name=${params}&sortfield=version&sortorder=DESC`,
  })
}

// http://192.168.127.248:8899/rms/api/v1/ResModel?limit=5&start=1
// http://192.168.127.248:8899/rms/api/v1/ResModel/version?name=Host&sortfield=version&sortorder=DESC

// 模型数据展示
const modelList = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResModel?model=${params.model}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize}`,
    params
  })
}
// 修改专有属性
const modifyAttribute = function(params) {
  debugger
  return request({
    method: 'put',
    url: `/rms/api/v1/ResModel/rollback?name=${params.name}&version=${params.version}`,
  })
}

export {
  modelList,
  queryResourcesVersion,
  queryClassResources,
  modifyAttribute
}
