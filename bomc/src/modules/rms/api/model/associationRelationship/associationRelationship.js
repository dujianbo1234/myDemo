// import request from '../../request';
import request from '@/utils/request'

// ---关联关系管理
// 初始所有资源数据
// const resourcesData = function(params) {
//   debugger
//   return request({
//     method: 'GET',
//     url: `/rms/api/v1/ResRelationModel?model=${params.model}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}`,
//   })
// }
// 树状点击查询 
// const queryResourcesData = function(params) {
//   debugger
//   return request({
//     method: 'GET',
//     url: `/rms/api/v1/ResRelationModel?key=source,target&value=${params.model},${params.model}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}&searchByAny=true`
//   })
// }

// 初始资源数据和查具体模型
const resourcesData = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResRelationModel?key=uri&value=${params.model}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}&searchByAny=true`
  })
}
// 树状点击父类查询
const queryResourcesParent  = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResRelationModel?key=uri&value=${params.value}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}&searchByAny=true`

  })
}
// 单个删除
const deleteInfo = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: `/rms/api/v1/ResRelationModel?name=${params.name}`,
  })

}

// 多条删除
const deleteInfoMultiple = function(params) {
  debugger
      return request({
        method: 'DELETE',
        url: `/rms/api/v1/ResRelationModel?name=${params}`,
      })
}

// 新增关系模型
const abbResourcesData = function(params) {
  console.log(params)
  debugger
  return request({
    method: 'post',
    url: `rms/api/v1/ResRelationModel`,
    data: params
  })
}

// 修改资源模型
// const modifiedModel = function(params) {
//   debugger
//   return request({
//     method: 'put',
//     url: `/rms/api/v1/CI?model=${params.modelName}&condition=ciid&id=${params.ciid}&type=1`,
//     data: params
//   })
// }

// 左侧树状导航分类
const dataList = function(params) {
  return request({
    method: 'GET',
    url: '/rms/api/v1/ResModel/type',
    params
  })
}

// 查询多个模型接口
// const allQueryModel = function(params) {
//   debugger
//   var url ='key='
//   for(var i = 0; i < params.length; i++){
//     if(i == params.length-1){
//       url+='name'
//     }else{
//       url+='name,'
//     }
//   }
//   return request({
//     method: 'GET',
//     url: `/rms/api/v1/ResModel?${url}&value=${params}&searchByAny=true`,
//   })
// }

// 新增页面专有属性
// const attProprietary = function(params) {
//   debugger
//   return request({
//     method: 'GET',
//     url: `/rms/api/v1/ResModel?key=name&value=${params}`,
//   })
// }

// 上传资源数据
const importData = function(params, models) {
  console.log(params)
  debugger
  return request({
    method: 'post',
    url: `/rms/api/v1/CI/import?model=${models}`,
    data: params
  })
}

// 获取对应资源数据总条数
const totalRecordsData = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `rms/api/v1/ResRelationModel?model=ResRelationModel&countOutput=true`,
  })
}

export {
  resourcesData,
  queryResourcesData,
  abbResource,
  attProprietary,
  resourceType,
  dataList,
  deleteInfo,
  deleteInfoMultiple,
  abbResourcesData,
  modifiedModel,
  allQueryModel,
  importData,
  totalRecordsData,
  totalRecordsData_query,
  queryPagingResourcesData,
  queryResourcesParent
}
