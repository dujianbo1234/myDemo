// import request from '../../request';
import request from '@/utils/request'

//---护展属性

// 护展属性查询
const queryattributeManag = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/Extended_attribute_library?name=${params.name}&classification=${params.select}&required=${params.checked}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}`
  })
}

// 新增数据
const addAttributeManag = function(params) {
  debugger
  return request({
    method: 'post',
    url: `/rms/api/v1/Extended_attribute_library`,
    data: params
  })
}
// 删除
const deleteInfo = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: `/rms/api/v1/Extended_attribute_library?name=${params}`,
  })
}
// 多条删除
const deleteInfoMultiple = function(delarr) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/Extended_attribute_library',
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
    url: `/rms/api/v1/Extended_attribute_library?name=${params.name}`,
    data: params
  })
}
export {
  queryattributeManag,
  addAttributeManag,
  deleteInfo,
  deleteInfoMultiple,
  modifyAttribute
}
