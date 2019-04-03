// import request from '../../request';
import request from '@/utils/request'

//---自动化发现

// 初始查询自动化发现
const queryDiscovery = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/Discovery?values=${params.name}&state=${params.resource_state}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}`
  })
}
// http://192.168.127.248:8899/rms/api/v1/Discovery?values=主机&state=0&start=1&limit=5

// 新增自动化发现
const addDiscovery = function(params) {
  debugger
  return request({
    method: 'post',
    url: '/rms/api/v1/Discovery',
    data: params
  })
}
// 新增页面获取搜索代码  192.168.127.248:8899/rms/api/v1/CI/Ciid?type=“”&model=“”&system=“”
const querySearchcode = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `rms/api/v1/CI/Ciid`,
    params
  })
}
// 判断搜索代码重复 
const judgeSearchcode = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CI/Exist?model=${params.model}&ciid=${params.ciid}`,
  })
}

// 新增页面专有属性
const attProprietary = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResModel?key=name&value=${params}`
  })
}
// 新增资源模型
const abbResourcesData = function(id,params,model) {
  debugger
  return request({
    method: 'put',
    url: `/rms/api/v1/Discovery?id=${id}&model=${model}`,
    data: params
  })
}
// 单个删除
const deleteInfo = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: `/rms/api/v1/Discovery?id=${params}`
  })
}

// 多条删除
const deleteInfoMultiple = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/Discovery',
    params: {
      id: params.join(',')
    }
  })
}
// // 
// const modifyAttribute = function(params) {
//   debugger
//   return request({
//     method: 'put',
//     url: `/rms/api/v1/Discovery?name=${params.name}`,
//     data: params
//   })
// }

export {
  queryDiscovery,
  addDiscovery,
  deleteInfo,
  deleteInfoMultiple,
  modifyAttribute,
  querySearchcode,
  attProprietary,
  judgeSearchcode,
  abbResourcesData
}
