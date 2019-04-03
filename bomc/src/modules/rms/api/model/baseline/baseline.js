// import request from '../../request';
import request from '@/utils/request'

//---基线管理

// 初始查询基线管理
const queryBaseline = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/BaseLine?values=${params.name}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}`
  })
}
// 新增基线管理
const addBaseline = function(params) {
  debugger
  return request({
    method: 'post',
    url: '/rms/api/v1/BaseLine',
    data: params
  })
}

// 单个删除
const deleteInfo = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/BaseLine/' + params
  })
}

// 多条删除
const deleteInfoMultiple = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/BaseLine',
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
//     url: `/rms/api/v1/BaseLine?name=${params.name}`,
//     data: params
//   })
// }

export {
  queryBaseline,
  addBaseline,
  deleteInfo,
  deleteInfoMultiple,
  modifyAttribute
}
